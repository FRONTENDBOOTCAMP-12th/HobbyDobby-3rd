import { useUserStore } from '@/stores/user';
import './challenge-review.css';
import LiteratureType from './ChallengeTypes/Literature';
import { getDate, getDiffDate } from '@/utils/getDate';
import CustomButton from '@/components/CustomButton';

interface ChallengeReviewProps {
  onClick: () => void;
}

function ChallengeReview({ onClick }: ChallengeReviewProps) {
  const challenge = useUserStore((user) => user.now_challenge);

  const diffInDays = getDiffDate(challenge?.created_date ?? Date.now());

  return (
    <div className="challenge-review">
      <div className="challenge-review__hobby-title">
        <p className="challenge-review__hobby-total-day">
          총 {diffInDays + 1}일
        </p>
        <p className="challenge-review__hobby-name">{challenge?.name}</p>
      </div>
      <div className="challenge-review__hobby-start-end">
        <p className="challenge-review__hobby-log">Challenge Log</p>
        <div className="challenge-review__hobby-day-wrapper">
          <p className="challenge-review__hobby-ment">챌린지 시작 날짜</p>
          <p className="challenge-review__hobby-day">
            {getDate(challenge?.created_date ?? Date.now())}
          </p>
        </div>
        <div className="challenge-review__hobby-day-wrapper">
          <p className="challenge-review__hobby-ment">챌린지 완주 날짜</p>
          <p className="challenge-review__hobby-day">{getDate(Date.now())}</p>
        </div>
      </div>
      {/* 현재는 시나리오 데이터가 독서-문학밖에 없기 때문에, 확인하지 않고 취미가 독서-문학인 경우의 챌린지 리뷰 데이터를 렌더링*/}
      {/* 챌린지의 취미 정보를 확인 후, 취미 종류별로 챌린지 리뷰 데이터를 다르게 렌더링*/}
      <LiteratureType />
      <CustomButton
        type="button"
        className="challenge-review__save"
        bgColor="var(--secondary-color)"
        onClick={onClick}
        buttonText="다음으로"
      />
    </div>
  );
}

export default ChallengeReview;
