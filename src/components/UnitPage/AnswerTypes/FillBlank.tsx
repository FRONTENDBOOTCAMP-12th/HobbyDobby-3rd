import { splitText } from '@/utils/splitBlankText';
import './fill-blank.css';

interface FillBlankProps {
  contents: string[];
  questionNumber: number | string;
}

function FillBlank({ contents, questionNumber }: FillBlankProps) {
  const splitedContents = contents.map((item) => splitText(item));

  return (
    <div className="fill-blank">
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
                    name=""
                    id={`empty-${questionNumber}-${itemsIndex}`}
                    placeholder="빈칸을 채워주세요."
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
