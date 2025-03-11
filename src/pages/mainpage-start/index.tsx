import './style.css';
import TextForm from '@/components/Form/TextForm';

function MainpageStart() {
  return (
    <main className="Challengstart">
      <h1 className="sr-only">Hobby Dobby</h1>
      <header></header>
      <p className="ChallengeName">챌린지의 이름을 정해주세요.</p>
      <form>
        <TextForm />
      </form>
      <p className="tip">Tip. 나중에 변경할 수 있어요.</p>

      {/* 버튼 부분 */}
      <div>
        <button type="button" className="decide">
          정했어요
        </button>
      </div>
    </main>
  );
}

export default MainpageStart;
