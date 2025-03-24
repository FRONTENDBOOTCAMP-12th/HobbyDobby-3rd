import './styles/my-page-card.css';
import { getPublicImage } from '@/utils/getPublic';
import { StatCardProps } from '@/types/my-page/stat';

// 통계 카드 컴포넌트
function StatCard({ name, value }: StatCardProps) {
  const formattedValue = value.toLocaleString();

  return (
    <div className="card stat-card">
      {/* 아이콘 - 좌측 */}
      <span>
        <img src={getPublicImage('burning.svg')} alt="불꽃 아이콘" />
      </span>

      {/* 통계 내용 */}
      <div className="stats">
        <p>
          <strong>{formattedValue}</strong>
        </p>
        <h3>{name}</h3>
      </div>
    </div>
  );
}

export default StatCard;
