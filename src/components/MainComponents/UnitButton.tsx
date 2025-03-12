import './unit-button.css';
import ProgressBar from '@/components/ProgressBar';
import UnitCard from './UnitCard';
import { useEffect, useState, useId, useRef } from 'react';

interface UnitButtonProps {
  buttonIcon: string;
  unitTitle: string;
  buttonState?: 'complete' | 'disabled' | 'now';
  progressVisible?: boolean;
}

function UnitButton({
  buttonIcon,
  unitTitle,
  buttonState = 'disabled',
  progressVisible = false,
}: UnitButtonProps) {
  const unitSectionId = useId();
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
    <section className="unit-section" id={unitSectionId} ref={sectionRef}>
      <button
        className="unit-section__button"
        type="button"
        aria-expanded={cardExpandOptions.ariaExpanded}
        onClick={handleCardExpand}
      >
        <img src={buttonIcon} alt={unitTitle} />
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
