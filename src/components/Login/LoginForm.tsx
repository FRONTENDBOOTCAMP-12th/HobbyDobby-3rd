import './login.css';
import LoginInput from './LoginInput';

function LoginForm() {
  return (
    <form className="login-form">
      <LoginInput
        isLabelSrOnly={true}
        type="email"
        label="아이디"
        placeholder="아이디를 입력해주세요."
      />
      <LoginInput
        isLabelSrOnly={true}
        type="password"
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요."
      />
      <button type="submit">로그인</button>
    </form>
  );
}

export default LoginForm;
