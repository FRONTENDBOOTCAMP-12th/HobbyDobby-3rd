import './short-answer.css';

type ShortAnswerProps = React.ComponentProps<'input'>;

function ShortAnswer({ ...restProps }: ShortAnswerProps) {
  return (
    <input
      className="short-answer"
      type="text"
      placeholder="문자를 입력해주세요"
      {...restProps}
    />
  );
}

export default ShortAnswer;
