import clsx from 'clsx';
import './style.css';
import { useFilteredClassName } from '@/hooks/useFilteredClassName';

interface CloseButtonProps {
  size?: number;
  position?: string;
  strokeWidth?: number;
  fill?: string;
  className?: string;
  onClick: () => void;
}

function CloseButton({
  size = 18,
  fill = 'var(--quatenary-color)',
  className = '',
  strokeWidth = 2,
  onClick,
}: CloseButtonProps) {
  const filteredClassName = useFilteredClassName(clsx('close-btn', className));

  return (
    <button type="button" className={filteredClassName} onClick={onClick}>
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
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default CloseButton;
