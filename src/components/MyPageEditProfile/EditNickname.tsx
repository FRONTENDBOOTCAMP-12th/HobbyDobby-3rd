import FormInput from '@/components/Form/FormInput';
import './styles/edit-nickname.css';

import { isUserInputDuplicate } from '@/lib/api';
import { useEditProfileStore } from '@/stores/user-profile-edit';
import { debounce } from '@/utils/debounce';
import { NICKNAME_REGEX } from '@/utils/form';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import EditProfileInfoHeader from './EditProfileInfoHeader';

function EditNickname({
  setIsDisabled,
  isDisabled,
  handleClickClose,
  nickname,
}: {
  isDisabled: boolean;
  handleClickClose: () => void;
  setIsDisabled: (isDisabled: boolean) => void;
  nickname: string;
}) {
  const [isDuplicate, setIsDuplicate] = useState<boolean>(true);
  const [newNickname, setNewNickname] = useState<string>('');

  const handleSetNickname = (value: string) => {
    useEditProfileStore.getState().updateProfile({ nickname: value });
  };

  const debouncedSetNickname = debounce((value: string) => {
    setNewNickname(value); // 디바운스가 완료된 후 상태 업데이트
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debouncedSetNickname(value);
    setIsDisabled(true);
  };

  const handleCheckDuplicate = async () => {
    if (newNickname && NICKNAME_REGEX.test(newNickname)) {
      const checkDuplicated = await isUserInputDuplicate(
        'nickname',
        newNickname
      );
      setIsDuplicate(checkDuplicated);
    }
    if (isDuplicate) {
      handleSetNickname('');
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
  }, [newNickname, isDuplicate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newNickname && newNickname !== nickname) {
      handleSetNickname(newNickname); // 부모 상태 업데이트 (제출 시)
    }
    handleClickClose();

    console.log('닉네임 변경 완료');
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
