import './style.css';
import ProfileHeader from '@/components/MyPage/ProfileHeader';
import ProfileInfo from '@/components/MyPage/ProfileInfo';
import Title from '@/layouts/title';
import { useUserStore } from '@/stores/user';
import { getDate } from '@/utils/getDate';
import StatCardList from '@/components/MyPage/StatCardList';
import AchievementCardList from '@/components/MyPage/AchievementCardList';
import { getHobbyIcon } from '@/utils/getHobbyIcon';

function MyPage() {
  const userPhoto = useUserStore((state) => state.image);
  const userNickname = useUserStore((state) => state.nickname);
  const userTitle = useUserStore((state) => state.title);
  const joinDate = useUserStore((state) => state.created_date);
  const userHobby = useUserStore((state) => state.main_hobby);
  const userHobbyIcon = getHobbyIcon(userHobby);

  const daysSinceJoin = joinDate
    ? Math.floor(
        (new Date().getTime() - new Date(joinDate).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;

  return (
    <div className="my-page drag-prevent">
      <Title>마이페이지</Title>
      <main>
        <section className="profile-header">
          <ProfileHeader profileImage={userPhoto ? userPhoto : null} />
        </section>
        <section className="profile-body">
          <ProfileInfo
            nickName={userNickname}
            mainTitle={userTitle}
            mainHobby={userHobby}
            mainHobbyIcon={userHobbyIcon}
            joinDate={joinDate ? getDate(joinDate) : ''}
          />
          <article className="article-container">
            <h2>통계</h2>
            <div className="stat-cards-list">
              <StatCardList daysSinceJoin={daysSinceJoin} />
            </div>
          </article>
          <article className="article-container">
            <h2>업적</h2>
            <AchievementCardList daysSinceJoin={daysSinceJoin} />
          </article>
        </section>
      </main>
    </div>
  );
}

export default MyPage;
