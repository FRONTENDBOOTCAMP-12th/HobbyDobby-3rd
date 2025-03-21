import EditNameHeader from '@/components/MyPage/EditNameHeader';
import './style.css';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const exampleData = [
  {
    id: 1,
    title: '새싹',
  },
  {
    id: 2,
    title: '책 수집가',
  },
  {
    id: 3,
    title: '모험가',
  },
];

function MypageEditTitle() {
  const navigate = useNavigate();
  const [checkedTitle, setCheckedTitle] = useState<string>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedTitle(e.target.id);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void navigate('/mypage', { state: { checkedTitle } });
  };

  return (
    <form className="edit-title__form" onSubmit={handleSubmit}>
      <EditNameHeader header="칭호" />
      {exampleData.map((data) => (
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

export default MypageEditTitle;
