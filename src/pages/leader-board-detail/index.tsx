import DetailCard from '@/components/LeaderBoard/DetailCard';
import Title from '@/layouts/title';
import './style.css';

function LeaderBoardDetailPage() {
  return (
    <div className="leader-board-detail">
      <Title>리더보드 상세정보</Title>
      <DetailCard />
      <div className="leader-board-detail__conversation">
        <div className="leader-board-detail__content--left">
          <img src="/assets/book.svg" alt="챌린지 취미" />
          <div className="leader-board-detail__textbox--left">
            <p>챌린지명 을 시작했어요.</p>
          </div>
          <p className="leader-board-detail__date">0000년 0월 0일</p>
        </div>
        <div className="leader-board-detail__content--right">
          <div className="leader-board-detail__textbox--right">
            <p>챌린지명 을 시작했어요.</p>
            <p>0000년 0월 0일</p>
          </div>
          <div className="profileImgAlt"></div>
        </div>
      </div>
    </div>
  );
}

export default LeaderBoardDetailPage;
