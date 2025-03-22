import './challenge-exit.css';
import { useNavigate } from 'react-router';
import CustomButton from '@/components/CustomButton';

function ChallengeExit() {
  const navigate = useNavigate();

  return (
    <div className="challenge-exit">
      <p className="challenge-exit__save-succeed">저장 완료 !</p>
      <CustomButton
        type="button"
        buttonText="메인으로 돌아가기"
        bgColor="var(--secondary-color)"
        onClick={() => void navigate('/home')}
      />
    </div>
  );
}

export default ChallengeExit;
