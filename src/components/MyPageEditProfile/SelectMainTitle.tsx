import EditInfoHeader from '@/components/MyPageEditProfile/EditProfileInfoHeader';
import useFetchData from '@/hooks/useFetchData';
import { getUserTitles } from '@/lib/api';
import { useUserStore } from '@/stores/user';
import { useEditProfileStore } from '@/stores/user-profile-edit';
import { useCallback, useState } from 'react';
import './styles/select-main-title.css';

interface SelectMainTitleProps {
  handleClickClose: () => void;
  handleClickSave: () => void;
  isDisabled: boolean;
  mainTitle: string | null;
  setIsDisabled: (isDisabled: boolean) => void;
}

function SelectMainTitle({
  handleClickClose,
  handleClickSave,
  isDisabled,
  mainTitle,
  setIsDisabled,
}: SelectMainTitleProps) {
  const userId = useUserStore((state) => state.uid);
  const [clickedTitle, setClickedTitle] = useState(mainTitle);

  const fetchTitles = useCallback(() => getUserTitles(userId), [userId]);
  const { data } = useFetchData(fetchTitles, userId);
  const titles = data?.data;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClickedTitle(e.target.id);
    setIsDisabled(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    useEditProfileStore.getState().updateProfile({
      title: clickedTitle,
    });
    handleClickSave();
  };

  return (
    <form className="edit-title__form" onSubmit={handleSubmit}>
      <EditInfoHeader
        header="칭호"
        isDisabled={isDisabled}
        handleClickClose={handleClickClose}
      />
      {titles?.map((data) => (
        <div className="edit-title__container" key={data.id}>
          <label htmlFor={data.title}>{data.title}</label>
          <input
            type="radio"
            name="title"
            id={data.title}
            checked={clickedTitle === data.title}
            onChange={handleChange}
          />
        </div>
      ))}
    </form>
  );
}

export default SelectMainTitle;
