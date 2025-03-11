import './style.css';

interface CloseButtonProps {
  size?: number;
  position?: string;
  fill?: string;
  className?: string;
  onClick: () => void;
}

function CloseButton({
  size = 18,
  fill = 'var(--quatenary-color)',
  className = '',
  onClick,
}: CloseButtonProps) {
  return (
    <button
      type="button"
      className={
        className.includes('close-btn') ? className : `close-btn ${className}`
      }
      onClick={onClick}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17 1L1 17M1 1L17 17"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default CloseButton;
