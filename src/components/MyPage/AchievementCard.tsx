import './styles/my-page-card.css';
import { getPublicImage } from '@/utils/getPublic';
import ProgressBar from '@/components/ProgressBar';
import { AchievementCardProps } from '@/types/my-page/achievement';
// import CustomButton from '../CustomButton';

// 업적 카드 컴포넌트
function AchievementCard({
  achievement,
}: {
  achievement: AchievementCardProps;
}) {
  const {
    level,
    name,
    total,
    current,
    description,
    // isMax,
    // onReward,
  } = achievement;

  return (
    <div className="card achievement-card">
      {/* 아이콘과 레벨 - 좌측 */}
      {/* {isMax ? (
        <span className="level-badge">
          <CustomButton
            type="button"
            className="level-up-button"
            buttonText="보상 받기"
            bgColor="var(--quatenary-color)"
            onClick={onReward}
          />
        </span>
      ) : ( */}
      <span className="level-badge">
        <img src={getPublicImage('burning.svg')} alt="불꽃 아이콘" />
        <h3>레벨 {level}</h3>
      </span>
      {/* )} */}

      {/* 업적 내용 - 우측 */}
      <div className="achievements">
        <div className="title-and-progress">
          <h3 aria-describedby="status">{name}</h3>
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
