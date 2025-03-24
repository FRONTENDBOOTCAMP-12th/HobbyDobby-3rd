import './index-card.css';
import CloseButton from '@/components/CloseButton';

interface IndexCardProps {
  section: number;
  totalUnits: number;
  currentUnit: number;
  unitTitle: string;
  handleClickClose: () => void;
}

function IndexCard({
  section,
  totalUnits,
  currentUnit,
  unitTitle,
  handleClickClose,
}: IndexCardProps) {
  return (
    <div className="index-card">
      <CloseButton
        onClick={handleClickClose}
        className="index-card__close-btn btn"
      />
      <p>
        섹션 {section} <b>|</b> 유닛 {currentUnit}/{totalUnits}
      </p>
      <h1>{unitTitle}</h1>
    </div>
  );
}

export default IndexCard;
