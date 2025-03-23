import { useEffect, useState } from 'react';
import { getUserAchievements, getUserCompletedChallenge } from '@/lib/api';
import { useUserStore } from '@/stores/user';
import { useUserAchievementStore } from '@/stores/user-achievement';
import { getDate } from '@/utils/getDate';
import { getHobbyIcon } from '@/utils/getHobbyIcon';
import Title from '@/layouts/title';
import ProfileHeader from '@/components/MyPage/ProfileHeader';
import ProfileInfo from '@/components/MyPage/ProfileInfo';
import StatCardList from '@/components/MyPage/StatCardList';
import AchievementCardList from '@/components/MyPage/AchievementCardList';
import MypageFooter from '@/components/MyPage/Footer';
import MyPageEditProfile from '../my-page-edit-profile';
import './style.css';

// 마이페이지 컴포넌트
function MyPage() {
  const {
    image: userPhoto,
    nickname: userNickname,
    title: userTitle,
    created_date: joinDate,
    main_hobby: userHobby,
    uid: userId,
    item: userProfileItem,
  } = useUserStore();

  const [isEditing, setIsEditing] = useState(false);
  const userHobbyIcon = getHobbyIcon(userHobby);

  // 가입일 기준으로 경과 일수 계산
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

  // 유저의 완료한 챌린지와 업적 정보 가져오기
  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      const { completedChallenges, completedAchievements } =
        useUserAchievementStore.getState();

      if (completedChallenges && completedAchievements) {
        setCompletedChallenges(completedChallenges);
        setCompletedAchievements(completedAchievements);
        return;
      }

      try {
        const [challenges, achievements] = await Promise.all([
          getUserCompletedChallenge(userId),
          getUserAchievements(userId),
        ]);

        useUserAchievementStore.setState({
          completedChallenges: challenges.length,
          completedAchievements: achievements.map((a) => a.achievement_id),
        });

        setCompletedChallenges(challenges.length);
        setCompletedAchievements(achievements.map((a) => a.achievement_id));
      } catch (error) {
        console.error('Error fetching completed challenges:', error);
      }
    };

    void fetchData();
  }, [userId]);

  return (
    <div className="my-page drag-prevent">
      <Title>마이페이지</Title>
      <main>
        {/* 프로필 헤더 */}
        <section className="profile-header">
          <ProfileHeader
            profileItem={userProfileItem}
            profileImage={userPhoto}
            setIsEditing={setIsEditing}
          />
        </section>

        {/* 프로필 정보 */}
        <section className="profile-body">
          <ProfileInfo
            nickName={userNickname}
            mainTitle={userTitle}
            mainHobby={userHobby}
            mainHobbyIcon={userHobbyIcon}
            joinDate={joinDate ? getDate(joinDate) : ''}
          />

          {/* 통계 */}
          <article className="article-container">
            <h2>통계</h2>
            <StatCardList
              daysSinceJoin={daysSinceJoin}
              completedChallenges={completedChallenges}
            />
          </article>

          {/* 업적 */}
          <article className="article-container">
            <h2>업적</h2>
            <AchievementCardList
              daysSinceJoin={daysSinceJoin}
              completedChallenges={completedChallenges}
              completedAchievements={completedAchievements}
            />
          </article>
        </section>

        {/* 프로필 푸터 (로그아웃/회원탈퇴) */}
        <section className="profile-footer">
          <MypageFooter />
        </section>
      </main>

      {/* 프로필 수정 */}
      {isEditing && (
        <MyPageEditProfile
          userId={userId}
          userProfileImg={userPhoto}
          userNickname={userNickname}
          userTitle={userTitle}
          userMainHobby={userHobby}
          userProfileItem={userProfileItem}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
}

export default MyPage;
