import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../components/common/pageTitle";
import InputBox from "../components/common/inputBox";
import Button from "../components/common/button";
import styled from "styled-components";

interface loginData {
  username: string;
  password: string;
}

const Signin: React.FC = () => {
  const [loginData, setLoginData] = useState<loginData>({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://front-mission.bigs.or.kr/auth/signin`,
        {
          username: loginData.username,
          password: loginData.password,
        }
      );

      sessionStorage.setItem("accessToken", response.data.accessToken);
      sessionStorage.setItem("refreshToken", response.data.refreshToken);
      sessionStorage.setItem("email", loginData.username);

      alert("로그인 성공");
      console.log(response.data);

      navigate("/board");
    } catch (error) {
      console.log("로그인 중 에러", error);
      alert("로그인 실패");
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <>
      <LoginWrapper>
        <PageTitle titleText="로그인" />
        <form>
          <main>
            <InputBox
              type="text"
              placeholder="이메일"
              name="username"
              value={loginData.username}
              onChange={handleDataChange}
            />
            <InputBox
              type="password"
              placeholder="비밀번호"
              name="password"
              value={loginData.password}
              onChange={handleDataChange}
            />
            <Button onClick={handleSubmit} btnText="로그인" />
          </main>
        </form>
        <SignupBox>
          <span onClick={handleSignup}>회원가입</span>
        </SignupBox>
      </LoginWrapper>
    </>
  );
};
export default Signin;

const LoginWrapper = styled.div`
  width: 100%;
  padding: 80px 0;
`;

const SignupBox = styled.div`
  width: 60%;
  max-width: 500px;
  min-width: 200px;
  margin: 0 auto;
  text-align: right;
  color: #848484;

  &:hover {
    cursor: pointer;
    color: #007bff;
  }

  @media (max-width: 500px) {
    width: 90%;
    font-size: 13px;
  }
`;
