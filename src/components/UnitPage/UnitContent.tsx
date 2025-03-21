import './unit-content.css';
import { useState } from 'react';
import CustomButton from '../CustomButton';
import { Progress } from '@/pages/unit-page';
import FillBlank from './AnswerTypes/FillBlank';
import UploadFile from './AnswerTypes/UploadFile';
import ShortAnswer from './AnswerTypes/ShortAnswer';
import { QuestionData } from '@/lib/supabase-client';
import MultipleChoices from './AnswerTypes/MultipleChoices';
import DescriptiveType from './AnswerTypes/DescriptiveType';

interface UnitContentProps {
  isLastQuestion: boolean;
  nowProgress: Progress[];
  question: QuestionData | null;
  trimAndSubmitProgress: () => Promise<void>;
  setNextQuestionIndex: (nextProgress: Progress[]) => void;
  setNowProgress: React.Dispatch<React.SetStateAction<Progress[]>>;
}

export interface Answers {
  answeredType: string;
  answer: string[] | File;
  answer_values: string[];
}

const INITIAL_ANSWERS = {
  answeredType: '',
  answer: [],
  answer_values: [],
};

function UnitContent({
  question,
  nowProgress,
  isLastQuestion,
  setNowProgress,
  setNextQuestionIndex,
  trimAndSubmitProgress,
}: UnitContentProps) {
  const [answers, setAnswers] = useState<Answers>(INITIAL_ANSWERS);

  // fill을 제외한 모든 타입의 값을 반영하는 함수
  const setNextAnswers = (value: string[] | File, type: string) => {
    if (Array.isArray(value)) {
      const nextAnswers = {
        answeredType: type,
        answer: [...value],
        answer_values: [...value],
      };
      setAnswers(nextAnswers);
    } else {
      // 파일인 경우
      const nextAnswers = {
        answeredType: type,
        answer: value,
        answer_values: ['파일이 들어있습니다.'],
      };
      setAnswers(nextAnswers);
    }
  };

  const isNeedForm = !question?.type.find(
    (item) => item === 'not_question' || item === 'select'
  );
  const isNotQuestionType = question?.type[0] !== 'not_question';
  const isAnswerValuesEmpty = answers.answer_values.every(
    (value) => value === ''
  );
  const isAnswerValuesValid = answers.answer_values.every(
    (value) => value.trim() !== ''
  );

  const isButtonDisabled =
    isNotQuestionType &&
    (question?.is_input_optional
      ? question.needs_input && isAnswerValuesEmpty
      : Array.isArray(answers.answer)
        ? answers.answer_values.length === 0 || !isAnswerValuesValid
        : false);
  console.log(
    isButtonDisabled,
    question?.is_input_optional,
    question?.needs_input
  );

  const handleUnitButtonClick = () => {
    if (isLastQuestion) {
      void trimAndSubmitProgress();
    } else if (question) {
      const nextProgress: Progress[] = [
        ...nowProgress,
        {
          type: answers.answeredType,
          question_number: question.id,
          question: question.question,
          answer: Array.isArray(answers.answer)
            ? [...answers.answer]
            : answers.answer,
          answer_values: [...answers.answer_values],
        },
      ];

      setNowProgress(nextProgress);
      setNextQuestionIndex(nextProgress);
      setAnswers(INITIAL_ANSWERS);
    }
  };

  const questionContents = question?.type.map((item, index) => {
    const isNeedKey = question.type.length > 1;
    switch (item) {
      case 'descript':
        return (
          <DescriptiveType
            key={isNeedKey ? `descript-${index}` : ''}
            setNextAnswers={setNextAnswers}
            className="answer"
            placeholder="여기에 생각을 적어주세요!"
          />
        );
      case 'file':
        return (
          <UploadFile
            key={isNeedKey ? `uploadFile-${index}` : ''}
            setNextAnswers={setNextAnswers}
            name={`file-${question.id}`}
          />
        );
      case 'select':
        return (
          <MultipleChoices
            key={isNeedKey ? `select-${index}` : ''}
            answer={(answers.answer as string[])[0]}
            setNextAnswers={setNextAnswers}
            choices={question.select_content!}
            idRef="question"
          />
        );
      case 'short_descript':
        return (
          <ShortAnswer
            key={isNeedKey ? `short-${index}` : ''}
            setNextAnswers={setNextAnswers}
          />
        );
      case 'fill':
        return (
          <FillBlank
            key={isNeedKey ? `blank-${index}` : ''}
            setAnswers={setAnswers}
            contents={question.blank_content!}
            questionNumber={question.id}
          />
        );
      case 'not_question':
        return null;
    }
  });

  return (
    <section className="unit-content">
      <h2 className="question" id="question">
        {question?.question}
      </h2>
      {isNeedForm ? (
        <form>
          {questionContents}
          <CustomButton
            type="button"
            buttonText={
              question?.not_question_content ??
              (isLastQuestion ? '제출' : '다음')
            }
            className="submit-btn"
            bgColor="var(--secondary-color)"
            onClick={handleUnitButtonClick}
            disabled={isButtonDisabled}
          />
        </form>
      ) : (
        <>
          {questionContents}
          <CustomButton
            type="button"
            buttonText={
              question?.not_question_content ??
              (isLastQuestion ? '제출' : '다음')
            }
            className="submit-btn"
            bgColor="var(--secondary-color)"
            onClick={handleUnitButtonClick}
            disabled={isButtonDisabled}
          />
        </>
      )}
    </section>
  );
}

export default UnitContent;
