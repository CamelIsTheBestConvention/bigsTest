import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface FrontDataProps {
  email: string | null;
}

const FrontData: React.FC<FrontDataProps> = ({ email }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("로그아웃하시겠습니까?")) {
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      sessionStorage.removeItem("email");

      navigate("/");
    }
  };

  return (
    <>
      <FrontDataDiv>
        <span>{email}</span>
        <span onClick={handleLogout}>로그아웃</span>
      </FrontDataDiv>
    </>
  );
};
export default FrontData;

const FrontDataDiv = styled.div`
  text-align: center;
  margin-top: 10px;
  display: flex;
  flex-direction: column;

  span {
    &:nth-child(1) {
      font-size: 18px;
    }

    &:nth-child(2) {
      margin: 0 auto;
      font-size: 12px;
      cursor: pointer;
      color: #bbbbbb;

      &:hover {
        color: #ff4d4d;
      }
    }
  }
`;
