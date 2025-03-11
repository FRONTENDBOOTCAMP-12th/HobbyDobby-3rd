import './IndexCard.css';
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
  totalUnits = 7,
  currentUnit = 1,
  unitTitle,
  handleClickClose,
}: IndexCardProps) {
  return (
    <div className="index-card">
      <CloseButton onClick={handleClickClose} className="close-btn" />
      <p>
        섹션 {section} <b>|</b> 유닛 {currentUnit}/{totalUnits}
      </p>
      <h2>{unitTitle}</h2>
    </div>
  );
}

export default IndexCard;
