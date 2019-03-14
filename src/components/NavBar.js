import React from "react";
import styled from "styled-components";
import pipedriveLogo from "../images/Pipedrive_Logo.svg";

const NavBarEl = styled.div`
  background-color: #424242;
  padding: 10px;
  padding-left: 15px;
  color: white;
`;

const PipedriveLogo = styled.img`
  height: 30px;
`;

const NavBar = () => (
  <NavBarEl>
    <PipedriveLogo src={pipedriveLogo} fill="white" />
  </NavBarEl>
);

export default NavBar;
