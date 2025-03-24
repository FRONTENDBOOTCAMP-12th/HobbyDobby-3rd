import useFetchData from '@/hooks/useFetchData';
import { getHobby } from '@/lib/api';
import { useEditProfileStore } from '@/stores/user-profile-edit';
import { useCallback, useState } from 'react';
import EditProfileInfoHeader from './EditProfileInfoHeader';
import './styles/select-main-hobby.css';

interface SelectMainHobbyProps {
  handleClickClose: () => void;
  isDisabled: boolean;
  mainHobby: string | null;
  setIsDisabled: (isDisabled: boolean) => void;
  handleClickSave: () => void;
}

function SelectMainHobby({
  handleClickClose,
  isDisabled,
  mainHobby,
  setIsDisabled,
  handleClickSave,
}: SelectMainHobbyProps) {
  const [selectedHobby, setSelectedHobby] = useState(mainHobby);

  // 취미 목록을 가져오는 함수
  const fetchHobbies = useCallback(() => getHobby(), []);
  const { data } = useFetchData(fetchHobbies, '');
  const hobbies = data?.data;

  // 취미 변경 시 상태 업데이트
  const handleHobbyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedHobby(e.target.id); // 선택한 취미 저장
    setIsDisabled(false); // 수정 가능 상태로 변경
  };

  // 폼 제출 시 프로필 업데이트
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    useEditProfileStore.getState().updateProfile({
      main_hobby: selectedHobby, // 선택한 취미로 프로필 업데이트
    });
    handleClickSave(); // 저장 처리
  };

  // 취미 옵션을 렌더링하는 함수
  const renderHobbyOptions = () => {
    return hobbies?.map((hobby) => (
      <div className="edit-main-hobby__container" key={hobby.id}>
        <label htmlFor={hobby.name}>{hobby.name}</label>
        <input
          type="radio"
          name="title"
          id={hobby.name}
          checked={selectedHobby === hobby.name} // 선택한 취미가 현재 취미와 일치하는지 확인
          onChange={handleHobbyChange} // 취미 변경 시 처리
        />
      </div>
    ));
  };

  return (
    <form className="edit-main-hobby__form" onSubmit={handleSubmit}>
      {/* 프로필 수정 헤더 컴포넌트 */}
      <EditProfileInfoHeader
        header="대표 취미"
        isDisabled={isDisabled}
        handleClickClose={handleClickClose}
      />
      {/* 취미 옵션 렌더링 */}
      {renderHobbyOptions()}
    </form>
  );
}

export default SelectMainHobby;
