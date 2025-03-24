import CustomButton from '@/components/CustomButton';
import FormInput from '@/components/Form/FormInput';
import HeadingLogo from '@/components/HeadingLogo';
import { deleteUserData } from '@/lib/api';
import { useUserStore } from '@/stores/user';
import { PW_REGEX } from '@/utils/form';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import './style.css';

function WithdrawPage() {
  const userId = useUserStore((state) => state.uid);
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();

  const [inputData, setInputData] = useState({
    password: '',
    passwordCheck: '',
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    const nextInputData = {
      ...inputData,
      [name]: value,
    };

    setInputData(nextInputData);
  };

  // 탈퇴하기 버튼 활성화 조건
  const isDisable = !(
    inputData.password !== '' &&
    inputData.passwordCheck === inputData.password &&
    PW_REGEX.test(inputData.password)
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Swal.fire({
      text: '정말로 탈퇴하시겠습니까?',
      icon: 'question',
      confirmButtonColor: `var(--primary-color)`,
      showCancelButton: true,
      heightAuto: false,
    })
      // 탈퇴 확인 Swal 후
      .then((result) => {
        if (result.isConfirmed) {
          deleteUserData(userId, inputData.password)
            // delete 통신 후
            .then((isSuccess) => {
              // delete 성공
              if (isSuccess) {
                Swal.fire({
                  title: '회원탈퇴 완료',
                  icon: 'success',
                  text: '랜딩페이지로 이동합니다.',
                  confirmButtonColor: `var(--primary-color)`,
                  heightAuto: false,
                })
                  .then(() => {
                    logout();
                    localStorage.removeItem('store/user');
                    void navigate('/');
                  })
                  .catch((error) => console.log(error));
              }
              // delete 실패
              else if (!isSuccess) {
                Swal.fire({
                  title: '회원탈퇴 실패',
                  icon: 'error',
                  text: '비밀번호가 일치하지 않습니다.',
                  confirmButtonColor: `var(--primary-color)`,
                  heightAuto: false,
                }).catch((error) => console.log(error));
              } else {
                Swal.fire({
                  title: '회원탈퇴 실패',
                  icon: 'error',
                  text: '잠시 후 다시 시도해주세요.',
                  confirmButtonColor: `var(--primary-color)`,
                  heightAuto: false,
                }).catch((error) => console.log(error));
              }
            })
            // delete 통신 error
            .catch((error) => {
              console.log(error);
            });
        }
      })
      // 탈퇴 확인 Swal error
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="withdraw">
      <div className="withdraw__header">
        <HeadingLogo />
        <h2>회원 탈퇴</h2>
      </div>

      <form onSubmit={handleSubmit} className="withdraw__form">
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
        <div className="withdraw__button">
          <CustomButton
            type="submit"
            disabled={isDisable}
            buttonText="탈퇴하기"
            onClick={() => {
              console.log('회원 탈퇴 완료');
            }}
          />
          <CustomButton
            type="button"
            buttonText="돌아가기"
            bgColor="var(--secondary-color)"
            onClick={() => {
              void navigate('/mypage');
            }}
          />
        </div>
      </form>
    </div>
  );
}

export default WithdrawPage;
