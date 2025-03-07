import './register.css';
import { useState } from 'react';
import FormInput from './FormInput';
import { ID_REGEX, PW_REGEX } from '@/utils/form';
import { isUserInputDuplicate } from '@/lib/api';
// import { createUserAccount } from '@/lib/api';

export interface RegisterFormInputData {
  id: string;
  password: string;
  passwordCheck: string;
  nickname: string;
}

interface EventData {
  name: keyof RegisterFormInputData;
  value: string;
}

function RegisterForm() {
  // 입력 데이터
  const [inputData, setInputData] = useState<RegisterFormInputData>({
    id: '',
    password: '',
    passwordCheck: '',
    nickname: '',
  });

  // const [checkDuplicate]

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget as EventData;

    const nextInputData = {
      ...inputData,
      [name]: value,
    };

    setInputData(nextInputData);
  };

  const handleCheckDuplication = async (name: keyof RegisterFormInputData) => {
    const isDuplicated = await isUserInputDuplicate(name, inputData[name]);

    if (isDuplicated) {
      console.log('중복된 ID입니다.');
    } else {
      console.log('사용 가능한 ID입니다.');
    }
  };

  // const handleRegister = async () => {
  //   try {
  //     await createUserAccount({
  //       id: inputData.id,
  //     })
  //   } catch (err) {
  //     throw new Error(err as string);
  //   }
  // };

  return (
    // <form className="register-form" action={handleRegister}>
    <form className="register-form">
      <FormInput
        type="text"
        label="아이디"
        name="id"
        placeholder="아이디를 입력해주세요."
        value={inputData.id}
        alertMessage="최소 6자가 필요합니다."
        onChange={handleInput}
        regex={ID_REGEX}
        checkDuplicateButton={true}
        onClick={handleCheckDuplication}
      />
      <FormInput
        type="password"
        label="비밀번호"
        name="password"
        placeholder="비밀번호를 입력해주세요."
        value={inputData.password}
        alertMessage="최소 8자가 필요합니다."
        onChange={handleInput}
        regex={PW_REGEX}
      />
      <FormInput
        type="password"
        label="비밀번호 확인"
        name="passwordCheck"
        placeholder="비밀번호를 한번 더 입력해주세요."
        value={inputData.passwordCheck}
        alertMessage="최소 8자가 필요합니다."
        onChange={handleInput}
        regex={PW_REGEX}
      />
      <FormInput
        type="text"
        label="닉네임"
        name="nickname"
        placeholder="닉네임을 입력해주세요."
        value={inputData.nickname}
        alertMessage="최소 6자가 필요합니다."
        onChange={handleInput}
        regex={ID_REGEX}
        checkDuplicateButton={true}
        onClick={handleCheckDuplication}
      />
      <button type="submit">회원 가입</button>
    </form>
  );
}

export default RegisterForm;
