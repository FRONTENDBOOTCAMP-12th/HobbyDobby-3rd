import './unit-button.css';
import BurnIcon from '/assets/burning.svg';
import CheckIcon from '/assets/check.svg';
import ProgressBar from '@/components/ProgressBar';
import UnitCard from './UnitCard';
import { useEffect, useState, useRef } from 'react';

interface UnitButtonProps {
  unitTitle: string;
  buttonIcon?: string;
  buttonState?: 'complete' | 'disabled' | 'now';
  progressVisible?: boolean;
}

function UnitButton({
  buttonIcon = BurnIcon,
  unitTitle,
  buttonState = 'disabled',
  progressVisible = false,
}: UnitButtonProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

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
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (
        cardExpandOptions.ariaExpanded === true &&
        !sectionRef.current?.contains(target)
      ) {
        const nextCardExpandOptions = {
          ariaExpanded: !cardExpandOptions.ariaExpanded,
          hidden: !cardExpandOptions.hidden,
        };
        setCardExpandOptions(nextCardExpandOptions);
      }
    };

    const handleESCKeyEvent = (e: KeyboardEvent) => {
      if (cardExpandOptions.ariaExpanded === true && e.key === 'Escape') {
        const nextCardExpandOptions = {
          ariaExpanded: !cardExpandOptions.ariaExpanded,
          hidden: !cardExpandOptions.hidden,
        };
        setCardExpandOptions(nextCardExpandOptions);
      }
    };

    globalThis.addEventListener('click', handleClick);
    globalThis.addEventListener('keyup', handleESCKeyEvent);

    return () => {
      globalThis.removeEventListener('click', handleClick);
      globalThis.removeEventListener('keyup', handleESCKeyEvent);
    };
  }, [cardExpandOptions]);

  return (
    <section className="unit-section" ref={sectionRef}>
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
      {progressVisible ? <ProgressBar width="70px" value={0} max={5} /> : null}
      <UnitCard
        hidden={cardExpandOptions.hidden}
        cardState={buttonState}
        title={unitTitle}
        level={2}
        max_level={4}
      />
    </section>
  );
}

export default UnitButton;
