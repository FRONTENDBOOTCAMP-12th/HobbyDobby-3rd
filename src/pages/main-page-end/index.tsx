import ChallengeExit from '@/components/MainpageEnd/ChallengeExit';
import './style.css';
import ChallengeFinish from '@/components/MainpageEnd/ChallengeFinish';
import ChallengeReview from '@/components/MainpageEnd/ChallengeReview';
import ChallengeSave from '@/components/MainpageEnd/ChallengeSave';
import { useState } from 'react';
import { useUserStore } from '@/stores/user';
import { endChallenge } from '@/lib/api';
import { useUnitsStore } from '@/stores/units';

function MainPageEnd() {
  const [sequence, setSequence] = useState(0);
  const uid = useUserStore((user) => user.uid);
  const challenge = useUserStore((user) => user.now_challenge);
  const setUserStoreNowChallengeNull = useUserStore(
    (user) => user.endNowChallenge
  );
  const setUnitsEmpty = useUnitsStore((unit) => unit.endChallenge);

  const saveChallenge = async () => {
    if (challenge) {
      await endChallenge(challenge?.id, uid);
      setUserStoreNowChallengeNull();
      setUnitsEmpty();
      setSequence(3);
    }
  };

  // 0, 1, 2, 3의 단계로 진행(finish -> review -> save -> exit)
  const nowContent = () => {
    switch (sequence) {
      case 0:
        return <ChallengeFinish onClick={() => setSequence(1)} />;
      case 1:
        return <ChallengeReview onClick={() => setSequence(2)} />;
      case 2:
        return <ChallengeSave onClick={saveChallenge} />;
      case 3:
        return <ChallengeExit />;
    }
  };

  return (
    <main className="main-page-end">
      <h1 className="sr-only">Hobby Dobby</h1>
      {nowContent()}
    </main>
  );
}

export default MainPageEnd;
