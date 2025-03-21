import { splitText } from '@/utils/splitBlankText';
import './fill-blank.css';
import { useEffect, useState } from 'react';
import { Answers } from '../UnitContent';
import { debounce } from '@/utils/debounce';

interface FillBlankProps {
  key: string;
  contents: string[];
  questionNumber: number | string;
  setAnswers: React.Dispatch<React.SetStateAction<Answers>>;
}

function FillBlank({
  key,
  contents,
  questionNumber,
  setAnswers,
}: FillBlankProps) {
  const [inputs, setInputs] = useState<string[]>(
    Array(contents.length).fill('')
  );
  const splitedContents = contents.map((item) => splitText(item));

  // 연속된 빈칸 채우기의 경우, 이전의 배열이 영향을 주기 때문에 contents가 바뀔 시 아예 초기화
  useEffect(() => {
    setInputs(Array(contents.length).fill(''));
  }, [contents]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const nextInputs = [...inputs];
    nextInputs[index] = e.target.value;
    setInputs(nextInputs);

    const nextAnswers: Answers = {
      answeredType: 'fill',
      answer_values: [...nextInputs],
      answer: contents.map((text, index) =>
        text.replace('ㅁ', nextInputs[index])
      ),
    };
    setAnswers(nextAnswers);
  };

  const debouncedInputChange = debounce(handleInputChange, 300);

  return (
    <div className="fill-blank" key={key}>
      {splitedContents.map((items, itemsIndex) => (
        <div
          key={`question-${itemsIndex}`}
          className={`fill-blank__content-wrapper${itemsIndex === 0 ? '' : ' has-before'}`}
        >
          {items.map((item, itemIndex) => {
            if (item === 'ㅁ') {
              return (
                <div
                  className="fill-blank__blank"
                  key={`empty-${questionNumber}-${itemsIndex}`}
                >
                  <label
                    htmlFor={`empty-${questionNumber}-${itemsIndex}`}
                    className="sr-only"
                  >
                    {`질문 ${questionNumber}번에 대한 빈칸 ${itemsIndex}`}
                  </label>
                  <input
                    type="text"
                    id={`empty-${questionNumber}-${itemsIndex}`}
                    placeholder="빈칸을 채워주세요."
                    onChange={(e) => debouncedInputChange(e, itemsIndex)}
                  />
                </div>
              );
            }
            return (
              <p
                key={`content-${questionNumber}-${itemsIndex}-${itemIndex}`}
                className={`fill-blank__content${itemIndex === 0 ? ' first-content' : ''}`}
              >
                {item}
              </p>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default FillBlank;
