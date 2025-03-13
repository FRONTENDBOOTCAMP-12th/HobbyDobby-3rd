import './style.css';
import MainCard from '@/components/MainComponents/MainCard';
import UnitButton from '@/components/MainComponents/UnitButton';
import Title from '@/layouts/title';

function MainPage() {
  return (
    <>
      <Title>메인 페이지</Title>
      <main className="main-page">
        <h2 className="sr-only">메인 페이지</h2>
        <MainCard challengeName={null} section={1} hobby="독서" />
        <UnitButton unitTitle="유닛 1-1의 타이틀" buttonState="complete" />
        <UnitButton unitTitle="유닛 1-2의 타이틀" buttonState="now" />
        <UnitButton unitTitle="유닛 1-3의 타이틀" />
      </main>
    </>
  );
}

export default MainPage;
