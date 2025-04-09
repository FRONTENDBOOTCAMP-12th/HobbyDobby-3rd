import './spinner.css';

function Spinner() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="로딩 중..."
      className="spinner__container"
    >
      <div className="spinner__activist"></div>
    </div>
  );
}

export default Spinner;
