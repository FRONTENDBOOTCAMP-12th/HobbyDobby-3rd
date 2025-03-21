import { Link } from 'react-router';
import LeftArrow from '/assets/left-arrow.svg';
import './styles/my-page-edit-name-header.css';

function EditNameHeader({ header }: { header: string }) {
  return (
    <div className="edit-name-header">
      <Link to="/mypage" aria-label="뒤로 가기">
        <img src={LeftArrow} alt="" />
      </Link>
      <span>{header}</span>
      <button type="submit">완료</button>
    </div>
  );
}

export default EditNameHeader;
