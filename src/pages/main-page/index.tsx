import './style.css';
import MainCard from '@/components/MainComponents/MainCard';
import UnitButton from '@/components/MainComponents/UnitButton';
import Title from '@/layouts/title';
import { useUserStore } from '@/stores/user';

function MainPage() {
  const nowChallenge = useUserStore((store) => store.now_challenge);
  const nowHobby = useUserStore((store) => store.now_hobby);

  return (
    <>
      <Title>메인 페이지</Title>
      <main className="main-page">
        <h2 className="sr-only">메인 페이지</h2>
        {nowChallenge ? (
          <>
            <MainCard
              challengeName={nowChallenge.name}
              section={nowChallenge.now_unit?.section ?? 1}
              hobby={nowHobby!.name}
            />
            <UnitButton unitTitle="유닛 1-1의 타이틀" buttonState="complete" />
            <UnitButton unitTitle="유닛 1-2의 타이틀" buttonState="now" />
            <UnitButton unitTitle="유닛 1-3의 타이틀" />
          </>
        ) : (
          <>
            <MainCard challengeName={nowChallenge} section={1} hobby="독서" />
            <UnitButton unitTitle="유닛 1-1의 타이틀" buttonState="complete" />
            <UnitButton unitTitle="유닛 1-2의 타이틀" buttonState="now" />
            <UnitButton unitTitle="유닛 1-3의 타이틀" />
          </>
        )}
      </main>
    </>
  );
}

export default MainPage;
