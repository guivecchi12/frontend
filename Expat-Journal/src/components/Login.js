import React, { useState, useEffect, useContext } from 'react';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import mukuko from '../Img/travel.jpg';
import PasswordMask from 'react-password-mask';
import axiosWithAuth from '../utilities/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const LoginContainer = styled.div`
    padding: 40px 0 20px 0;
    height: 600px;
    padding-bottom: 200px;
    background-image: url(${mukuko});
    background-size: cover;


        h1 {
            font-weight: 400;
            font-size: 1.8rem;
            text-align: center;
            padding-bottom: 10px;
        }

        form {
            display: flex;
            flex-direction: column;
            width: 300px;
            margin: 40px auto;
            padding: 40px;
            border: 2px solid black;
            border-radius: 5px;
            background-color: white;
            height: auto;


        label {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin: 0 0 10px 0;
            padding: 0 0 20px 0;
            font-size: 1.5rem;
            color: black;
        }

        input {
            width: 250px;
            margin: 8px 0 0 1px;
            border: 2px solid black;
            border-radius: 6px;
            padding: 10px 20px;
            font-size: 1.3rem;
        }

        input[type=text],
        textarea {
            -webkit-transition: all 0.30s ease-in-out;
               -moz-transition: all 0.30s ease-in-out;
                -ms-transition: all 0.30s ease-in-out;
                 -o-transition: all 0.30s ease-in-out;
            outline: none;
        }

        input[type=text]:focus,
        textarea:focus {
            box-shadow: 0 0 5px rgba(81, 203, 238, 1);
            border-color: rgba(81, 203, 238, 1);
        }

        input[type=password],
        textarea {
            -webkit-transition: all 0.30s ease-in-out;
               -moz-transition: all 0.30s ease-in-out;
                -ms-transition: all 0.30s ease-in-out;
                 -o-transition: all 0.30s ease-in-out;
            outline: none;
        }

        input[type=password]:focus,
        textarea:focus {
            box-shadow: 0 0 5px rgba(81, 203, 238, 1);
            border-color: rgba(81, 203, 238, 1);
        }

        .terms {
            display: inline-block;
            text-align: center;
            padding: 10px 0 0 0;
            font-size: 1.3rem;

        }

        .terms input {
            width: 20px;
            display: inline-block;
            margin-right: 5px;

        }

        .error {
            font-size: 0.9rem;
            color: red;
        }

        button {
            width: 150px;
            background-color: black;
            color: white;
            font-size: 1.2rem;
            margin: 30px 0 0 75px;
            padding: 8px 11px;
            cursor: pointer;
            border: 2px black solid;
            border-radius: 5px;
            &:hover {
                background-color: #778899;
                color: #F0FFF0;
            }
        }

        button:disabled {
            background-color: white;
            border: 1px solid silver;
            color: gray;
            cursor: not-allowed;
        }

        .register {
            a {
              text-decoration:none;
              color: black;

                &:hover {
                    color: gray;
                }
            }

            text-align: center;
            padding: 30px 0 0 10px;
        }

        .password-mask {

            a {
            text-decoration: none;
            color: black;
            float: right;
            margin-right: -47px;
            font-size: 20px;
            }
        }
`;

const Login = () => {
  const { setUser } = useContext(UserContext);

  //this is the react state
  const defaultState = {
    username: '',
    password: '',
    terms: false,
  };

  const [formState, setFormState] = useState(defaultState);
  const [errors, setErrors] = useState({ ...defaultState, terms: '' });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const { push } = useHistory();

  //this is the formState schema

  let formSchema = Yup.object().shape({
    username: Yup.string().required('Please provide username.'),
    password: Yup.string()
      .required('Please enter a correct Password')
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
      ),
    terms: Yup.boolean().oneOf([true], 'Please agree to the terms and conditions'),
  });

  useEffect(() => {
    //    one way is
    // formSchema.isValid(formState).then(valid => {
    //   setButtonDisabled(!valid);
    // });
    if (formState.terms) {
      setButtonDisabled(!formState.terms);
    }
  }, [formState]);

  //this is use for the onsubmit function
  const formSubmit = (e) => {
    e.preventDefault();
    //I added axios data here so it does not fire a lot when its outside
    console.log('Form Submitted');
    // to reset form
    setFormState({
      username: '',
      password: '',
      terms: '',
    });

    let user = { username: formState.username, password: formState.password };
    axiosWithAuth()
      .post('/auth/login', user)
      .then((res) => {
        const data = res.data;
        // console.log("form submitted success", data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('userID', data.id);
        //I set setUser here so it can retrieve the user data to the DOM
        setUser(data);
        push('/protected');
      })
      .catch((err) => {
        console.log('This is the Error', err);
      });
  };

  const validateChange = (e) => {
    //this allows react to keep the event object to play nice with async op
    e.persist();
    // reach allows us to check a specific value of the schema
    Yup.reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) =>
        setErrors({
          ...errors,
          [e.target.name]: '',
        })
      )
      .catch((error) =>
        setErrors({
          ...errors,
          [e.target.name]: error.errors[0],
        })
      );
  };

  // onChange function
  const handleChange = (e) => {
    //ternary operator to determine the form value
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormState({
      ...formState,
      [e.target.name]: value,
    });
    validateChange(e);
  };

  return (
    <LoginContainer>
      <div className="form">
        <form onSubmit={formSubmit}>
          <h1>LOG IN</h1>
          <label htmlFor="username">
            Username
            <input
              type="text"
              name="username"
              onChange={handleChange}
              value={formState.username}
              label="Username"
              errors={errors}
            />
            {errors.username.length !== 0 && <p className="error">{errors.username}</p>}
          </label>
          <label htmlFor="password">
            Password
            <PasswordMask
              className="password-mask"
              //create the hide and show password from this link https://github.com/zakangelle/react-password-mask
              type="password"
              name="password"
              onChange={handleChange}
              value={formState.password}
              label="Password"
              errors={errors}
            />
            {errors.password.length !== 0 && <p className="error">{errors.password}</p>}
          </label>
          <label className="terms" htmlFor="terms">
            <input name="terms" type="checkbox" onChange={handleChange} />
            Terms of Service
          </label>
          <button disabled={buttonDisabled}>SUBMIT</button>
          <div className="register">
            <p>Not registered yet?</p>
            <Link to="/signup">Register Here</Link>
          </div>
        </form>
      </div>
    </LoginContainer>
  );
};

export default Login;
