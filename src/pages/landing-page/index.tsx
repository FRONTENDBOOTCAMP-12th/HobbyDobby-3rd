import './style.css';

function LandingPage() {
  return (
    <main>
      <div>
        {/* 로고 */}
        <div>
          <img src="/assets/logo.svg" alt="Logo" className="logo" />
          {/* 로고 텍스트 이미지 */}
          <div className="logo-text">
            <img src="/assets/hobby.svg" alt="Hobby" className="hobby-image" />
            <img src="/assets/dobby.svg" alt="Dobby" className="dobby-image" />
          </div>
        </div>

        {/* 버튼 */}
        <div>
          <button type="button" className="start">
            시작하기
          </button>
        </div>
      </div>
    </main>
  );
}

export default LandingPage;
