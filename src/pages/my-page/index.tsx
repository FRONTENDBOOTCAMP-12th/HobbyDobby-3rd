import { useUserStore } from '@/stores/user';
import { getDate } from '@/utils/getDate';
import { getHobbyIcon } from '@/utils/getHobbyIcon';
import AchievementCardList from '@/components/MyPage/AchievementCardList';
import ProfileHeader from '@/components/MyPage/ProfileHeader';
import ProfileInfo from '@/components/MyPage/ProfileInfo';
import StatCardList from '@/components/MyPage/StatCardList';
import Title from '@/layouts/title';
import './style.css';
import { getUserCompletedChallenge } from '@/lib/api';
import { useEffect } from 'react';
import { useState } from 'react';

function MyPage() {
  // 사용자 정보 가져오기
  const {
    image: userPhoto,
    nickname: userNickname,
    title: userTitle,
    created_date: joinDate,
    main_hobby: userHobby,
    uid: userId,
  } = useUserStore((state) => state);

  // 취미 아이콘 가져오기
  const userHobbyIcon = getHobbyIcon(userHobby);

  // 가입 일자로부터 경과한 일수 계산
  const daysSinceJoin = joinDate
    ? Math.floor(
        (new Date().getTime() - new Date(joinDate).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;

  const [completedChallenges, setCompletedChallenges] = useState<number>(0);

  useEffect(() => {
    const fetchCompletedChallenges = async () => {
      try {
        const challenges = await getUserCompletedChallenge(userId);
        setCompletedChallenges(challenges?.length ?? 0);
      } catch (error) {
        console.error('Error fetching completed challenges:', error);
      }
    };

    if (userId) {
      void fetchCompletedChallenges();
    }
  }, [userId]);

  return (
    <div className="my-page drag-prevent">
      <Title>마이페이지</Title>

      <main>
        <section className="profile-header">
          <ProfileHeader profileImage={userPhoto ?? null} />
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
            <StatCardList
              daysSinceJoin={daysSinceJoin}
              completedChallenges={completedChallenges}
            />
          </article>

          <article className="article-container">
            <h2>업적</h2>
            <AchievementCardList
              daysSinceJoin={daysSinceJoin}
              completedChallenges={completedChallenges}
            />
          </article>
        </section>
      </main>
    </div>
  );
}

export default MyPage;
