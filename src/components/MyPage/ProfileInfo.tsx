import './styles/my-page-user-profile.css';

interface ProfileCardProps {
  nickName: string;
  mainTitle?: string;
  mainHobby: string;
  mainHobbyIcon: string;
  joinDate: string;
}

function ProfileInfo({
  nickName = '닉네임',
  mainTitle = '취미 입문자',
  mainHobbyIcon = '',
  mainHobby = '대표 취미 이름',
  joinDate = '2025년 3월',
}: ProfileCardProps) {
  return (
    <article className="board profile-details-board">
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
