import './unit-button.css';
import BurnIcon from '/assets/burning.svg';
import CheckIcon from '/assets/check.svg';
import ProgressBar from '@/components/ProgressBar';
import UnitCard from './UnitCard';
import { useState } from 'react';

interface UnitButtonProps {
  id: string;
  unitTitle: string;
  onExpand: React.Dispatch<React.SetStateAction<string | null>>;
  maxUnit?: number;
  level?: number;
  buttonIcon?: string;
  buttonState?: 'complete' | 'disabled' | 'now';
  progressVisible?: boolean;
}

function UnitButton({
  id,
  unitTitle,
  level,
  maxUnit,
  onExpand,
  buttonIcon = BurnIcon,
  buttonState = 'disabled',
  progressVisible = false,
}: UnitButtonProps) {
  const [cardExpandOptions, setCardExpandOptions] = useState({
    ariaExpanded: false,
    hidden: true,
  });

  const handleCardExpand = () => {
    const nextCardExpandOptions = {
      ariaExpanded: !cardExpandOptions.ariaExpanded,
      hidden: !cardExpandOptions.hidden,
    };

    setCardExpandOptions(nextCardExpandOptions);

    if (nextCardExpandOptions.ariaExpanded) {
      console.log(onExpand);

      // onExpand();
    }
  };

  return (
    <section className="unit-section" id={id}>
      <button
        className={`
          unit-section__button${
            buttonState === 'disabled' ? ' unit-section__button-disabled' : ''
          }`}
        type="button"
        aria-expanded={cardExpandOptions.ariaExpanded}
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
        hidden={cardExpandOptions.hidden}
        cardState={buttonState}
        title={unitTitle}
        level={level}
        max_level={maxUnit}
      />
    </section>
  );
}

export default UnitButton;
