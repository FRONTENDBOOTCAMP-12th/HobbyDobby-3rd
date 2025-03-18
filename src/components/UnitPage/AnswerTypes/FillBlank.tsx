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
                <input
                  key={`empty-${questionNumber}-${itemsIndex}`}
                  type="text"
                  name=""
                  id=""
                  placeholder="빈칸을 채워주세요."
                />
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
