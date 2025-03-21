import FormInput from '@/components/Form/FormInput';
import EditNameHeader from '@/components/MyPage/EditNameHeader';
import { ID_REGEX } from '@/utils/form';
import './style.css';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { isUserInputDuplicate } from '@/lib/api';
import Swal from 'sweetalert2';

function MypageEditNickname() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState<string>('');
  const [isDuplicate, setIsDuplicate] = useState<boolean>(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleCheckDuplicate = async () => {
    if (nickname && ID_REGEX.test(nickname)) {
      const isDuplicated = await isUserInputDuplicate('nickname', nickname);

      if (isDuplicated) {
        setNickname('');
        await Swal.fire({
          icon: 'warning',
          text: '중복된 닉네임입니다.',
          confirmButtonColor: `var(--primary-color)`,
          heightAuto: false,
        });
      } else {
        setIsDuplicate(false);

        await Swal.fire({
          icon: 'success',
          text: '사용 가능한 닉네임입니다.',
          confirmButtonColor: `var(--primary-color)`,
          heightAuto: false,
        });
      }
    }
  };

  const isDisabled = !(
    nickname !== '' &&
    !isDuplicate &&
    ID_REGEX.test(nickname)
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void navigate('/mypage', { state: { nickname } });
  };

  return (
    <form className="edit-nickname__form" onSubmit={handleSubmit}>
      <EditNameHeader header="닉네임" isDisabled={isDisabled} />
      <FormInput
        type="text"
        label="닉네임"
        name="nickname"
        placeholder="닉네임을 입력해주세요."
        value={nickname}
        onChange={handleChange}
        alertMessage="최소 6자가 필요합니다."
        regex={ID_REGEX}
        checkDuplicateButton={true}
        onClick={handleCheckDuplicate}
      />
    </form>
  );
}

export default MypageEditNickname;
