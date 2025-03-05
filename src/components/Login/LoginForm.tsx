import { useState } from 'react';
import './login.css';
import LoginInput from './LoginInput';

interface FormInputData {
  id: string;
  password: string;
}

interface EventData {
  name: keyof FormInputData;
  value: string;
}

interface Alert {
  isValidId: boolean;
  isValidPw: boolean;
}

const idRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$/;
const pwRegex = /^[a-zA-Z0-9!@#$%^&*()-_+=]{8,}$/;

function LoginForm() {
  const [inputData, setInputData] = useState<FormInputData>({
    id: '',
    password: '',
  });

  const [alert, setAlert] = useState<Alert>({
    isValidId: true,
    isValidPw: true,
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget as EventData;
    const nextAlert = { ...alert };

    switch (name) {
      case 'id':
        nextAlert.isValidId = idRegex.test(value) ? true : false;
        break;
      case 'password':
        nextAlert.isValidPw = pwRegex.test(value) ? true : false;
    }

    const nextInputData = {
      ...inputData,
      [name]: value,
    };

    setInputData(nextInputData);
    setAlert(nextAlert);
  };

  return (
    <form className="login-form">
      <LoginInput
        isLabelSrOnly={true}
        type="text"
        label="아이디"
        name="id"
        placeholder="아이디를 입력해주세요."
        value={inputData.id}
        alertMessage="최소 6자가 필요합니다."
        onChange={handleInput}
        isValidInput={alert.isValidId}
      />
      <LoginInput
        isLabelSrOnly={true}
        type="password"
        label="비밀번호"
        name="password"
        placeholder="비밀번호를 입력해주세요."
        value={inputData.password}
        alertMessage="최소 8자와 특수문자가 필요합니다."
        onChange={handleInput}
        isValidInput={alert.isValidPw}
      />
      <button type="submit">로그인</button>
    </form>
  );
}

export default LoginForm;
