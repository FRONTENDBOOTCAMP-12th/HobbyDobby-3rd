import './litreature.css';
import { Progress } from '@/pages/unit-page';
import { useUserStore } from '@/stores/user';

// 10, 책 사진 or 정보
// 12, 책 장르
// 14, 문화권
// 15, 책 제목, 작가
// 46, 초반 독서 정보
// 62, 중반 독서 정보
// 76, 후반 독서 정보
// 93, 독서 요약
// 94, 책에서 가장 인상깊었던 부분
// 95, 책을 다 읽고 난 뒤의 책에 대한 인상
// 96, 책 평점
// 98, 책을 읽고 떠올린 질문들
// 101, 본인이 생각한 책을 읽었던 것에 대한 진행도
const REVIEW_QUESTION_NUMBERS = [
  10, 12, 14, 15, 46, 62, 76, 93, 94, 95, 96, 98, 101,
];

function LiteratureType() {
  const challenge = useUserStore((user) => user.now_challenge);
  const reviewData = (challenge?.progress as Progress[]).filter((progress) =>
    REVIEW_QUESTION_NUMBERS.includes(progress.question_number)
  );

  const reviewContent = reviewData.map((data) => {
    const answerString = Array.isArray(data.answer)
      ? data.answer.join(' ')
      : '';

    const key = data.question_number;

    switch (data.question_number) {
      case 10:
        return data.type === 'file' ? (
          <figure
            key={key}
            className="challenge-review__hobby-literature--book-image"
          >
            <figcaption>표지 정보</figcaption>
            <img src={(data.answer as string[])[0]} alt="" />
          </figure>
        ) : (
          <div
            key={key}
            className="challenge-review__hobby-literature--content-wrapper"
          >
            <p>표지 정보</p>
            <p>{(data.answer as string[])[0]}</p>
          </div>
        );
      case 12:
        return (
          <div
            key={key}
            className="challenge-review__hobby-literature--content-wrapper"
          >
            <p>장르</p>
            <p>{(data.answer as string[])[0]}</p>
          </div>
        );
      case 14:
        return (
          <div
            key={key}
            className="challenge-review__hobby-literature--content-wrapper"
          >
            <p>출처</p>
            <p>{(data.answer as string[])[0]}</p>
          </div>
        );
      case 15:
        return (
          <div key={key}>
            <div className="challenge-review__hobby-literature--content-wrapper">
              <p>제목</p>
              <p>{data.answer_values[0]}</p>
            </div>
            <div className="challenge-review__hobby-literature--content-wrapper">
              <p>작가</p>
              <p>{data.answer_values[1]}</p>
            </div>
          </div>
        );
      case 46:
        return (
          <div
            key={key}
            className="challenge-review__hobby-literature--content-wrapper"
          >
            <p>초반부 독서 환경</p>
            <p>
              {answerString.endsWith('읽었어.')
                ? answerString
                : `${answerString} 이 책의 초반부를 읽었어.`}
            </p>
          </div>
        );
      case 62:
        return (
          <div
            key={key}
            className="challenge-review__hobby-literature--content-wrapper"
          >
            <p>중반부 독서 환경</p>
            <p>
              {answerString.endsWith('읽었어.')
                ? answerString
                : `${answerString} 이 책의 중반부를 읽었어.`}
            </p>
          </div>
        );
      case 76:
        return (
          <div
            key={key}
            className="challenge-review__hobby-literature--content-wrapper"
          >
            <p>후반부 독서 환경</p>
            <p>
              {answerString.endsWith('읽었어.')
                ? answerString
                : `${answerString} 이 책의 후반부를 읽었어.`}
            </p>
          </div>
        );
      case 93:
        return (
          <div
            key={key}
            className="challenge-review__hobby-literature--content-wrapper"
          >
            <p>간략한 요약</p>
            <p>{(data.answer as string[])[0]}</p>
          </div>
        );
      case 94:
        return (
          <div
            key={key}
            className="challenge-review__hobby-literature--content-wrapper"
          >
            <p>가장 인상깊었던 부분</p>
            <p>{(data.answer as string[]).join(' ')}</p>
          </div>
        );
      case 95:
        return (
          <div
            key={key}
            className="challenge-review__hobby-literature--content-wrapper"
          >
            <p>읽고난 뒤의 느낌</p>
            <p>{(data.answer as string[])[0]}</p>
          </div>
        );
      case 96:
        return (
          <div
            key={key}
            className="challenge-review__hobby-literature--content-wrapper"
          >
            <p>평점</p>
            <p>{(data.answer as string[])[0]}</p>
          </div>
        );
      case 98:
        return (
          <div
            key={key}
            className="challenge-review__hobby-literature--content-wrapper"
          >
            <p>읽고 난 뒤 떠오른 질문</p>
            <p>{(data.answer as string[])[0]}</p>
          </div>
        );
      case 101:
        return (
          <div
            key={key}
            className="challenge-review__hobby-literature--content-wrapper"
          >
            <p>계획 대비 진행도</p>
            <p>{(data.answer as string[])[0]}</p>
          </div>
        );
    }
  });

  return (
    <div className="challenge-review__hobby-literature">{reviewContent}</div>
  );
}

export default LiteratureType;
