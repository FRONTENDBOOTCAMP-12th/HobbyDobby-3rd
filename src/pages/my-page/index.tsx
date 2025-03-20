import AchievementCardList from '@/components/MyPage/AchievementCardList';
import ProfileHeader from '@/components/MyPage/ProfileHeader';
import ProfileInfo from '@/components/MyPage/ProfileInfo';
import StatCardList from '@/components/MyPage/StatCardList';
import Title from '@/layouts/title';
import { getUserAchievements, getUserCompletedChallenge } from '@/lib/api';
import { useUserStore } from '@/stores/user';
import { getDate } from '@/utils/getDate';
import { getHobbyIcon } from '@/utils/getHobbyIcon';
import { useEffect, useState } from 'react';
import MyPageEditProfile from '../my-page-edit-profile';
import './style.css';
import { useUserAchievementStore } from '@/stores/user-achievement';

function MyPage() {
  const {
    image: userPhoto,
    nickname: userNickname,
    title: userTitle,
    created_date: joinDate,
    main_hobby: userHobby,
    uid: userId,
  } = useUserStore((state) => state);

  const [isEditing, setIsEditing] = useState(false);

  const userHobbyIcon = getHobbyIcon(userHobby);

  const daysSinceJoin = joinDate
    ? Math.floor(
        (new Date().getTime() - new Date(joinDate).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;

  const [completedChallenges, setCompletedChallenges] = useState<number>(0);
  const [completedAchievements, setCompletedAchievements] = useState<string[]>(
    []
  );

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!userId) return;

      // 이미 Zustand에 데이터가 저장되어 있다면 다시 호출하지 않음
      const storedChallenges =
        useUserAchievementStore.getState().completedChallenges;
      const storedAchievements =
        useUserAchievementStore.getState().completedAchievements;

      if (storedChallenges && storedAchievements) {
        setCompletedChallenges(storedChallenges);
        setCompletedAchievements(storedAchievements.map((a) => a));
        return;
      }

      try {
        const [challenges, achievements] = await Promise.all([
          getUserCompletedChallenge(userId),
          getUserAchievements(userId),
        ]);

        if (isMounted) {
          // Zustand에 상태 저장 (전역 상태로 캐싱)
          useUserAchievementStore.setState({
            completedChallenges: challenges.length ?? 0,
            completedAchievements: achievements.map(
              (achievement) => achievement.achievement_id
            ),
          });

          setCompletedChallenges(challenges?.length ?? 0);
          setCompletedAchievements(
            achievements.map((achievement) => achievement.achievement_id)
          );
        }
      } catch (error) {
        console.error('Error fetching completed challenges:', error);
      }
    };

    if (userId) void fetchData();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  return (
    <div className="my-page drag-prevent">
      <Title>마이페이지</Title>
      <main>
        <section className="profile-header">
          <ProfileHeader
            profileImage={userPhoto ?? null}
            setIsEditing={setIsEditing}
          />
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
              completedAchievements={completedAchievements}
            />
          </article>
        </section>
      </main>
      {isEditing && (
        <MyPageEditProfile isEditing={isEditing} setIsEditing={setIsEditing} />
      )}
    </div>
  );
}

export default MyPage;
