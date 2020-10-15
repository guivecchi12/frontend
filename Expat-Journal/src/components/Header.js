import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  background-color: rgb(13, 0, 70);
  h1 {
    font-family: "Permanent Marker", cursive;
    color: #d4a218;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 3.5rem;
    font-weight: 500;
    letter-spacing: 0.15rem;
    line-height: 1;
    text-shadow: #ffffff 0.1875rem 0.125rem 0;
    position: relative;
    margin: 2rem;
  }
  nav {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
  }
  .btn {
    letter-spacing: 0.1em;
    cursor: pointer;
    font-size: 14px;
    font-weight: 400;
    line-height: 45px;
    max-width: 40rem;
    position: relative;
    text-decoration: none;
    text-transform: uppercase;
    width: 20rem;
    margin: 1rem;
  }
  .btn:hover {
    text-decoration: none;
  }
  /*btn_background*/
  .effect01 {
    color: #fff;
    border: 4px solid #0d0046;
    box-shadow: 0px 0px 0px 1px #0d0046 inset;
    background-color: #0d0046;
    overflow: hidden;
    position: relative;
    transition: all 0.3s ease-in-out;
  }
  .effect01:hover {
    border: 4px solid #0d0046;
    background-color: #fff;
    box-shadow: 0px 0px 0px 4px #eee inset;
  }
  /*btn_text*/
  .effect01 span {
    transition: all 0.2s ease-out;
    z-index: 2;
  }
  .effect01:hover span {
    letter-spacing: 0.13em;
    color: #0d0046;
  }
  /*highlight*/
  .effect01:after {
    background: #d4a218;
    border: 0px solid #0d0046;
    content: “”;
    height: 9.6875rem;
    left: -4.6875rem;
    opacity: 0.8;
    position: absolute;
    top: -3.125rem;
    -webkit-transform: rotate(35deg);
    transform: rotate(35deg);
    width: 50px;
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1); /*easeOutCirc*/
    z-index: 1;
  }
  .effect01:hover:after {
    background: #fff;
    border: 1.25rem solid #0d0046;
    opacity: 0;
    left: 120%;
    -webkit-transform: rotate(40deg);
    transform: rotate(40deg);
  }
  }
`;

const Header = (props) => {
  return (
    <NavContainer>
      <h1>Expat Journal</h1>
      <nav>
        <a
          className="btn effect01"
          href="https://expatjournal2020.netlify.app/index.html"
        >
          <span>Home</span>
        </a>
        <Link to="/protected" className="btn effect01">
          Journey
        </Link>
        <a
          className="btn effect01"
          href="https://expatjournal2020.netlify.app/our_team.html"
        >
          <span>About</span>
        </a>
        <a
          className="btn effect01"
          href="https://expatjournal2020.netlify.app/contact.html"
        >
          <span>Contact</span>
        </a>
      </nav>
    </NavContainer>
  );
};

export default Header;
