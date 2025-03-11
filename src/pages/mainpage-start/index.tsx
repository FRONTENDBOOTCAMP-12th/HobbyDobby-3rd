import './style.css';
import TextForm from '@/components/Form/TextForm';
import ProgressBar from '@/components/ProgressBar';

function MainpageStart() {
  return (
    <main className="Challengstart">
      <h1 className="sr-only">Hobby Dobby</h1>
      <header></header>
      <ProgressBar value={30} max={100} />
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
