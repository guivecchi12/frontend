import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";
import styled from "styled-components";

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
    e.persist();
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
    <FormContainer>
      <form onSubmit={handleSumbmit}>
        <h1>Sign up Now!</h1>
        <fieldset>
          <label htmlFor="name">
            User Name{" "}
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
        </fieldset>
        <button type="cancel"> Cancel </button>
        <button type="submit"> Submit </button>
        <div>
          <p>Have an account?</p>
        </div>
      </form>
    </FormContainer>
  );
};

const FormContainer = styled.div``;

export default SignUp;

// axios post request "off/login" end points
