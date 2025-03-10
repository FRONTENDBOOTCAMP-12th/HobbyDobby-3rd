import { Link } from 'react-router';
import './style.css';

function LandingPage() {
  return (
    <main className="landing">
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
        <Link to="/login" className="start">
          시작하기
        </Link>
      </div>
    </main>
  );
}

export default LandingPage;
