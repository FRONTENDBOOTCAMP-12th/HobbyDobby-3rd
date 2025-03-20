import './short-answer.css';
import { useId } from 'react';

type ShortAnswerProps = React.ComponentProps<'input'>;

function ShortAnswer({ ...restProps }: ShortAnswerProps) {
  const shortAnswerId = useId();

  return (
    <>
      <label htmlFor={shortAnswerId} className="sr-only">
        단답형 답란
      </label>
      <input
        id={shortAnswerId}
        className="short-answer"
        type="text"
        placeholder="문자를 입력해주세요"
        {...restProps}
      />
    </>
  );
}

export default ShortAnswer;
