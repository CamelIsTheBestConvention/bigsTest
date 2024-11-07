const Signin: React.FC = () => {
  return (
    <>
      <header>로그인</header>
      <form>
        <main>
          <div>
            <span>이메일</span>
            <input type="text" placeholder="이메일" />
          </div>
          <div>
            <span>비밀번호</span>
            <input type="password" placeholder="비밀번호" />
          </div>
        </main>
      </form>
    </>
  );
};
export default Signin;
