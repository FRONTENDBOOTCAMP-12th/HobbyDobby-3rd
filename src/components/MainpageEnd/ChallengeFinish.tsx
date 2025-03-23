import './challenge-finish.css';
import CustomButton from '@/components/CustomButton';

interface ChallengeFinish {
  onClick: () => void;
}

function ChallengeFinish({ onClick }: ChallengeFinish) {
  return (
    <div className="challenge-end">
      <img src="/assets/book.svg" alt="" className="challenge-end__bookmark" />
      <p className="challenge-end__challeng-name">25년 첫 독서 챌린지</p>
      <p className="challenge-end__the-end">완주!</p>

      <CustomButton
        type="button"
        buttonText="다음으로"
        bgColor="var(--secondary-color)"
        onClick={onClick}
      />
    </div>
  );
}

export default ChallengeFinish;
