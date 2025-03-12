import { useFilteredClassName } from '@/hooks/useFilteredClassName';
import './descriptive-type.css';
import clsx from 'clsx';
import { ChangeEvent, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

interface DescriptiveTypeProps {
  className?: string;
  placeholder?: string;
}

/* 서술형 인풋 컴포넌트 */
function DescriptiveType({
  className = '',
  placeholder = '답안을 작성해주세요.',
}: DescriptiveTypeProps) {
  const MAX_LENGTH = 1000;
  const [inputCount, setInputCount] = useState(0);

  const filteredClassName = useFilteredClassName(clsx('text-area', className));

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > MAX_LENGTH) {
      e.target.value = e.target.value.slice(0, MAX_LENGTH);
    }
    setInputCount(e.target.value.length);
  };

  return (
    <>
      <label htmlFor="descriptive-answer" className="sr-only">
        서술형 답안 입력 공간
      </label>
      <TextareaAutosize
        id="descriptive-answer"
        className={filteredClassName}
        placeholder={placeholder}
        minRows={10}
        onFocus={(placeholder) => (placeholder.target.placeholder = '')}
        onBlur={(placeholder) =>
          (placeholder.target.placeholder = '답안을 작성해주세요.')
        }
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
