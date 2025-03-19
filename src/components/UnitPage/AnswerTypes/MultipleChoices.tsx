import { useRef, useState } from 'react';
import './multiple-choices.css';

interface MultipleChoicesProps {
  choices: string[];
  idRef: string;
}

function MultipleChoices({ choices, idRef }: MultipleChoicesProps) {
  const radioRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [checkedValue, setCheckedValue] = useState<string | null>(null);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    index: number
  ) => {
    if (e.key === ' ' || e.key === 'Enter') {
      setCheckedValue(choices[index]);
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
      className="multiple-choices"
      role="radiogroup"
      aria-labelledby={idRef}
      tabIndex={0}
      aria-activedescendant={checkedValue ?? choices[0]}
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
            aria-checked={checkedValue === item}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onClick={() => setCheckedValue(item)}
          ></div>
        </li>
      ))}
    </ul>
  );
}

export default MultipleChoices;
