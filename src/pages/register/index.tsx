import './style.css';
import HeadingLogo from '@/components/HeadingLogo';
import RegisterForm from '@/components/Form/RegisterForm';
import Title from '@/layouts/title';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

function RegisterPage() {
  const navigate = useNavigate();
  const user = localStorage.getItem('store/user');

  // 이미 로그인되었을 경우
  if (user) {
    void Swal.fire({
      icon: 'info',
      text: '이미 로그인되었습니다.',
      confirmButtonColor: `var(--primary-color)`,
      heightAuto: false,
    }).then(() => {
      void navigate('/home', { replace: true });
    });
  }

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
