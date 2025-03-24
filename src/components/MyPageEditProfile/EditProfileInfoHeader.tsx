import './styles/edit-profile-info-header.css';
import LeftArrow from '/assets/left-arrow.svg';

interface EditNicknameHeaderProps {
  header: string;
  isDisabled: boolean;
  handleClickClose: () => void;
}

function EditProfileInfoHeader({
  header,
  isDisabled,
  handleClickClose,
}: EditNicknameHeaderProps) {
  return (
    <div className="edit-info-header">
      <button type="button" onClick={handleClickClose}>
        <img src={LeftArrow} alt="뒤로 가기" />
      </button>
      <span>{header}</span>
      <button type="submit" disabled={isDisabled}>
        완료
      </button>
    </div>
  );
}

export default EditProfileInfoHeader;
