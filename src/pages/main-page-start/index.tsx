import './style.css';
import ProgressBar from '@/components/ProgressBar';
import Title from '@/layouts/title';
import { insertChallenge, updateUserNowChallenge } from '@/lib/api';
import { useUserStore } from '@/stores/user';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

interface locationState {
  subhobby: string;
}

function MainPageStart() {
  const navigate = useNavigate();
  const userUid = useUserStore((state) => state.uid);

  // 상세 취미
  const location = useLocation();
  const locationState = { ...(location.state as locationState) };
  const subhobby = locationState.subhobby;

  // 챌린지명
  const [challengeName, setChallengeName] = useState<string>('');

  // 생성 날짜
  const createdDate = new Date().toISOString();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data: insertData, error: insertError } = await insertChallenge(
        challengeName,
        createdDate,
        subhobby
      );

      if (insertError) throw insertError;

      const { error: updateError } = await updateUserNowChallenge(
        insertData,
        userUid
      );

      if (updateError) throw updateError;

      // 성공 알림
      await Swal.fire({
        icon: 'success',
        title: '저장 완료!',
        confirmButtonColor: `var(--primary-color)`,
        text: '메인페이지로 이동합니다.',
        heightAuto: false,
      });

      void navigate('/home');
    } catch (error) {
      console.error('Error saving challenge:', error);

      // 실패 알림
      await Swal.fire({
        icon: 'error',
        title: '저장 실패!',
        confirmButtonColor: `var(--primary-color)`,
        text: '챌린지를 저장하는 도중 문제가 발생했습니다.',
        heightAuto: false,
      });
    }
  };

  return (
    <main className="Challengstart">
      <Title>챌린지 시작</Title>
      <h1 className="sr-only">Hobby Dobby</h1>
      <ProgressBar value={30} max={100} />
      <p className="ChallengeName">챌린지의 이름을 정해주세요.</p>
      <form className="startform" onSubmit={(e) => void handleSubmit(e)}>
        <p className="tip">Tip. 나중에 변경할 수 있어요.</p>
        <textarea
          placeholder="25년 첫 독서 챌린지_"
          value={challengeName}
          onChange={(e) => setChallengeName(e.target.value)}
        />
        <button type="submit" className="decide">
          정했어요
        </button>
      </form>
    </main>
  );
}

export default MainPageStart;
