import './style.css';
import Swal from 'sweetalert2';
import Title from '@/layouts/title';
import { useNavigate } from 'react-router';
import ProgressBar from '@/components/ProgressBar';
import CustomButton from '@/components/CustomButton';
import IndexCard from '@/components/UnitPage/IndexCard';
import UploadFile from '@/components/UnitPage/AnswerTypes/UploadFile';
import DescriptiveType from '@/components/UnitPage/AnswerTypes/DescriptiveType';
import MultipleChoices from '@/components/UnitPage/AnswerTypes/MultipleChoices';
import ShortAnswer from './../../components/UnitPage/AnswerTypes/ShortAnswer';
import FillBlank from '@/components/UnitPage/AnswerTypes/FillBlank';

interface UnitPageProps {
  isQuestion: boolean;
  challengeName: string;
  section: number;
  currentUnit: number;
  totalUnits: number;
}

function UnitPage({
  isQuestion,
  challengeName,
  section,
  currentUnit,
  totalUnits,
}: UnitPageProps) {
  const currentStep = 2;
  const totalSteps = 7;

  // 임시로 만든 닫기 버튼 이벤트 핸들러
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

  return (
    <div className="unit-page">
      <Title>{challengeName}</Title>
      <header className="unit-header">
        <IndexCard
          section={section}
          totalUnits={totalUnits}
          currentUnit={currentUnit}
          unitTitle="책의 중반부"
          handleClickClose={handleClickClose}
        />
        <ProgressBar value={currentStep} max={totalSteps} height="0.8rem" />
      </header>

      <section className="unit-content">
        <h2 className="question">문항에 대한 짧은 제목/설명</h2>
        <form action="post">
          <DescriptiveType
            className="answer"
            placeholder="여기에 생각을 적어주세요!"
          />
          <UploadFile name="name" />
          <MultipleChoices
            choices={['돌고래', '하마', '악어', '기린']}
            // 질문을 idRef에 연결해야 함
            idRef="animals"
          />
          <ShortAnswer />
          <FillBlank
            contents={[
              '책 이름 : ㅁ',
              '제 취미는 ㅁ입니다.',
              'ㅁ를 즐겨합니다.',
            ]}
            questionNumber={1}
          />
        </form>
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
