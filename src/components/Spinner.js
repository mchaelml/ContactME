import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export default styled.div`
  position: absolute;
  background-color: transparent;
  left: calc(50% - 5em);
  top: calc(50% - 5em);
  width: 6em;
  height: 6em;
  border: 1em solid rgba(0, 0, 0, 0.2);
  border-left: 1em solid black;
  border-radius: 50%;
  animation: ${rotate360} 1.1s infinite linear;
`;
