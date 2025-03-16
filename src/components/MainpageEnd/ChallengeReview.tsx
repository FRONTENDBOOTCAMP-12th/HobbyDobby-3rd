import './challenge-review.css';

function ChallengeReview() {
  return (
    <main className="Challenge-review">
      <h1 className="sr-only">Hobby Dobby</h1>
      <div className="Challenge-review_hobbytitle">
        <p className="Challenge-review_hobbytotalday">총 24일</p>
        <p className="Challenge-review_hobbyname">25년 첫 독서 챌린지</p>
        <div className="Challenge-review_hobbyinfo">
          <p>독서 : 문학</p>
          <p>책 제목 : 천 개의 파랑</p>
          <p>작가 : 천선란</p>
        </div>
      </div>
      <div className="Challenge-review_hobby-start-end">
        <p className="Challenge-review_hobbylog">Challenge Log</p>
        <p className="Challenge-review_hobbyday">2025년 1월 25일</p>
        <p className="Challenge-review_hobbyment">챌린지를 시작했어요.</p>
        <p className="Challenge-review_hobbyday">2025년 2월 18일</p>
        <p className="Challenge-review_hobbyment">챌린지를 완주했어요.</p>
      </div>
      <button type="button" className="Challenge-review_save">
        저장
      </button>
    </main>
  );
}

export default ChallengeReview;
