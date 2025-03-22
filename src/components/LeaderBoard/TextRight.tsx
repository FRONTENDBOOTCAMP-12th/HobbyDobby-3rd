import { Json } from '@/lib/schema';
import './text-right.css';

interface LeaderBoardTextRightProps {
  text: Json | undefined;
  userImage: string | null;
}

function LeaderBoardTextRight({
  text,
  userImage = null,
}: LeaderBoardTextRightProps) {
  return (
    <div className="leader-board-detail__content--right">
      <div className="leader-board-detail__textbox--right">
        {Array.isArray(text) &&
          text.map((item, index) =>
            typeof item === 'string' && item.includes('https') ? (
              <img
                key={index}
                src={item}
                alt=""
                className="leader-board-detail__text-img"
              />
            ) : (
              <p key={index} className="leader-board-detail__text">
                {typeof item === 'string' ? item : JSON.stringify(item)}
              </p>
            )
          )}
      </div>
      {userImage ? (
        <img
          src={userImage}
          alt="사용자 프로필"
          className="leader-board-detail__user-profile"
        />
      ) : (
        <div className="leader-board-detail__user-profile--alt"></div>
      )}
    </div>
  );
}

export default LeaderBoardTextRight;
