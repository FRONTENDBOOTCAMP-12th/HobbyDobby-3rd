import './style.css';

interface ProgressBarProps {
  width?: number | string;
  height?: number | string;
  containerColor?: string;
  varColor?: string;
  value: number;
  max: number;
}

function ProgressBar({
  value = 1,
  max = 10,
  width = '100%',
  height = '0.5rem',
  containerColor = 'white',
  varColor = 'var(--primary-color)',
}: ProgressBarProps) {
  const percentage = (value / max) * 100;

  return (
    <div
      className="progress-bar"
      style={{ width: width, height: height, backgroundColor: containerColor }}
    >
      <div
        className="progress-bar-value"
        style={{ width: `${percentage}%`, backgroundColor: varColor }}
      />
    </div>
  );
}

export default ProgressBar;
