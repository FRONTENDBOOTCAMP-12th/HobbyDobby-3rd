import { ButtonUIProps } from './button.type';
import './button-ui.css';

function SquareButton({
  type,
  content,
  bgColor = 'var(--primary-color)',
  color = 'var(--text-black)',
  className = '',
  onClick,
}: ButtonUIProps) {
  return (
    <button
      className={`button-ui square-button ${className}`}
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

export default SquareButton;
