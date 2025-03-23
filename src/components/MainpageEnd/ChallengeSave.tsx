import { useUserStore } from '@/stores/user';
import './challenge-save.css';
import CustomButton from '@/components/CustomButton';

interface ChallengeSaveProps {
  onClick: () => Promise<void>;
}

function ChallengeSave({ onClick }: ChallengeSaveProps) {
  const challenge = useUserStore((user) => user.now_challenge);

  return (
    <div className="challenge-save">
      <p>
        <span className="challenge-save__challenge-target">
          {challenge?.name}
        </span>
        <span className="challenge-save__challenge-other">를</span>
      </p>
      <p className="challenge-save__listsave">완료하고 저장할게요! 🧙‍♂️</p>
      <CustomButton
        type="button"
        buttonText="저장"
        onClick={() => void onClick()}
        bgColor="var(--secondary-color)"
      />
    </div>
  );
}

export default ChallengeSave;
