import './rank-card.css';

interface RankCardProps {
  rank: number;
  profileImg: string | null;
  nickname: string;
  title: string | null;
  exp: number | null;
}

function LeaderBoardRankCard({
  rank,
  profileImg,
  nickname,
  title,
  exp,
}: RankCardProps) {
  return (
    <li className="leader-board-ranking__info">
      <div className="leader-board-ranking__container--lg">
        <p>{rank}</p>
        <div className="leader-board-ranking__user">
          {profileImg ? (
            <img
              src={profileImg}
              alt="사용자 프로필"
              className="leader-board-ranking__profileImg"
            />
          ) : (
            <img
              src="/assets/profile-none.jpg"
              alt="사용자 프로필"
              className="leader-board-detail__user-profile"
            />
          )}
          <div className="leader-board-ranking__container--sm">
            <p>{nickname}</p>
            <p>{title}</p>
          </div>
        </div>
      </div>
      <p>{exp?.toLocaleString()}점</p>
    </li>
  );
}

export default LeaderBoardRankCard;
