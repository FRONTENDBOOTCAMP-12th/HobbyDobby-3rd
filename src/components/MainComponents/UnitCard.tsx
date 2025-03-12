import './unit-card.css';
import { useId } from 'react';
import { Link } from 'react-router';

type UnitCardProps = React.ComponentProps<'div'> & {
  title: string;
  level: number;
  max_level: number;
  cardState?: 'complete' | 'disabled' | 'now';
};

function UnitCard({
  title,
  level,
  max_level,
  cardState = 'disabled',
  ...restProps
}: UnitCardProps) {
  const unitCardId = useId();

  console.log(cardState);

  return (
    <div
      className="unit-card"
      aria-modal="true"
      aria-labelledby={unitCardId}
      {...restProps}
    >
      <div className="unit-card__text-wrapper">
        <h5 id={unitCardId}>{title}</h5>
        <p>
          유닛 진행도 {level}/{max_level}
        </p>
      </div>
      <Link className="unit-card__link-button" to={`/`}>
        시작
      </Link>
    </div>
  );
}

export default UnitCard;
