import './review-content.css';
import { Progress } from '@/pages/unit-page';
import CustomButton from '../CustomButton';

interface ReviewContentProps {
  section: number;
  progress: Progress[];
  handleClick: () => void;
}

function ReviewContent({ section, progress, handleClick }: ReviewContentProps) {
  return (
    <div className="review-content">
      <h2>섹션{section}까지의 모든 내용들을 리뷰해보자! 🎉</h2>
      <ul>
        {progress.map((progress) => (
          <li
            key={progress.question_number}
            className="review-content__list-item"
          >
            <h3>Q: {progress.question}</h3>
            {(progress.answer as string[]).map((answer, index) => {
              if (progress.type === 'file') {
                return (
                  <img
                    key={`${progress.question_number}-${index}`}
                    src={answer}
                    alt={`${progress.question_number}번 답변 이미지`}
                  />
                );
              }

              return (
                <p key={`${progress.question_number}-${index}`}>{answer}</p>
              );
            })}
          </li>
        ))}
      </ul>
      <CustomButton
        type="button"
        buttonText="섹션 완료"
        className="submit-btn"
        bgColor="var(--secondary-color)"
        onClick={handleClick}
      />
    </div>
  );
}

export default ReviewContent;
