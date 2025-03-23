import { useRef, useState } from 'react';
import './login.css';
import FormInput from './FormInput';
import { getUserByID, getUserHobbiesByUID } from '@/lib/api';
import { useUserStore } from '@/stores/user';
import { ID_REGEX, PW_REGEX } from '@/utils/form';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { debounce } from '@/utils/debounce';

interface LoginFormInputData {
  id: string;
  password: string;
}

function LoginForm() {
  const navigate = useNavigate();

  // 입력 데이터
  const [inputData, setInputData] = useState<LoginFormInputData>({
    id: '',
    password: '',
  });

  // zustand User 데이터 저장소에서 데이터 전체 갱신 함수(login) 가져오기
  const login = useUserStore((state) => state.login);

  const isLoginDisable = !(
    inputData.id !== '' &&
    inputData.password !== '' &&
    ID_REGEX.test(inputData.id) &&
    PW_REGEX.test(inputData.password)
  );

  const handleInput = (name: string, value: string) => {
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const debouncedHandleInput = useRef(
    debounce((name: string, value: string) => {
      handleInput(name, value); // debounce 후 value를 직접 처리
    }, 300)
  ).current;

  const handleLogIn = async () => {
    const inputID = inputData.id;

    try {
      const { data: user, error } = await getUserByID(inputID);

      if (user) {
        const nextInputData = { id: '', password: '' };

        if (user?.length > 0) {
          const inputPW = inputData.password;
          const userData = user[0];

          if (userData.password === inputPW) {
            // uid를 바탕으로 데이터 가져오기
            const userHobbies = await getUserHobbiesByUID(userData.uid);

            // 필요한 데이터 저장(zustand Store들에 저장)
            login({
              ...userData,
              user_hobbies: userHobbies.map(
                (item) => item?.name as string | null
              ),
            });

            // 페이지 이동
            // 로그인 된 유저 정보에 따라 다른 페이지로 이동(신규=취미 선택/기존 유저=메인)
            if (userData.now_hobby) {
              await Swal.fire({
                icon: 'success',
                title: '로그인 성공',
                text: '메인페이지로 이동합니다.',
                confirmButtonColor: `var(--primary-color)`,
                heightAuto: false,
              });

              void navigate('/home');
            } else {
              await Swal.fire({
                icon: 'success',
                title: '로그인 성공',
                text: '취미선택페이지로 이동합니다.',
                confirmButtonColor: `var(--primary-color)`,
                heightAuto: false,
              });
              void navigate('/select-hobby');
            }
          } else {
            nextInputData.id = inputData.id;
            setInputData(nextInputData);

            await Swal.fire({
              icon: 'error',
              title: '로그인 실패',
              text: '비밀번호가 올바르지 않습니다.',
              confirmButtonColor: `var(--primary-color)`,
              heightAuto: false,
            });
          }
        } else {
          setInputData(nextInputData);

          await Swal.fire({
            icon: 'error',
            title: '로그인 실패',
            text: '아이디가 올바르지 않습니다.',
            confirmButtonColor: `var(--primary-color)`,
            heightAuto: false,
          }).catch((error) => {
            console.log(error);
          });
        }
      } else {
        throw error;
      }
    } catch (err) {
      throw new Error(err as string);
    }
  };

  return (
    <form
      className="login-form"
      onSubmit={(e) => {
        e.preventDefault();
        void handleLogIn();
      }}
    >
      <FormInput
        isLabelSrOnly={true}
        type="text"
        label="아이디"
        name="id"
        placeholder="아이디를 입력해주세요."
        value={inputData.id}
        alertMessage="최소 6자가 필요합니다."
        onChange={(e) => {
          const { name, value } = e.target;
          debouncedHandleInput(name, value); // debouncedHandleInput 사용
        }}
        regex={ID_REGEX}
      />
      <FormInput
        isLabelSrOnly={true}
        type="password"
        label="비밀번호"
        name="password"
        placeholder="비밀번호를 입력해주세요."
        value={inputData.password}
        alertMessage="최소 8자가 필요합니다."
        onChange={(e) => {
          const { name, value } = e.target;
          debouncedHandleInput(name, value); // debouncedHandleInput 사용
        }}
        regex={PW_REGEX}
      />
      <button type="submit" disabled={isLoginDisable}>
        로그인
      </button>
    </form>
  );
}

export default LoginForm;
