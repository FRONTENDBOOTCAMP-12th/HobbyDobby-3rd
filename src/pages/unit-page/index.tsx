import './style.css';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import ProgressBar from '@/components/ProgressBar';
import IndexCard from '@/components/UnitPage/IndexCard';
import CustomButton from '@/components/CustomButton';
import DescriptiveType from '@/components/UnitPage/AnswerTypes/DescriptiveType';
import Title from '@/layouts/title';

function UnitPage() {
  const [isQuestion] = useState(true);
  const [challengeName] = useState('여름의 시집 읽기');
  const [currentSection] = useState(2);
  const [currentUnit] = useState(2);
  const [totalUnits] = useState(7);

  const currentStep = 2;
  const totalSteps = 7;

  // 임시로 만든 닫기 버튼 이벤트 핸들러
  const navigate = useNavigate();
  const handleClickClose = () => {
    void navigate('/home'); // /mainpage로 이동
  };

  return (
    <div className="unit-page">
      <Title>{challengeName}</Title>
      <header className="unit-header">
        <IndexCard
          section={currentSection}
          totalUnits={totalUnits}
          currentUnit={currentUnit}
          unitTitle="책의 중반부"
          handleClickClose={handleClickClose}
        />
        <ProgressBar value={currentStep} max={totalSteps} height="0.8rem" />
      </header>

      <section className="unit-content">
        <h2 className="question">문항에 대한 짧은 제목/설명</h2>
        {isQuestion ? (
          <form action="post">
            <DescriptiveType
              className="answer"
              placeholder="여기에 생각을 적어주세요!"
            />
          </form>
        ) : (
          <div>
            <p>이 문항은 응답을 요구하는 질문이 아닙니다.</p>
          </div>
        )}
      </section>

      <footer className="unit-footer">
        <CustomButton
          type="submit"
          buttonText="작성완료"
          className="submit-btn"
          bgColor="var(--secondary-color)"
          onClick={() => {
            console.log('저장, 다음으로');
          }}
        />
      </footer>
    </div>
  );
}

export default UnitPage;
