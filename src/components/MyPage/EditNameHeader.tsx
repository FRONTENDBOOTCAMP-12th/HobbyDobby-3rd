import { Link } from 'react-router';
import LeftArrow from '/assets/left-arrow.svg';
import './styles/my-page-edit-name-header.css';

interface EditNameHeaderProps {
  header: string;
  isDisabled: boolean;
}

function EditNameHeader({ header, isDisabled }: EditNameHeaderProps) {
  return (
    <div className="edit-name-header">
      <Link to="/mypage" aria-label="뒤로 가기">
        <img src={LeftArrow} alt="" />
      </Link>
      <span>{header}</span>
      <button type="submit" disabled={isDisabled}>
        완료
      </button>
    </div>
  );
}

export default EditNameHeader;
