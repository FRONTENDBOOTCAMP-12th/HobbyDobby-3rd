import './style.css';

function MainpageStart() {
  return (
    <main>
      <h1 className="sr-only">Hobby Dobby</h1>
      <header></header>
      <p>챌린지의 이름을 정해주세요.</p>
      <form>
        <button type="submit">로그인</button>
      </form>
      <p>Tip. 나중에 변경할 수 있어요.</p>

      {/* 버튼 */}
      <div>
        <button type="button" className="start">
          정했어요
        </button>
      </div>
    </main>
  );
}

export default MainpageStart;
