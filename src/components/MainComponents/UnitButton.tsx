import './unit-button.css';
import ProgressBar from '@/components/ProgressBar';

interface UnitButtonProps {
  buttonIcon: string;
  unit: string;
}

function UnitButton({ buttonIcon, unit }: UnitButtonProps) {
  return (
    <div className="unit-button-wrapper">
      <button className="unit-button" type="button">
        <img src={buttonIcon} alt={unit} />
      </button>
      <ProgressBar width="70px" value={0} max={5} />
    </div>
  );
}

export default UnitButton;
