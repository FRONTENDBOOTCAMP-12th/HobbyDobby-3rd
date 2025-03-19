import { useFilteredClassName } from '@/hooks/useFilteredClassName';
import './descriptive-type.css';
import clsx from 'clsx';
import TextareaAutosize from 'react-textarea-autosize';
import { useHandleInput } from '@/hooks/useHandleInput';
import { hidePlaceholder, showPlaceholder } from '@/utils/placeholder';

interface DescriptiveTypeProps {
  className?: string;
  placeholder?: string;
}

/* 서술형 인풋 컴포넌트 */
function DescriptiveType({
  className = '',
  placeholder = '답안을 작성해주세요.',
}: DescriptiveTypeProps) {
  const filteredClassName = useFilteredClassName(clsx('text-area', className));
  const MAX_LENGTH = 1000;

  const { inputCount, handleInput } = useHandleInput({ maxLength: MAX_LENGTH });

  return (
    <>
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
        onChange={handleInput}
        cacheMeasurements={true}
      ></TextareaAutosize>
      <output className="word-counter">
        {inputCount}/{MAX_LENGTH}
      </output>
    </>
  );
}

export default DescriptiveType;
