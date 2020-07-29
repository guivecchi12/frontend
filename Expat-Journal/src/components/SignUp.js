import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import * as Yup from "yup";
import axios from "axios";
import styled from "styled-components";
import mukuko from '../Img/travel.jpg'

const signSchema = Yup.object().shape({
  name: Yup.string().required("Please enter your username."),
  email: Yup.string()
    .required("Please enter your email.")
    .matches(/^[0-9]{10}$/),
  password: Yup.string()
    .required("Please enter your password.")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
    .min(6),
  comfirmpassword: Yup.string()
    .required("Please recomfirm your password.")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
    .min(6)
});

const defaultFormState = {
  username: "",
  email: "",
  password: "",
  comfirmpassword: ""
};
const defaultErrorState = {
  username: "",
  email: "",
  password: "",
  comfirmpassword: ""
};

let reg = {
  username: "",
  password: ""
};

const SignUp = props => {
  const [formState, setFormState] = useState(defaultFormState);
  const [errors, setErrors] = useState(defaultErrorState);
  const [isDisable, setIsDisable] = useState(true);

  const val = e => {
    e.persist();  //<--- this guy 
    Yup.reach(signSchema, e.target.name)
      .validate(e.target.value)
      .then(valid => setErrors({ ...errors, [e.target.name]: "" }))
      .catch(err => {
        setErrors({ ...errors, [e.target.name]: err.errors[0] });
        console.log("this error", errors);
      });
    console.log(e.target.name);
  };

  // redo the handle
  const handleChange = e => {
    console.log(e.target.name);
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });

    val(e);
  };

  const handleSumbmit = e => {
    e.preventDefault();
    reg = {
      username: formState.name,
      password: formState.password
    };
    console.log(reg, formState);
    axios
      .post("auth/login", reg)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    console.log(formState);
  };
  return (
    <SignUpContainer>
      <form onSubmit={handleSumbmit}>
        <h1>Sign up Now!</h1>
        
          <label htmlFor="name">
            Name{" "}
            <input
              type="text"
              name="name"
              onChange={handleChange}
              data-cy="name"
              value={formState.name}
              errors={errors}
            />
          </label>
          <label>
            Email{" "}
            <input
              type="text"
              name="email"
              onChange={handleChange}
              data-cy="email"
              value={formState.email}
            />
          </label>
          <label>
            Password{" "}
            <input
              type="password"
              name="password"
              onChange={handleChange}
              data-cy="password"
              value={formState.password}
            />
          </label>
          <label>
            Comfirm Password{" "}
            <input
              type="password"
              name="comfirmpassword"
              onChange={handleChange}
              data-cy="comfirmpassword"
              value={formState.comfirmpassword}
            />
          </label>
        
        <button type="submit"> Submit </button>
        <button type="cancel"> Cancel </button>
        <div>
          <Link to="/login">Have an account?</Link>
        </div>
      </form>
    </SignUpContainer>
  );
};


const SignUpContainer = styled.div`
  
    padding: 40px 0 20px 0;
    height: auto;
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
`

export default SignUp;

// axios post request "off/login" end points
