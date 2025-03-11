import MainCard from '@/components/MainComponents/MainCard';

function MainPage() {
  return (
    <div>
      <h2 className="sr-only">챌린지 메인 페이지</h2>
      <MainCard challengeName="챌린지명" section={1} />
    </div>
  );
}

export default MainPage;
