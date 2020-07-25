import React from "react";
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.div`
    width: 100%;
    height: 50px;
    margin: 0 0 -20px 0;
    padding: 15px 0 15px 0;
    background-color: gray;
    
        h1 {
            color: black;
            font-size: 1.2rem;
            float: right;
            padding: 0 40px 0 0;
        }
`

const Footer = props  => {

    return (
        <FooterContainer>
            <h1>© Copyright 2020</h1>
        </FooterContainer>
  );

}

export default Footer;