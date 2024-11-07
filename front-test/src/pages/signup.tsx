import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const [signupData, setSignupData] = useState({
    username: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [btnState, setBtnState] = useState(false);
  const navigate = useNavigate();

  // input change
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
      const response = await axios.post(
        `https://front-mission.bigs.or.kr/auth/signup`,
        {
          username: signupData.username,
          name: signupData.name,
          password: signupData.password,
          confirmPassword: signupData.confirmPassword,
        }
      );

      alert("회원가입 완료");
      navigate("/");
    } catch (error) {
      console.log("회원가입 중 에러", error);
      alert("회원가입 실패");
    }
  };

  return (
    <>
      <header>회원가입</header>
      <form>
        <main>
          <div>
            <span>이메일</span>
            <input
              type="text"
              placeholder="이메일 형식"
              name="username"
              value={signupData.username}
              onChange={handleDataChange}
            />
          </div>
          <div>
            <span>이름</span>
            <input
              type="text"
              placeholder="이름"
              name="name"
              value={signupData.name}
              onChange={handleDataChange}
            />
          </div>
          <div>
            <span>비밀번호</span>
            <input
              type="password"
              placeholder="비밀번호"
              name="password"
              value={signupData.password}
              onChange={handleDataChange}
            />
          </div>
          <div>
            <span>비밀번호 확인</span>
            <input
              type="password"
              placeholder="비밀번호 확인"
              name="confirmPassword"
              value={signupData.confirmPassword}
              onChange={handleDataChange}
            />
          </div>
          <button onClick={handleSubmit} disabled={btnState}>
            회원가입
          </button>
        </main>
      </form>
    </>
  );
};
export default Signup;
