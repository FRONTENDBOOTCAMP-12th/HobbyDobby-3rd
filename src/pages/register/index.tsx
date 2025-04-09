import './style.css';
import HeadingLogo from '@/components/HeadingLogo';
import RegisterForm from '@/components/Form/RegisterForm';
import Title from '@/layouts/title';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

function RegisterPage() {
  const navigate = useNavigate();

  // 이미 로그인되었을 경우
  useEffect(() => {
    const user = localStorage.getItem('store/user');

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
  }, [navigate]);

  return (
    <div className="register-page">
      <Title>회원가입</Title>
      <HeadingLogo />
      <main>
        <h2>회원가입</h2>
        <RegisterForm />
      </main>
    </div>
  );
}

export default RegisterPage;
