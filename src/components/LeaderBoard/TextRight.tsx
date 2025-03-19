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
        {Array.isArray(text) ? (
          // 답변 배열의 각 요소를 순회하여 출력
          text.map((item, index) => (
            <p key={index} className="leader-board-detail__text">
              {typeof item === 'string' ? item : JSON.stringify(item)}
            </p>
          ))
        ) : (
          <p className="leader-board-detail__text">
            {typeof text === 'string' ? text : JSON.stringify(text)}
          </p>
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
