import './style.css';
import BurnIcon from '/assets/burning.svg';
import CheckIcon from '/assets/check.svg';
import MainCard from '@/components/MainComponents/MainCard';
import UnitButton from '@/components/MainComponents/UnitButton';

function MainPage() {
  return (
    <main className="main-page">
      <h2 className="sr-only">챌린지 메인 페이지</h2>
      <MainCard challengeName={null} section={1} hobby="독서" />
      <UnitButton unitTitle="유닛 1-1의 타이틀" buttonIcon={CheckIcon} />
      <UnitButton unitTitle="유닛 1-2의 타이틀" buttonIcon={BurnIcon} />
    </main>
  );
}

export default MainPage;
