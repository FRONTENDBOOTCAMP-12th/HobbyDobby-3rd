import './styles/select-main-title.css';
import EditInfoHeader from '@/components/MyPageEditProfile/EditProfileInfoHeader';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { useUserStore } from '@/stores/user';
import useFetchData from '@/hooks/useFetchData';
import { getUserTitles } from '@/lib/api';

function SelectMainTitle({
  handleClickClose,
  isDisabled,
}: {
  handleClickClose: () => void;
  isDisabled: boolean;
}) {
  const navigate = useNavigate();
  const userId = useUserStore((state) => state.uid);
  const [checkedTitle, setCheckedTitle] = useState<string>();

  const fetchTitles = useCallback(() => getUserTitles(userId), [userId]);
  const { data } = useFetchData(fetchTitles, userId);
  const titles = data?.data;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedTitle(e.target.id);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void navigate('/mypage', { state: { checkedTitle } });
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
            checked={checkedTitle === data.title}
            onChange={handleChange}
          />
        </div>
      ))}
    </form>
  );
}

export default SelectMainTitle;
