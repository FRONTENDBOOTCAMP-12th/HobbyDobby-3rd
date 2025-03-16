import './style.css';
import ChallengeFinsh from '@/components/MainpageEnd/ChallengeFinish';

function MainPageEnd() {
  return (
    <main className="main-page-end">
      <h1 className="sr-only">Hobby Dobby</h1>
      <ChallengeFinsh />
      {/* 컴포넌트의 순서는 finish -> review -> save -> exit 의 순서로 진행*/}
      {/* review 컴포넌트에서 하단에 저장하기 버튼을 누르면 save 컴포넌트로 이동 */}
      {/* save 컴포넌트에서 review 페이지창에서 입력한 내용이 db에 업로드가 완료되면 exit 컴포넌트로 이동 */}
    </main>
  );
}

export default MainPageEnd;
