import './styles/my-page-user-profile.css';

import { getPublicImage } from '@/utils/getPublic';

interface ProfileHeaderProps {
  profileImage?: string | null;
  setIsEditing: (isEditing: boolean) => void;
  profileItem?: { image: string; name: string } | null;
}

function ProfileHeader({
  profileImage = null,
  setIsEditing,
  profileItem: item,
}: ProfileHeaderProps) {
  const handleEditProfile = () => {
    setIsEditing(true);
    console.log('프로필 수정하기');
  };

  return (
    <div className="profile-header__container">
      <span className="profile-item__frame" aria-label="프로필 꾸미기 아이템">
        {item?.image && <img src={item?.image} alt={item?.name} />}
      </span>
      <h2 className="sr-only">프로필 헤더</h2>
      <span className="profile-img__frame">
        {profileImage ? <img src={profileImage} alt="프로필 이미지" /> : null}
      </span>
      <button
        className="edit-profile__btn"
        type="button"
        onClick={handleEditProfile}
      >
        <img src={getPublicImage('edit-profile.svg')} alt="프로필 수정하기" />
      </button>
    </div>
  );
}

export default ProfileHeader;
