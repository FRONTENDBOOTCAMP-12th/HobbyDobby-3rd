import { Link } from 'react-router';
import './style.css';

function LandingPage() {
  return (
    <main className="landing">
      <header>
        <h1 className="sr-only">Hobby Dobby</h1>
        <figure>
          <img
            src={`${import.meta.env.BASE_URL}assets/logo.svg`}
            alt=""
            className="landing__logo"
          />
          <div className="landing__logo-text">
            <img
              src={`${import.meta.env.BASE_URL}assets/hobby.svg`}
              alt=""
              className="hobby-image"
            />
            <img
              src={`${import.meta.env.BASE_URL}assets/dobby.svg`}
              alt=""
              className="dobby-image"
            />
          </div>
        </figure>
      </header>

      <div>
        <Link to="/login" className="landing__start">
          시작하기
        </Link>
      </div>
    </main>
  );
}

export default LandingPage;
