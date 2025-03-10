import './style.css';
import { useState } from 'react';
import StatCard from '@/components/MyPage/StatCard';
import ProfileHeader from '@/components/MyPage/ProfileHeader';
import AchievementCard from '@/components/MyPage/AchievementCard';
import ProfileInfo from '@/components/MyPage/ProfileInfo';

function MyPage() {
  const [isStatistics] = useState(true);
  const [isAchievements] = useState(true);

  return (
    <div className="my-page drag-prevent">
      <header>상단바 공간</header>
      <main>
        <section className="profile-header">
          <ProfileHeader />
        </section>
        <section className="profile-body">
          <ProfileInfo
            nickName="리쉐린쓰리스타"
            mainTitle="취미 입문자"
            mainHobby="독서"
            mainHobbyIcon=""
            joinDate="2025년 3월"
          />
          <article className="board">
            <h2>통계</h2>
            {isStatistics ? (
              <div className="stat-cards-list">
                <StatCard name="통계 제목" value={121554} />
              </div>
            ) : (
              <p>통계가 없습니다.</p>
            )}
          </article>
          <article className="board">
            <h2>업적</h2>
            {isAchievements ? (
              <AchievementCard
                level="1"
                name="7일 연속 출석"
                total={7}
                current={2}
                description="업적에 대한 내용"
              />
            ) : (
              <p>업적이 없습니다.</p>
            )}
          </article>
        </section>
      </main>
      <footer>하단바 공간</footer>
    </div>
  );
}

export default MyPage;
