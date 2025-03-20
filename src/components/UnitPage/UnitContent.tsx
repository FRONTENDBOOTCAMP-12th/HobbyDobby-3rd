import './unit-content.css';
import FillBlank from './AnswerTypes/FillBlank';
import UploadFile from './AnswerTypes/UploadFile';
import ShortAnswer from './AnswerTypes/ShortAnswer';
import { QuestionData } from '@/lib/supabase-client';
import MultipleChoices from './AnswerTypes/MultipleChoices';
import DescriptiveType from './AnswerTypes/DescriptiveType';

interface UnitContentProps {
  question: QuestionData | null;
}

function UnitContent({ question }: UnitContentProps) {
  const isNeedForm = !question?.type.find(
    (item) => item === 'not_question' || item === 'select'
  );

  const questionContents = question?.type.map((item) => {
    switch (item) {
      case 'descript':
        return (
          <DescriptiveType
            className="answer"
            placeholder="여기에 생각을 적어주세요!"
          />
        );
      case 'file':
        return <UploadFile name={`file-${question.id}`} />;
      case 'select':
        return (
          <MultipleChoices
            choices={question.select_content!}
            idRef="question"
          />
        );
      case 'short_descript':
        return <ShortAnswer />;
      case 'fill':
        return (
          <FillBlank
            contents={question.blank_content!}
            questionNumber={question.id}
          />
        );
      case 'not_question':
        return null;
    }
  });

  return (
    <div className="unit-content">
      <h2 className="question" id="question">
        {question?.question}
      </h2>
      {isNeedForm ? <form>{questionContents}</form> : <>{questionContents}</>}
    </div>
  );
}

export default UnitContent;
