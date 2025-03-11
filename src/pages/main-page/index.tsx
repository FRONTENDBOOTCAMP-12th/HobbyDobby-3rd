import './style.css';
import MainCard from '@/components/MainComponents/MainCard';

function MainPage() {
  return (
    <main className="main-page">
      <h2 className="sr-only">챌린지 메인 페이지</h2>
      <MainCard challengeName={null} section={1} hobby="독서" />
    </main>
  );
}

export default MainPage;
