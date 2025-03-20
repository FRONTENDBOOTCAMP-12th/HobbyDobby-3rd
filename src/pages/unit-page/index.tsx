import './style.css';
import Swal from 'sweetalert2';
import Title from '@/layouts/title';
import { useCallback, useState } from 'react';
import { getQuestionByUnit } from '@/lib/api';
import useFetchData from '@/hooks/useFetchData';
import ProgressBar from '@/components/ProgressBar';
import CustomButton from '@/components/CustomButton';
import IndexCard from '@/components/UnitPage/IndexCard';
import { useLocation, useNavigate } from 'react-router';
import UnitContent from '@/components/UnitPage/UnitContent';

interface LocationState {
  unitName: string;
  section: number;
  title: string;
  level: number;
  maxLevel: number;
  state: 'complete' | 'now';
}

// interface NowProgress {
//   type: string;
//   answer: string[];
//   question: string;
//   answer_values: string[];
//   question_number: number;
// }

function UnitPage() {
  // const [nowProgress, setNowProgress] = useState<NowProgress[]>([]);

  const location = useLocation();
  const { unitName, section, title, level, maxLevel } = {
    ...(location.state as LocationState),
  };

  const fetchingFunction = useCallback(
    () => getQuestionByUnit(unitName),
    [unitName]
  );
  const { data: questions } = useFetchData(fetchingFunction);
  const [nowQuestion, setNowQuestion] = useState<number>(0);

  let maxOrder = 0;
  let isLastQuestion = false;

  if (questions) {
    const questionsLength = questions.length;

    maxOrder = questions[questionsLength - 1].order;
    isLastQuestion = questionsLength - 1 === nowQuestion;
  }

  const navigate = useNavigate();
  const handleClickClose = () => {
    Swal.fire({
      title: '정말 나가시겠습니까?',
      text: '현재 유닛에 대한 진행 정보를 잃게 됩니다.',
      confirmButtonText: '나가기',
      confirmButtonColor: '#b60000',
      showCancelButton: true,
      cancelButtonText: '취소',
    })
      .then((result) => {
        if (result.isConfirmed) {
          void navigate('/home');
        }
      })
      .catch((error: Error) => {
        throw error;
      });
  };

  const handleUnitButtonClick = () => {
    if (isLastQuestion) {
      console.log('전체 제출 코드');
    } else {
      const nextQuestion = nowQuestion + 1;
      setNowQuestion(nextQuestion);
    }
  };

  return (
    <div className="unit-page">
      <Title>{unitName}</Title>
      <header className="unit-header">
        <IndexCard
          section={section}
          totalUnits={maxLevel}
          currentUnit={level}
          unitTitle={title}
          handleClickClose={handleClickClose}
        />
        <ProgressBar
          value={questions ? questions[nowQuestion].order : 0}
          max={maxOrder}
          height="0.8rem"
        />
      </header>

      <section className="unit-content">
        <UnitContent question={questions ? questions[nowQuestion] : null} />
      </section>

      <footer className="unit-footer">
        <CustomButton
          type="button"
          buttonText={isLastQuestion ? '제출' : '다음'}
          className="submit-btn"
          bgColor="var(--secondary-color)"
          onClick={handleUnitButtonClick}
        />
      </footer>
    </div>
  );
}

export default UnitPage;
