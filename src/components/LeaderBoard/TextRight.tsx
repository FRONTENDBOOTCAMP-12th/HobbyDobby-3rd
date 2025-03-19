import './text-right.css';

interface LeaderBoardTextRightProps {
  text: string;
  userImage: string | null;
}

function LeaderBoardTextRight({
  text,
  userImage = null,
}: LeaderBoardTextRightProps) {
  return (
    <div className="leader-board-detail__content--right">
      <div className="leader-board-detail__textbox--right">
        {text.length > 1 ? (
          // text.length를 길이로 하는 배열로 변환 후 text를 인덱스로 접근
          Array.from({ length: text.length }).map((_, index) => (
            <p key={index} className="leader-board-detail__text">
              {text[index]}
            </p>
          ))
        ) : (
          <p className="leader-board-detail__text">{text}</p>
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
