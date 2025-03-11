import { ButtonUIProps } from './button.type';
import './button-ui.css';

function RoundButton({
  type,
  content,
  bgColor = 'var(--primary-color)',
  color = 'var(--text-black)',
  className = '',
  onClick,
}: ButtonUIProps) {
  return (
    <button
      className={`button-ui round-button ${className}`}
      type={type}
      style={{
        backgroundColor: bgColor,
        color: color,
      }}
      onClick={onClick}
    >
      {content}
    </button>
  );
}

export default RoundButton;
