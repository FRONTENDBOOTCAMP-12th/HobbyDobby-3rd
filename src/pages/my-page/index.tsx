import './style.css';
import { useState } from 'react';
import StatCard from '@/components/MyPage/StatCard';
import ProfileHeader from '@/components/MyPage/ProfileHeader';
import AchievementCard from '@/components/MyPage/AchievementCard';
import ProfileInfo from '@/components/MyPage/ProfileInfo';
import Title from '@/layouts/title';

function MyPage() {
  const [isStatistics] = useState(true);
  const [isAchievements] = useState(true);

  return (
    <div className="my-page drag-prevent">
      <Title>마이페이지</Title>
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
          <article className="article-container">
            <h2>통계</h2>
            {isStatistics ? (
              <div className="stat-cards-list">
                <StatCard name="통계 제목" value={121554} />
              </div>
            ) : (
              <p>통계가 없습니다.</p>
            )}
          </article>
          <article className="article-container">
            <h2>업적</h2>
            {isAchievements ? (
              <AchievementCard
                level="1"
                name="7일 연속 출석"
                total={7}
                current={2}
                description="7일 연속으로 출석하면 업적이 달성됩니다."
              />
            ) : (
              <p>업적이 없습니다.</p>
            )}
          </article>
        </section>
      </main>
    </div>
  );
}

export default MyPage;
