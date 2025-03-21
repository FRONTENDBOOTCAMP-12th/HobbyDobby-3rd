import { useFilteredClassName } from '@/hooks/useFilteredClassName';
import './descriptive-type.css';
import clsx from 'clsx';
import TextareaAutosize from 'react-textarea-autosize';
import { useHandleInput } from '@/hooks/useHandleInput';
import { hidePlaceholder, showPlaceholder } from '@/utils/placeholder';
import { debounce } from '@/utils/debounce';

interface DescriptiveTypeProps {
  key: string;
  className?: string;
  placeholder?: string;
  setNextAnswers: (value: string[], type: string) => void;
}

/* 서술형 인풋 컴포넌트 */
function DescriptiveType({
  key,
  className = '',
  placeholder = '답안을 작성해주세요.',
  setNextAnswers,
}: DescriptiveTypeProps) {
  const filteredClassName = useFilteredClassName(clsx('text-area', className));
  const MAX_LENGTH = 1000;

  const { inputCount, handleInput } = useHandleInput({ maxLength: MAX_LENGTH });

  const handleInputAndSetNextAnswers = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    handleInput(e);
    setNextAnswers([e.target.value], 'descript');
  };
  const debouncedInput = debounce(handleInputAndSetNextAnswers, 300);

  return (
    <div className="descriptive" key={key}>
      <label htmlFor="descriptive-answer" className="sr-only">
        서술형 답안 입력 공간
      </label>
      <TextareaAutosize
        id="descriptive-answer"
        name="descriptive-answer"
        className={filteredClassName}
        placeholder={placeholder}
        minRows={10}
        onFocus={hidePlaceholder}
        onBlur={(event) => showPlaceholder(event, '답안을 작성해주세요.')}
        onChange={(e) => debouncedInput(e)}
        cacheMeasurements={true}
      ></TextareaAutosize>
      <output className="word-counter">
        {inputCount}/{MAX_LENGTH}
      </output>
    </div>
  );
}

export default DescriptiveType;
