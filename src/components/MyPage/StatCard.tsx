import { getPublicImage } from '@/utils/getPublic';
import './my-page-card.css';

interface StatCardProps {
  id?: string;
  value?: number;
  name?: string;
}

function StatCard({ value = 121554, name = '통계 제목' }: StatCardProps) {
  const formattedValue = value.toLocaleString();

  return (
    <div className="card">
      <span>
        <img src={getPublicImage('burning.svg')} alt="불꽃 아이콘" />
      </span>
      <div className="stats">
        <p>
          <strong>{formattedValue}</strong>
        </p>
        <h2>{name}</h2>
      </div>
    </div>
  );
}

export default StatCard;
