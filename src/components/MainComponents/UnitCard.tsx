import './unit-card.css';
import { useId } from 'react';

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

  const handleClick = () => {
    console.log(
      '클릭 시 해당 유닛 페이지로 이동.(상세 페이지 개발과 함께 진행 예정)'
    );
  };

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
          {cardState === 'disabled'
            ? '해당 유닛은 잠겨있습니다.'
            : cardState === 'complete'
              ? `유닛 내용 수정하기`
              : `유닛 진행도 ${level}/${max_level}`}
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
