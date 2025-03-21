import './unit-button.css';
import BurnIcon from '/assets/burning.svg';
import CheckIcon from '/assets/check.svg';
import ProgressBar from '@/components/ProgressBar';
import UnitCard from './UnitCard';

interface UnitButtonProps {
  id: string;
  unitTitle: string;
  isExpanded: boolean;
  onExpand: (id: string | null) => void;
  name?: string;
  level?: number;
  maxUnit?: number;
  section?: number;
  buttonIcon?: string;
  progressVisible?: boolean;
  buttonState?: 'complete' | 'disabled' | 'now';
}

function UnitButton({
  id,
  name,
  level,
  maxUnit,
  section,
  unitTitle,
  isExpanded,
  buttonIcon = BurnIcon,
  progressVisible = false,
  buttonState = 'disabled',
  onExpand,
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
        name={name}
        section={section}
        hidden={!isExpanded}
        cardState={buttonState}
        title={unitTitle}
        level={level}
        maxLevel={maxUnit}
      />
    </section>
  );
}

export default UnitButton;
