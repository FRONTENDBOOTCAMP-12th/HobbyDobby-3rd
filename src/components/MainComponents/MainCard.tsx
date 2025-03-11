import './main-card.css';

interface MainCardProps {
  challengeName: string;
  section: number;
}

function MainCard({ challengeName, section }: MainCardProps) {
  return (
    <section className="main-card">
      <h3>{challengeName}</h3>
      <h4>섹션 {section}</h4>
    </section>
  );
}

export default MainCard;
