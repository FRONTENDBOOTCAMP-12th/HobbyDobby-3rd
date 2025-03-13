import './styles/my-page-card.css';
import { getPublicImage } from '@/utils/getPublic';
import ProgressBar from '@/components/ProgressBar';
import { AchievementCardProps } from '@/types/my-page/achievement';

// 업적 카드 컴포넌트
function AchievementCard({
  level,
  name,
  total,
  current,
  description,
}: AchievementCardProps) {
  return (
    <div className="card achievement-card">
      {/* 아이콘과 레벨 - 좌측 */}
      <span className="level-badge">
        <img src={getPublicImage('burning.svg')} alt="불꽃 아이콘" />
        <h2>레벨{level}</h2>
      </span>

      {/* 업적 내용 - 우측 */}
      <div className="achievements">
        <div className="title-and-progress">
          <h2 aria-describedby="status">{name}</h2>
          <p id="status">
            {current}/{total}
          </p>
        </div>
        <ProgressBar value={current} max={total} />
        <p className="description">{description}</p>
      </div>
    </div>
  );
}

export default AchievementCard;
