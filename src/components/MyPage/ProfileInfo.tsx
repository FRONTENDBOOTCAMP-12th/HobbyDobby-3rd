import './styles/my-page-user-profile.css';

interface ProfileCardProps {
  nickName: string;
  mainTitle?: string | null;
  mainHobby?: string | null;
  mainHobbyIcon?: string | null;
  joinDate: string | null;
}

function ProfileInfo({
  nickName,
  mainTitle = '취미 입문자',
  mainHobby,
  mainHobbyIcon,
  joinDate,
}: ProfileCardProps) {
  return (
    <article className="article-container profile-details">
      <h2 className="sr-only">프로필 정보</h2>
      {mainHobbyIcon?.trim() && (
        <span className="profile-details-main-hobby__icon-frame">
          <img
            src={mainHobbyIcon}
            alt={`대표 취미 : ${mainHobby ?? '정보 없음'} 아이콘`}
          />
        </span>
      )}
      <ul>
        <li>{nickName}</li>
        <li>{mainTitle}</li>
        {joinDate && <li>가입일 : {joinDate}</li>}
      </ul>
    </article>
  );
}

export default ProfileInfo;
