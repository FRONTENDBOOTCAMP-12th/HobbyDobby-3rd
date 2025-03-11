import './style.css';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import ProgressBar from '@/components/ProgressBar';
import IndexCard from '@/components/UnitPage/IndexCard';
import SquareButton from '@/components/ButtonUI/SquareButton';
import DescriptiveType from '@/components/UnitPage/QuestionTypes/DescriptiveType';

interface UnitPageProps {
  currentStep: number;
  totalSteps: number;
}

function UnitPage({ currentStep = 2, totalSteps = 7 }: UnitPageProps) {
  const [isQuestion] = useState(true);

  /* 임시로 만든 닫기 버튼 이벤트 핸들러 */
  const navigate = useNavigate();
  const handleClickClose = () => {
    void navigate('/mainpage'); // /mainpage로 이동
  };

  return (
    <div className="unit-page">
      <header className="unit-header">
        <IndexCard
          section={2}
          totalUnits={7}
          currentUnit={2}
          unitTitle="책의 중반부"
          handleClickClose={handleClickClose}
        />
        <ProgressBar value={currentStep} max={totalSteps} height="0.8rem" />
      </header>
      <section className="unit-content">
        {isQuestion ? (
          <form action="post">
            <DescriptiveType />
          </form>
        ) : (
          <div>
            <p>이 문항은 응답을 요구하는 질문이 아닙니다.</p>
          </div>
        )}
      </section>
      <footer>
        <SquareButton
          type="submit"
          content="작성완료"
          onClick={() => {
            console.log('저장, 다음으로');
          }}
        />
      </footer>
    </div>
  );
}

export default UnitPage;
