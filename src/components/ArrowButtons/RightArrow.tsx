import clsx from 'clsx';
import './arrow.css';
import { useFilteredClassName } from '@/hooks/useFilteredClassName';

interface RightArrowProps {
  width?: number;
  position?: string;
  fill?: string;
  className?: string;
  onClick: () => void;
}

function CloseButton({
  width = 11,
  fill = 'black',
  className = '',
  onClick,
}: RightArrowProps) {
  const filteredClassName = useFilteredClassName(clsx('arrow__btn', className));

  return (
    <button type="button" className={filteredClassName} onClick={onClick}>
      <svg
        width={width}
        height="16"
        viewBox="0 0 11 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 15L10 8L1 1"
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default CloseButton;
