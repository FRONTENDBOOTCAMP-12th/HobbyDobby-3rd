import './login.css';
import LoginInput from './LoginInput';

function LoginForm() {
  return (
    <form className="login-form">
      <LoginInput type="email" label="아이디" />
      <LoginInput type="password" label="비밀번호" />
      <button type="submit">로그인</button>
    </form>
  );
}

export default LoginForm;
