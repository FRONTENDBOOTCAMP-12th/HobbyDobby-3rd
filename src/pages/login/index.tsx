import './style.css';
import HeadingLogo from '@/components/HeadingLogo';
import LoginForm from '@/components/Form/LoginForm';
import { Link } from 'react-router';

function LoginPage() {
  return (
    <div className="login-page">
      <HeadingLogo />
      <main>
        <h2>로그인</h2>
        <LoginForm />
        <div className="login-page__register">
          <p>아직 가입하지 않았다면</p>
          <Link to="/register">회원가입 하러가기</Link>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
