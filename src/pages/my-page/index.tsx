import './style.css';
import { useState } from 'react';
import StatCard from '@/components/MyPage/StatCard';
import ProfileCard from '@/components/MyPage/ProfileCard';
import ProfileHeader from '@/components/MyPage/ProfileHeader';

function MyPage() {
  const [isStatistics] = useState(true);
  const [isAchievements] = useState(false);

  return (
    <div className="my-page drag-prevent">
      <header>상단바 공간</header>
      <main>
        <section className="profile-header">
          <ProfileHeader />
        </section>
        <section className="profile-body">
          <ProfileCard />
          <article className="board">
            <h2>통계</h2>
            {isStatistics ? (
              <div className="stat-cards-list">
                <StatCard />
                <StatCard />
                <StatCard />
              </div>
            ) : (
              <p>통계가 없습니다.</p>
            )}
          </article>
          <article className="board">
            <h2>업적</h2>
            {isAchievements ? <p>업적</p> : <p>업적이 없습니다.</p>}
          </article>
        </section>
      </main>
      <footer>하단바 공간</footer>
    </div>
  );
}

export default MyPage;
