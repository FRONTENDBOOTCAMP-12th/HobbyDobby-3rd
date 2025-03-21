import FormInput from '@/components/Form/FormInput';
import EditNameHeader from '@/components/MyPage/EditNameHeader';
import { ID_REGEX } from '@/utils/form';
import './style.css';
import { useState } from 'react';
import { useNavigate } from 'react-router';

function MypageEditNickname() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void navigate('/mypage', { state: { nickname } });
  };

  return (
    <form className="edit-nickname__form" onSubmit={handleSubmit}>
      <EditNameHeader header="닉네임" />
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
      />
    </form>
  );
}

export default MypageEditNickname;
