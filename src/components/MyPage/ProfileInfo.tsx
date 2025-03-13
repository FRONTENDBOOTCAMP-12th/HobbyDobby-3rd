import './styles/my-page-user-profile.css';

interface ProfileCardProps {
  nickName: string;
  mainTitle?: string | null;
  mainHobby: string;
  mainHobbyIcon: string;
  joinDate: string | null;
}

function ProfileInfo({
  nickName,
  mainTitle = '취미 입문자',
  mainHobby = '대표 취미 이름',
  mainHobbyIcon,
  joinDate,
}: ProfileCardProps) {
  return (
    <article className="article-container profile-details">
      <h2 className="sr-only">프로필 정보</h2>
      <span className="profile-main-hobby-icon-frame">
        {mainHobbyIcon ? (
          <img src={mainHobbyIcon} alt={`${mainHobby} 아이콘`} />
        ) : (
          <h2 className="sr-only">{`${mainHobby} 아이콘`}</h2>
        )}
      </span>
      <ul>
        <li>{nickName}</li>
        <li>{mainTitle}</li>
        <li>가입일 : {joinDate}</li>
      </ul>
    </article>
  );
}

export default ProfileInfo;
