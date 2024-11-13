import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../components/common/pageTitle";
import InputBox from "../components/common/inputBox";
import Button from "../components/common/button";
import styled from "styled-components";
import InputText from "../components/common/inputText";

interface signupData {
  username: string;
  name: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const [signupData, setSignupData] = useState<signupData>({
    username: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [btnState, setBtnState] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*\d)(?=.*[!%*#?&])[a-z\d!%*#?&]{8,}$/;

    const inputCheck =
      emailRegex.test(signupData.username) &&
      signupData.name &&
      passwordRegex.test(signupData.password) &&
      signupData.password === signupData.confirmPassword;

    setBtnState(!inputCheck);
  }, [signupData]);

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSignupData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  // signup change
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await axios.post(`https://front-mission.bigs.or.kr/auth/signup`, {
        username: signupData.username,
        name: signupData.name,
        password: signupData.password,
        confirmPassword: signupData.confirmPassword,
      });

      alert("회원가입 완료");
      navigate("/");
    } catch (error) {
      console.log("회원가입 중 에러", error);
      alert("회원가입 실패");
    }
  };

  const handleLogin = () => {
    navigate("/");
  };

  return (
    <>
      <SignupWrapper>
        <PageTitle titleText="회원가입" />
        <form>
          <main>
            <div>
              <InputText text="이메일" />
              <InputBox
                type="text"
                placeholder="이메일"
                name="username"
                value={signupData.username}
                onChange={handleDataChange}
              />
            </div>
            <div>
              <InputText text="이름" />
              <InputBox
                type="text"
                placeholder="이름"
                name="name"
                value={signupData.name}
                onChange={handleDataChange}
              />
            </div>
            <div>
              <InputText text="비밀번호" />
              <InputBox
                type="password"
                placeholder="비밀번호"
                name="password"
                value={signupData.password}
                onChange={handleDataChange}
              />
            </div>
            <div>
              <InputText text="비밀번호 확인" />
              <InputBox
                type="password"
                placeholder="비밀번호 확인"
                name="confirmPassword"
                value={signupData.confirmPassword}
                onChange={handleDataChange}
              />
            </div>
            <Button
              btnText="회원가입"
              onClick={handleSubmit}
              disabled={btnState}
            />
          </main>
        </form>
        <LoginBox>
          <span onClick={handleLogin}>로그인 페이지로</span>
        </LoginBox>
      </SignupWrapper>
    </>
  );
};
export default Signup;

const SignupWrapper = styled.div`
  width: 100%;
  padding: 80px 0;
`;

const LoginBox = styled.div`
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
