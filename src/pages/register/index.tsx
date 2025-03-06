import HeadingLogo from '@/components/HeadingLogo';
import RegisterForm from '@/components/Register/RegisterForm';

function RegisterPage() {
  return (
    <div className="register-page">
      <HeadingLogo />
      <main>
        <h2>회원가입</h2>
        <RegisterForm />
      </main>
    </div>
  );
}

export default RegisterPage;
