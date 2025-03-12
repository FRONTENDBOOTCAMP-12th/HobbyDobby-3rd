import './register.css';
import { useState } from 'react';
import FormInput from './FormInput';
import { ID_REGEX, PW_REGEX } from '@/utils/form';
import { isUserInputDuplicate, createUserAccount } from '@/lib/api';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

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

  // 아이디 입력값 중복 확인 함수, supabase db와 통신
  const handleCheckDuplicationId = async (
    name: keyof RegisterFormInputData
  ) => {
    if (inputData.id) {
      const isDuplicated = await isUserInputDuplicate(name, inputData[name]);

      if (isDuplicated) {
        const nextInputData = {
          ...inputData,
          [name]: '',
        };
        setInputData(nextInputData);
        await Swal.fire({
          icon: 'warning',
          text: '중복된 ID입니다.',
          heightAuto: false,
        });
      } else {
        const nextIsDuplicate = {
          ...isDuplicate,
          [name]: false,
        };
        setIsDuplicate(nextIsDuplicate);
        await Swal.fire({
          icon: 'success',
          text: '사용 가능한 ID입니다.',
          heightAuto: false,
        });
      }
    }
  };

  // 닉네임 입력 중복 확인
  const handleCheckDuplicationNickname = async (
    name: keyof RegisterFormInputData
  ) => {
    if (inputData.nickname) {
      const isDuplicated = await isUserInputDuplicate(name, inputData[name]);

      if (isDuplicated) {
        const nextInputData = {
          ...inputData,
          [name]: '',
        };
        setInputData(nextInputData);
        await Swal.fire({
          icon: 'warning',
          text: '중복된 닉네임입니다.',
          heightAuto: false,
        });
      } else {
        const nextIsDuplicate = {
          ...isDuplicate,
          [name]: false,
        };
        setIsDuplicate(nextIsDuplicate);
        await Swal.fire({
          icon: 'success',
          text: '사용 가능한 닉네임입니다.',
          heightAuto: false,
        });
      }
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

    await Swal.fire({
      icon: 'success',
      title: '회원가입 완료',
      text: '로그인 페이지로 이동합니다.',
      heightAuto: false,
    });
    // react-router 함수, 페이지 이동
    void navigate('/login');
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
        onClick={handleCheckDuplicationId}
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
        onClick={handleCheckDuplicationNickname}
      />
      <button type="submit" disabled={isRegisterDisable}>
        회원 가입
      </button>
    </form>
  );
}

export default RegisterForm;
