import './styles/my-page-user-profile.css';

import { getPublicImage } from '@/utils/getPublic';

interface ProfileHeaderProps {
  profileImage?: string | null;
}

function ProfileHeader({ profileImage = null }: ProfileHeaderProps) {
  const handleEditProfile = () => {
    console.log('프로필 수정하기');
  };

  return (
    <>
      <h2 className="sr-only">프로필 헤더</h2>
      <span className="profile-image-frame">
        {profileImage ? <img src={profileImage} alt="프로필 이미지" /> : null}
      </span>
      <button
        className="edit-profile-btn"
        type="button"
        onClick={handleEditProfile}
      >
        <img src={getPublicImage('edit-profile.svg')} alt="프로필 수정하기" />
      </button>
    </>
  );
}

export default ProfileHeader;
