import DetailCard from '@/components/LeaderBoard/DetailCard';
import Title from '@/layouts/title';
import './style.css';
import { useUserStore } from '@/stores/user';
import { useParams, useSearchParams } from 'react-router';
import LeaderBoardTextLeft from '@/components/LeaderBoard/TextLeft';
import LeaderBoardTextRight from '@/components/LeaderBoard/TextRight';
import useFetchData from '@/hooks/useFetchData';
import { getChallengeDetail } from '@/lib/api';
import { useCallback } from 'react';

function LeaderBoardDetailPage() {
  const userImage = useUserStore((state) => state.image);

  // location을 통해 챌린지 정보 가져오기
  const [searchParams] = useSearchParams();
  const params = useParams();
  const challengeName = params.challenge_name;
  const date = searchParams.get('date');
  const dateArr = date?.split('-');
  const period = searchParams.get('period');

  const fetchChallengeDetail = useCallback(
    () => getChallengeDetail(challengeName),
    [challengeName]
  );
  const { data: challengeDetail } = useFetchData(
    fetchChallengeDetail,
    challengeName
  );

  // 챌린지 시작 날짜 구하기
  const dateData = challengeDetail?.[0]?.created_date;
  const createdDate = dateData ? new Date(dateData) : null;
  const createdYear = createdDate?.getFullYear();
  const createdMonth = createdDate ? createdDate.getMonth() + 1 : null;
  const createdDay = createdDate?.getDate();

  // 세부 취미
  const subHobby = challengeDetail?.[0]?.sub_hobby_name;

  // 챌린지 세부 정보(답변&질문)
  const progress = challengeDetail?.[0]?.progress;

  return (
    <div className="leader-board-detail">
      <Title>리더보드 상세정보</Title>
      <DetailCard
        challengeName={challengeName}
        dateArr={dateArr}
        period={period}
      />
      <section className="leader-board-detail__conversation">
        {/* 챌린지 시작 */}
        <LeaderBoardTextLeft
          subHobby={subHobby}
          text="챌린지를 시작했어요."
          year={createdYear}
          month={createdMonth}
          day={createdDay}
        />

        {/* 챌린지 상세 답변 */}
        {Array.isArray(progress) &&
          progress?.map((data, index) =>
            typeof data === 'object' &&
            data !== null &&
            'question' in data &&
            'answer' in data ? (
              <div key={index}>
                <LeaderBoardTextLeft subHobby={subHobby} text={data.question} />
                <LeaderBoardTextRight
                  text={data.answer as string[]}
                  userImage={userImage}
                />
              </div>
            ) : null
          )}

        {/* 챌린지 완료 */}
        <LeaderBoardTextLeft
          subHobby={subHobby}
          text="챌린지를 완료했어요."
          year={dateArr?.[0]}
          month={dateArr?.[1]}
          day={dateArr?.[2]}
        />
      </section>
    </div>
  );
}

export default LeaderBoardDetailPage;
