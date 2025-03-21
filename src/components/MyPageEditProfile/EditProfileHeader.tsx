import { getPublicImage } from '@/utils/getPublic';
import './EditProfileHeader.css';

function EditProfileHeader({
  profileImage,
  item,
}: {
  profileImage?: string | null;
  item: { item: string; name: string } | null;
}) {
  const handleEditProfileImg = () => {
    console.log('프로필 이미지 수정하기');
  };

  return (
    <header className="edit-profile-header">
      <span className="profile-item__frame" aria-label="프로필 꾸미기 아이템">
        <img src={item?.item} alt={item?.name} />
      </span>
      <span className="edit-profile-img__frame">
        {profileImage ? <img src={profileImage} alt="프로필 이미지" /> : null}
      </span>
      <button
        className="edit-profile-img__button"
        type="button"
        onClick={handleEditProfileImg}
      >
        <img src={getPublicImage('edit-profile.svg')} alt="프로필 수정하기" />
      </button>
    </header>
  );
}

export default EditProfileHeader;
