import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

      alert("로그인 성공");
      console.log(response.data);
      sessionStorage.setItem("accessToken", response.data.accessToken);
      sessionStorage.setItem("refreshToken", response.data.refreshToken);

      navigate("/board");
    } catch (error) {
      console.log("로그인 중 에러", error);
      alert("로그인 실패");
    }
  };

  return (
    <>
      <header>로그인</header>
      <form>
        <main>
          <div>
            <span>이메일</span>
            <input
              type="text"
              placeholder="이메일"
              name="username"
              value={loginData.username}
              onChange={handleDataChange}
            />
          </div>
          <div>
            <span>비밀번호</span>
            <input
              type="password"
              placeholder="비밀번호"
              name="password"
              value={loginData.password}
              onChange={handleDataChange}
            />
          </div>
          <button onClick={handleSubmit}>로그인</button>
        </main>
      </form>
    </>
  );
};
export default Signin;
