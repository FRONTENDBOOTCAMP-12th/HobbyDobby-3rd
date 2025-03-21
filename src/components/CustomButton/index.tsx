import './style.css';
import clsx from 'clsx';
import { ButtonUIProps } from './button.type';

function CustomButton({
  type,
  buttonText,
  bgColor = 'var(--primary-color)',
  color = 'var(--text-black)',
  className = '',
  disabled = false,
  onClick,
}: ButtonUIProps) {
  const filteredClassName = clsx('button-ui', 'square-button', className);

  return (
    <button
      className={filteredClassName}
      type={type}
      style={{
        backgroundColor: bgColor,
        color: color,
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {buttonText}
    </button>
  );
}

export default CustomButton;
