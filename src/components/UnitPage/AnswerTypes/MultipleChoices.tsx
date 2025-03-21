import { useRef } from 'react';
import './multiple-choices.css';

interface MultipleChoicesProps {
  key: string;
  choices: string[];
  idRef: string;
  answer: string;
  setNextAnswers: (value: string[], type: string) => void;
}

function MultipleChoices({
  key,
  choices,
  idRef,
  answer: nowChoice,
  setNextAnswers,
}: MultipleChoicesProps) {
  const radioRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    index: number
  ) => {
    if (e.key === ' ' || e.key === 'Enter') {
      setNextAnswers([choices[index]], 'select');
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const nextIndex = e.key === 'ArrowDown' ? index + 1 : index - 1;
      const nextRadio = radioRefs.current[nextIndex];
      if (nextRadio) {
        nextRadio.focus();
      }
    }
  };

  return (
    <ul
      key={key}
      className="multiple-choices"
      role="radiogroup"
      aria-labelledby={idRef}
      tabIndex={0}
      aria-activedescendant={nowChoice ?? choices[0]}
    >
      {choices.map((item, index) => (
        <li key={item} className="multiple-choices__choice">
          <span>{`${index + 1} ${item}`}</span>
          <div
            className="multiple-choices__choice__radio-button"
            ref={(el) => {
              radioRefs.current[index] = el;
            }}
            role="radio"
            tabIndex={0}
            aria-checked={nowChoice === item}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onClick={() => setNextAnswers([item], 'select')}
          ></div>
        </li>
      ))}
    </ul>
  );
}

export default MultipleChoices;
