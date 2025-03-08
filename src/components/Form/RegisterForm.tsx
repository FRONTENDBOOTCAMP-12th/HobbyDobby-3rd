import './register.css';
import { useState } from 'react';
import FormInput from './FormInput';
import { ID_REGEX, PW_REGEX } from '@/utils/form';
import { isUserInputDuplicate, createUserAccount } from '@/lib/api';
import { useNavigate } from 'react-router';

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

  // 입력 데이터에 중복이 있는지 없는지 확인용 상태
  const [isDuplicate, setIsDuplicate] = useState({
    id: true,
    nickname: true,
  });

  // react-router 함수
  const navigate = useNavigate();

  // 회원 가입 버튼 활성화 조건
  const isRegisterDisable = !(
    inputData.password !== '' &&
    !isDuplicate.id &&
    !isDuplicate.nickname &&
    inputData.passwordCheck === inputData.password &&
    PW_REGEX.test(inputData.password)
  );

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget as EventData;

    const nextInputData = {
      ...inputData,
      [name]: value,
    };

    setInputData(nextInputData);
  };

  // 입력값 중복 확인 함수, supabase db와 통신
  const handleCheckDuplication = async (name: keyof RegisterFormInputData) => {
    const isDuplicated = await isUserInputDuplicate(name, inputData[name]);

    if (isDuplicated) {
      const nextInputData = {
        ...inputData,
        [name]: '',
      };
      setInputData(nextInputData);
      // 이후엔 alertMessage 출력? 뭔가 알림이 필요.
      console.log('중복된 ID입니다.');
    } else {
      const nextIsDuplicate = {
        ...isDuplicate,
        [name]: false,
      };
      setIsDuplicate(nextIsDuplicate);
      // 이후엔 alertMessage 출력? 뭔가 알림이 필요.
      console.log('사용 가능한 ID입니다.');
    }
  };

  // validation이 전부 이뤄진 후에 활성화된 버튼을 클릭 시 함수 실행
  // 아이디 등록 후 로그인 창으로 이동
  const handleRegister = async () => {
    const { data, error } = await createUserAccount({
      id: inputData.id,
      nickname: inputData.nickname,
      password: inputData.password,
    });

    if (data === null) {
      throw error;
    }

    // alertmessage
    console.log('ID 생성 완료!');

    // react-router 함수, 페이지 이동
    await navigate('/login');
  };

  return (
    <form
      className="register-form"
      onSubmit={(e) => {
        e.preventDefault();
        void handleRegister();
      }}
    >
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
      <button type="submit" disabled={isRegisterDisable}>
        회원 가입
      </button>
    </form>
  );
}

export default RegisterForm;
