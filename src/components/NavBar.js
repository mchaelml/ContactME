import React from "react";
import styled from "styled-components";
import Logo from "../images/Logo.svg";

const NavBarEl = styled.div`
  background-color: #424242;
  padding: 10px;
  padding-left: 15px;
  color: white;
  align-items: center;
  display: flex;
`;

const Logos = styled.img`
  height: 30px;
`;

const NavBar = () => (
  <NavBarEl>
    <Logos src={Logo} fill="white" /> ContactME
  </NavBarEl>
);

export default NavBar;
