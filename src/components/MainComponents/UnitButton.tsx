import './unit-button.css';
import BurnIcon from '/assets/burning.svg';
import CheckIcon from '/assets/check.svg';
import ProgressBar from '@/components/ProgressBar';
import UnitCard from './UnitCard';

interface UnitButtonProps {
  id: string;
  unitTitle: string;
  onExpand: (id: string | null) => void;
  isExpanded: boolean;
  maxUnit?: number;
  level?: number;
  buttonIcon?: string;
  buttonState?: 'complete' | 'disabled' | 'now';
  progressVisible?: boolean;
}

function UnitButton({
  id,
  level,
  maxUnit,
  isExpanded,
  unitTitle,
  onExpand,
  buttonIcon = BurnIcon,
  buttonState = 'disabled',
  progressVisible = false,
}: UnitButtonProps) {
  const handleCardExpand = () => {
    onExpand(isExpanded ? null : id);
  };

  return (
    <section className="unit-section" id={id}>
      <button
        className={`unit-section__button${
          buttonState === 'disabled' ? ' unit-section__button-disabled' : ''
        }`}
        type="button"
        aria-expanded={isExpanded}
        onClick={handleCardExpand}
      >
        <img
          src={buttonState === 'complete' ? CheckIcon : buttonIcon}
          alt={unitTitle}
        />
      </button>
      {progressVisible ? (
        <ProgressBar width="70px" value={level!} max={maxUnit!} />
      ) : null}
      <UnitCard
        hidden={!isExpanded}
        cardState={buttonState}
        title={unitTitle}
        level={level}
        max_level={maxUnit}
      />
    </section>
  );
}

export default UnitButton;
