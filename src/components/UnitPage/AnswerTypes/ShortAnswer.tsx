import { debounce } from '@/utils/debounce';
import './short-answer.css';
import { useId } from 'react';

type ShortAnswerProps = React.ComponentProps<'input'> & {
  setNextAnswers: (value: string[], type: string) => void;
};

function ShortAnswer({ key, setNextAnswers, ...restProps }: ShortAnswerProps) {
  const shortAnswerId = useId();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNextAnswers([e.target.value], 'short_descript');

  const debouncedInput = debounce(handleInput, 300);

  return (
    <div className="short-answer__wrapper" key={key}>
      <label htmlFor={shortAnswerId} className="sr-only">
        단답형 답란
      </label>
      <input
        id={shortAnswerId}
        className="short-answer"
        type="text"
        placeholder="문자를 입력해주세요"
        onChange={(e) => debouncedInput(e)}
        {...restProps}
      />
    </div>
  );
}

export default ShortAnswer;
