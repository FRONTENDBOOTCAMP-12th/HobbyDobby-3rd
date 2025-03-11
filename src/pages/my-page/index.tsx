import './style.css';
import { useState } from 'react';
import StatCard from '@/components/MyPage/StatCard';
import ProfileCard from '@/components/MyPage/ProfileCard';
import ProfileHeader from '@/components/MyPage/ProfileHeader';
import Title from '@/layouts/title';

function MyPage() {
  const [isStatistics] = useState(true);
  const [isAchievements] = useState(false);

  return (
    <div className="my-page drag-prevent">
      <Title>마이페이지</Title>
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
    </div>
  );
}

export default MyPage;
