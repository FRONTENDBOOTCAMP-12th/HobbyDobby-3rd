import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { isUserInputDuplicate } from '@/lib/api';
import { useEditProfileStore } from '@/stores/user-profile-edit';
import { NICKNAME_REGEX } from '@/utils/form';
import EditProfileInfoHeader from './EditProfileInfoHeader';
import FormInput from '@/components/Form/FormInput';
import './styles/edit-nickname.css';

interface EditNicknameProps {
  setIsDisabled: (isDisabled: boolean) => void;
  isDisabled: boolean;
  handleClickClose: () => void;
  handleClickSave: () => void;
  nickname: string;
}

function EditNickname({
  setIsDisabled,
  isDisabled,
  handleClickClose,
  handleClickSave,
  nickname,
}: EditNicknameProps) {
  const [isDuplicate, setIsDuplicate] = useState<boolean>(true);
  const [newNickname, setNewNickname] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewNickname(value);
    setIsDisabled(true);
  };

  /* -------------------------------------------------------------------------- */
  /*                                 버그 수정 요함!!                              */
  /* -------------------------------------------------------------------------- */

  const handleCheckDuplicate = async () => {
    if (newNickname && NICKNAME_REGEX.test(newNickname)) {
      const checkDuplicated = await isUserInputDuplicate(
        'nickname',
        newNickname
      );
      setIsDuplicate(checkDuplicated);
    }
    if (isDuplicate) {
      useEditProfileStore.getState().updateProfile({ nickname: '' });
      await Swal.fire({
        icon: 'warning',
        text: '중복된 닉네임입니다.',
        confirmButtonColor: `var(--primary-color)`,
        heightAuto: false,
      });
    } else {
      await Swal.fire({
        icon: 'success',
        text: '사용 가능한 닉네임입니다.',
        confirmButtonColor: `var(--primary-color)`,
        heightAuto: false,
      });
    }
  };

  useEffect(() => {
    if (
      newNickname !== '' &&
      !isDuplicate &&
      NICKNAME_REGEX.test(newNickname)
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newNickname, isDuplicate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newNickname && newNickname !== nickname) {
      useEditProfileStore.getState().updateProfile({ nickname: newNickname });
    }
    handleClickSave();
  };

  return (
    <form className="edit-nickname__form" onSubmit={handleSubmit}>
      <EditProfileInfoHeader
        header="닉네임"
        isDisabled={isDisabled}
        handleClickClose={handleClickClose}
      />
      <FormInput
        type="text"
        label="닉네임"
        name="nickname"
        placeholder="닉네임을 입력해주세요."
        onChange={handleChange}
        value={newNickname}
        alertMessage="3~11자의 이름이 필요합니다."
        regex={NICKNAME_REGEX}
        checkDuplicateButton={true}
        onClick={handleCheckDuplicate}
      />
    </form>
  );
}

export default EditNickname;
