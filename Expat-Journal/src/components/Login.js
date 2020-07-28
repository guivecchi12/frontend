import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import mukuko from "../Img/traveler.jpg";

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
        }

        form {
            display: flex;
            flex-direction: column;
            width: 310px;
            margin: 20px auto;
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
            margin: 8px 0 0 10px;
            border: 2px solid black;
            border-radius: 6px;
            padding: 10px 20px;
            font-size: 1.2rem;
        }

        .terms {
            display: inline-block;
            text-align: center;
            padding: 10px 0 0 0;
            font-size: 1.3rem;
            margin-left: -15px;
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
            margin: 20px 0 0 80px;
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
            }
            text-align: center;
            padding: 30px 0 0 10px;
        }
`;

const Login = ({ users, setUsers }) => {
  //this is the react state
  const defaultState = {
    name: "",
    password: "",
    terms: false,
  };

  const [formState, setFormState] = useState(defaultState);
  const [errors, setErrors] = useState({ ...defaultState, terms: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);

  //this is the formState schema

  let formSchema = Yup.object().shape({
    name: Yup.string().required("Please provide name."),
    email: Yup.string().required("Please provide a email."),
    password: Yup.string()
      .required("Please enter a correct Password")
      .matches(
        "/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/",
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      )
      .min(6, "Passwords must be at least 6 characters long."),
    terms: Yup.boolean().oneOf(
      [true],
      "Please agree to the terms and conditions"
    ),
  });

  useEffect(() => {
    //    one way is
    //     formSchema.isValid(formState).then(valid => {
    //       setButtonDisabled(!valid);
    //     });
    if (formState.terms) {
      setButtonDisabled(!formState.terms);
    }
  }, [formState]);

  //this is use for the onsubmit function
  const formSubmit = (e) => {
    e.preventDefault();
    //I added axios data here so it does not fire a lot when its outside
    console.log("Form Submitted");
    // to reset form
    // setFormState({...errors});
    // console.log(formState.name)
    // console.log(formState.password);
    axios
      .post("https://reqres.in/api/users", formState)
      .then((res) => {
        console.log("form submitted success", res);
        //I set setUser here so it can retrieve the user data to the DOM
        setUsers(res.data);
        //this one is to add all the user
        // setUsers([...users, formState]);
        console.log("success", users);
        setFormState({
          name: "",
          password: "",
          terms: "",
        });
      })
      .catch((err) => {
        console.log("This is the Error", err);
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
          [e.target.name]: "",
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
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
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
          <label htmlFor="name">
            Username
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={formState.name}
              label="Name"
              errors={errors}
            />
            {errors.name.length !== 0 && <p className="error">{errors.name}</p>}
          </label>
          <label htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={formState.password}
              label="Password"
              errors={errors}
            />
            {errors.password.length !== 0 && (
              <p className="error">{errors.password}</p>
            )}
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
