import './unit-card.css';
import { useId } from 'react';
import { useNavigate } from 'react-router';

type UnitCardProps = React.ComponentProps<'div'> & {
  title: string;
  name?: string;
  section?: number;
  level?: number;
  maxLevel?: number;
  cardState?: 'complete' | 'disabled' | 'now';
};

function UnitCard({
  name,
  level,
  section,
  title,
  maxLevel,
  cardState = 'disabled',
  ...restProps
}: UnitCardProps) {
  const unitCardId = useId();
  const navigate = useNavigate();

  const handleClick = () => {
    void navigate(`/unit/${name}`, {
      state: {
        unitName: name,
        section,
        title,
        level,
        maxLevel,
        state: cardState,
      },
    });
  };

  return (
    <div
      className="unit-card"
      role="group"
      aria-labelledby={unitCardId}
      {...restProps}
    >
      <div className="unit-card__text-wrapper">
        <h5 id={unitCardId}>{title}</h5>
        <p>
          {cardState === 'disabled'
            ? '해당 유닛은 잠겨있습니다.'
            : cardState === 'complete'
              ? `유닛 내용 수정하기`
              : `유닛 진행도 ${level}/${maxLevel}`}
        </p>
      </div>
      <button
        type="button"
        className="unit-card__link-button"
        disabled={cardState === 'disabled' ? true : false}
        onClick={handleClick}
      >
        {cardState === 'disabled'
          ? '잠김'
          : cardState === 'complete'
            ? `수정`
            : `시작`}
      </button>
    </div>
  );
}

export default UnitCard;
