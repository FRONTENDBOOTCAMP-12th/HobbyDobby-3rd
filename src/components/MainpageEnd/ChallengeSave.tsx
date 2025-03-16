import './challenge-save.css';

function ChallengeSave() {
  return (
    <main className="challenge-save">
      <h1 className="sr-only">Hobby Dobby</h1>
      <p>
        <span className="challenge-save__challenge-target">
          25년 첫 독서 챌린지
        </span>
        <span className="challenge-save__challenge-other">를</span>
      </p>
      <p className="challenge-save__listsave">를 리스트에 저장할게요....</p>
    </main>
  );
}

export default ChallengeSave;
