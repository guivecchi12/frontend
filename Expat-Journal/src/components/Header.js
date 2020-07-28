import React from "react";
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.div`
    width: 100%;
    height: 80px;
    font-size: 1.5rem;
    display: flex;
    justify-content: space-between;
    background-color: gray;

    h1 {
        color: black;
        font-size: 1.5rem;
        margin: 20px 30px;
    }

    nav {
       margin-top: 20px;
        a {
            text-decoration: none;
            color: black;
            margin-right: 70px;
            justify-content: space-between;
            
            &:hover {
                color: silver;
            }
        }
    }
`


const Header = props  => {

    return (
        <NavContainer>
            <div className='logo'>
                <h1>Expat Journal</h1>
            </div>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/images'>Albums</Link>
                <Link to='/login'>Login</Link>
                <Link to='/'>Sign Up</Link>
            </nav>
        </NavContainer>
  );

}

export default Header;