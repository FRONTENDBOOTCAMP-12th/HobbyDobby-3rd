import { useState } from 'react';
import './login.css';
import LoginInput from './LoginInput';
import { getUserById } from '@/lib/api';

interface FormInputData {
  id: string;
  password: string;
}

interface EventData {
  name: keyof FormInputData;
  value: string;
}

const ID_REGEX = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$/;
const PW_REGEX = /^[a-zA-Z0-9!@#$%^&*()-_+=]{8,}$/;

function LoginForm() {
  // 입력 데이터
  const [inputData, setInputData] = useState<FormInputData>({
    id: '',
    password: '',
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget as EventData;

    const nextInputData = {
      ...inputData,
      [name]: value,
    };

    setInputData(nextInputData);
  };

  const handleLogIn = async (formData: FormData) => {
    const inputId = formData.get('id') as string;

    try {
      const { data: user, error } = await getUserById(inputId);

      if (user) {
        const nextInputData = { id: '', password: '' };

        if (user?.length > 0) {
          const inputPw = formData.get('password') as string;
          const userData = user[0];

          if (userData.password === inputPw) {
            console.log('login!!');
            // 로그인이 되었다는 토스트 / 알림
            // 필요한 데이터 저장(zustand or local Storage or ...?) 페이지 이동
          } else {
            console.log('invalid PW');
            // 비밀번호가 올바르지 않다는 토스트(라이브러리 사용?) / 알림
            nextInputData.id = inputData.id;
            setInputData(nextInputData);
          }
        } else {
          console.log('invalid ID');
          // 아이디가 올바르지 않다는 토스트(라이브러리 사용?) / 알림
          setInputData(nextInputData);
        }
      } else {
        throw error;
      }
    } catch (err) {
      throw new Error(err as string);
    }
  };

  return (
    <form className="login-form" action={handleLogIn}>
      <LoginInput
        isLabelSrOnly={true}
        type="text"
        label="아이디"
        name="id"
        placeholder="아이디를 입력해주세요."
        value={inputData.id}
        alertMessage="최소 6자가 필요합니다."
        onChange={handleInput}
        regex={ID_REGEX}
      />
      <LoginInput
        isLabelSrOnly={true}
        type="password"
        label="비밀번호"
        name="password"
        placeholder="비밀번호를 입력해주세요."
        value={inputData.password}
        alertMessage="최소 8자가 필요합니다."
        onChange={handleInput}
        regex={PW_REGEX}
      />
      <button type="submit">로그인</button>
    </form>
  );
}

export default LoginForm;
