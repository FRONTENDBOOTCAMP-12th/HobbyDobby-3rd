import './style.css';
import HeadingLogo from '@/components/HeadingLogo';
import LoginForm from '@/components/Form/LoginForm';
import { Link, useNavigate } from 'react-router';
import Title from '@/layouts/title';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

function LoginPage() {
  const navigate = useNavigate();
  const user = localStorage.getItem('store/user');

  // 이미 로그인되었을 경우
  useEffect(() => {
    if (user) {
      Swal.fire({
        icon: 'info',
        text: '이미 로그인되었습니다.',
        confirmButtonColor: `var(--primary-color)`,
        heightAuto: false,
        scrollbarPadding: false,
      })
        .then(() => {
          void navigate('/home', { replace: true });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [navigate, user]);

  return (
    <div className="login-page">
      <Title>로그인</Title>
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
