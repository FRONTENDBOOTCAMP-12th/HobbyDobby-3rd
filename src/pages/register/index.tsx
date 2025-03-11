import './style.css';
import HeadingLogo from '@/components/HeadingLogo';
import RegisterForm from '@/components/Form/RegisterForm';
import Title from '@/layouts/title';

function RegisterPage() {
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
