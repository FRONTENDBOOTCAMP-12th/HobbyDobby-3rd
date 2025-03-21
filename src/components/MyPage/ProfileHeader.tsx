import './styles/my-page-user-profile.css';

import { getPublicImage } from '@/utils/getPublic';

interface ProfileHeaderProps {
  profileImage?: string | null;
  setIsEditing: (isEditing: boolean) => void;
}

function ProfileHeader({
  profileImage = null,
  setIsEditing,
}: ProfileHeaderProps) {
  const handleEditProfile = () => {
    setIsEditing(true);
    console.log('프로필 수정하기');
  };

  return (
    <>
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
    </>
  );
}

export default ProfileHeader;
