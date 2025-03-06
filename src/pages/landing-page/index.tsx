import './style.css';

function LandingPage() {
  return (
    <main>
      <h1 className="sr-only">Hobby Dobby</h1>
      <header>
        <div>
          {/* 로고 */}
          <div>
            <img
              src="/assets/logo.svg"
              alt="Hobby Dobby 로고"
              className="logo"
            />
            {/* 로고 텍스트 이미지 */}
            <div className="logo-text">
              <img src="/assets/hobby.svg" alt="" className="hobby-image" />
              <img src="/assets/dobby.svg" alt="" className="dobby-image" />
            </div>
          </div>
        </div>
      </header>

      {/* 버튼 */}
      <div>
        <button type="button" className="start">
          시작하기
        </button>
      </div>
    </main>
  );
}

export default LandingPage;
