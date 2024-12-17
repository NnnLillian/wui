import React, { ReactNode } from "react";
import styled from "styled-components";

interface CenterProps {
  children: ReactNode;
}

const CenterContainer = styled.div`
  display: flex;
  justify-content:center;
  align-items:center;
`;

const Center: React.FC<CenterProps> = ({ children }) => {
  return <CenterContainer>{children}</CenterContainer>;
};

export default Center;
