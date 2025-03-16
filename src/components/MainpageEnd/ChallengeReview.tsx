import './challenge-review.css';

function ChallengeReview() {
  return (
    <main className="challenge-review">
      <h1 className="sr-only">Hobby Dobby</h1>
      <div className="challenge-review__hobbytitle">
        <p className="challenge-review__hobbytotalday">총 24일</p>
        <p className="challenge-review__hobbyname">25년 첫 독서 챌린지</p>
        <div className="challenge-review__hobbyinfo">
          <p>독서 : 문학</p>
          <p>책 제목 : 천 개의 파랑</p>
          <p>작가 : 천선란</p>
        </div>
      </div>
      <div className="challenge-review__hobby-start-end">
        <p className="challenge-review__hobbylog">Challenge Log</p>
        <p className="challenge-review__hobbyday">2025년 1월 25일</p>
        <p className="challenge-review__hobbyment">챌린지를 시작했어요.</p>
        <p className="challenge-review__hobbyday">2025년 2월 18일</p>
        <p className="challenge-review__hobbyment">챌린지를 완주했어요.</p>
      </div>
      <button type="button" className="challenge-review__save">
        저장
      </button>
    </main>
  );
}

export default ChallengeReview;
