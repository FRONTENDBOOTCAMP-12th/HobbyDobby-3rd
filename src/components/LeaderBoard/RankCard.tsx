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
            <img src={profileImg} alt="사용자 프로필" />
          ) : (
            <div className="leader-board-ranking__profileImg-alt"></div>
          )}
          <div className="leader-board-ranking__container--sm">
            <p>{nickname}</p>
            <p>{title}</p>
          </div>
        </div>
      </div>
      <p>{exp}점</p>
    </li>
  );
}

export default LeaderBoardRankCard;
