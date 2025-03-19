import { getSubHobbyIcon } from '@/utils/getSubHobbyIcon';
import './text-left.css';

interface LeaderBoardTextLeftProps {
  subHobby: string | undefined;
  text: string;
  year?: string | number | null;
  month?: string | number | null;
  day?: string | number | null;
}

function LeaderBoardTextLeft({
  subHobby,
  text,
  year = null,
  month = null,
  day = null,
}: LeaderBoardTextLeftProps) {
  return (
    <div className="leader-board-detail__content--left">
      <img
        src={getSubHobbyIcon(subHobby)}
        alt={subHobby}
        className="leader-board-detail__img"
      />
      <div className="leader-board-detail__textbox--left">
        <p>{text}</p>
      </div>
      {year && month && day && (
        <time
          dateTime={`${year}-${month}-${day}`}
          className="leader-board-detail__date"
        >
          {year}년 {month}월 {day}일
        </time>
      )}
    </div>
  );
}

export default LeaderBoardTextLeft;
