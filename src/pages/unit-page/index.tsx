import {
  getQuestionByUnit,
  updateChallengeProgress,
  uploadChallengeInputFileToStore,
} from '@/lib/api';
import './style.css';
import Swal from 'sweetalert2';
import Title from '@/layouts/title';
import { useUserStore } from '@/stores/user';
import { useCallback, useState } from 'react';
import useFetchData from '@/hooks/useFetchData';
import ProgressBar from '@/components/ProgressBar';
import { QuestionData } from '@/lib/supabase-client';
import { useLocation, useNavigate } from 'react-router';
import IndexCard from '@/components/UnitPage/IndexCard';
import UnitContent from '@/components/UnitPage/UnitContent';
import ReviewContent from '@/components/UnitPage/ReviewContent';

interface LocationState {
  unitName: string;
  section: number;
  title: string;
  level: number;
  maxLevel: number;
  state: 'complete' | 'now';
}

export interface Progress {
  type: string;
  answer: string[] | File;
  question: string;
  answer_values: string[];
  question_number: number;
}

const FINAL_SECTION = 3;

function UnitPage() {
  const [nowProgress, setNowProgress] = useState<Progress[]>([]);
  const [nowQuestionIndex, setNowQuestionIndex] = useState<number>(0);

  const nowChallenge = useUserStore((user) => user.now_challenge);
  const nowHobby = useUserStore((user) => user.now_hobby);
  const updateNowChallenge = useUserStore((user) => user.updateNowChllenge);

  const location = useLocation();
  const { unitName, section, title, level, maxLevel } = {
    ...(location.state as LocationState),
  };

  const fetchingFunction = useCallback(
    () => getQuestionByUnit(unitName),
    [unitName]
  );
  const { data: questions } = useFetchData(fetchingFunction);

  const navigate = useNavigate();
  const handleClickClose = () => {
    Swal.fire({
      title: '정말 나가시겠습니까?',
      text: '현재 유닛에 대한 진행 정보를 잃게 됩니다.',
      confirmButtonText: '나가기',
      confirmButtonColor: '#b60000',
      showCancelButton: true,
      cancelButtonText: '취소',
      scrollbarPadding: false,
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

  let maxOrder = 0;
  let isLastQuestion = false;
  let nowQuestion: QuestionData | null = null;
  const isQuestionsAvailable = questions && questions.length !== 0;
  if (isQuestionsAvailable) {
    const questionsLength = questions.length;

    nowQuestion = { ...questions[nowQuestionIndex] };
    maxOrder = questions[questionsLength - 1].order;
    isLastQuestion = maxOrder === questions[nowQuestionIndex].order;
  }
  const isLastUnit = level === maxLevel;
  const nextUnit =
    level === maxLevel
      ? section === 3
        ? unitName
        : `${unitName.slice(0, -3)}${section + 1}-1`
      : `${unitName.slice(0, -1)}${level + 1}`;

  // 다음 질문 번호를 인덱싱
  const setNextQuestionIndex = (nextProgress: Progress[]) => {
    if (!questions) {
      throw new Error();
    }

    let nextQuestionIndex = nowQuestionIndex + 1;

    // 다음 질문 번호를 찾는 반복문
    for (let i = nextQuestionIndex; i < questions.length; i++) {
      // 다음 질문의 부모 질문이 있는 경우(참고할 질문)
      if (questions[i].parent_question) {
        // 먼저 현재 진행도에서 부모 질문을 찾고
        const result = nextProgress.find(
          (item) => item.question_number === questions[i].parent_question
        );

        // 없는 경우 nowChallenge의 전체 진행도에서 부모 질문을 찾음
        if (!result && nowChallenge && nowChallenge.progress) {
          const progressArray = nowChallenge.progress as Progress[];
          const foundedProgress = progressArray.find(
            (progress: Progress) =>
              progress.question_number === questions[i].parent_question
          );

          if (
            foundedProgress?.answer_values.find(
              (item) => item === questions[i].previous_response![0]
            )
          ) {
            nextQuestionIndex = i;
            break;
          }
        }

        // 현재 진행도에서 부모 질문이 있고, 이전 질문과 값이 일치하는 경우 통과
        if (
          result &&
          (!questions[i].previous_response ||
            result.answer_values[0] === questions[i].previous_response![0])
        ) {
          nextQuestionIndex = i;
          break;
        }
      } else {
        // 다음 부모 질문이 없으면 그대로 통과
        nextQuestionIndex = i;
        break;
      }
    }

    setNowQuestionIndex(nextQuestionIndex);
  };

  // 로컬에 저장해둔 Progress 값을 다듬어 DB와 zustand에 저장 및 최신화
  const trimAndSubmitProgress = async () => {
    // 저장 될 + 전체가 비어있지 않은 진행도
    const filteredProgress = nowProgress.filter((progress) => {
      // 저장된 진행도와 같은 질문
      const question = questions?.find(
        (question) => question.id === progress.question_number
      );

      // 저장될 질문들은 저장
      // 저장될 질문의 값들이 모두 비워져 있는 경우는 저장 안 함
      if (
        question?.is_answer_record &&
        progress.answer_values.length !== 0 &&
        progress.answer_values.some((value) => value.trim() !== '')
      ) {
        return true;
      }
      return false;
    });

    // json에 넣을 준비가 끝난 진행도
    const savingProgress = await Promise.all(
      filteredProgress.map(async (progress) => {
        if (progress.type === 'file') {
          // 파일인 경우
          const url = await uploadChallengeInputFileToStore(
            progress.answer as File
          );
          return {
            ...progress,
            answer: [url],
            answer_values: [url],
          };
        } else {
          // 파일이 아닌 경우
          // 값이 ['']인 경우는 progress에 입력하지 않음
          const updatedProgress = progress.answer_values.reduce(
            (acc, value, index) => {
              if (value !== '') {
                acc.answer_values.push(value);
                acc.answer.push((progress.answer as string[])[index]);
              }
              return acc;
            },
            { answer_values: [] as string[], answer: [] as string[] }
          );

          return {
            ...progress,
            answer: updatedProgress.answer,
            answer_values: updatedProgress.answer_values,
          };
        }
      })
    );

    // 챌린지의 progress json과 결합
    const nextDBProgress = nowChallenge?.progress
      ? [...nowChallenge.progress, ...savingProgress]
      : [...savingProgress];

    // 입력 & zustand의 user스토어의 NowChallenge값 최신화
    updateChallengeProgress(nowChallenge!.id, nextDBProgress, nextUnit)
      .then((nextNowChallenge) => {
        updateNowChallenge(nowHobby!, nextNowChallenge[0]);
      })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: '저장 완료!',
          text: '유닛을 마무리하고 홈 페이지로 이동합니다.',
          confirmButtonColor: `var(--primary-color)`,
          scrollbarPadding: false,
        })
          .then(() => {
            void navigate('/home');
          })
          .catch((error: Error) => {
            throw error;
          });
      })
      .catch((error) => {
        throw error;
      });
  };

  const handleReviewContentEndButtonClick = () => {
    updateChallengeProgress(nowChallenge!.id, nowChallenge!.progress, nextUnit)
      .then((nextNowChallenge) => {
        updateNowChallenge(nowHobby!, nextNowChallenge[0]);
      })
      .then(() => {
        // 마지막 섹션인 경우(챌린지 엔딩 페이지로 연결)
        if (section === FINAL_SECTION) {
          Swal.fire({
            icon: 'success',
            title: '저장 완료!',
            text: '유닛을 마무리하고 챌린지 완료 페이지로 이동합니다.',
            confirmButtonColor: `var(--primary-color)`,
            scrollbarPadding: false,
          })
            .then(() => {
              void navigate('/challenge-end');
            })
            .catch((error: Error) => {
              throw error;
            });
        } else {
          Swal.fire({
            icon: 'success',
            title: '저장 완료!',
            text: '유닛을 마무리하고 홈 페이지로 이동합니다.',
            confirmButtonColor: `var(--primary-color)`,
            scrollbarPadding: false,
          })
            .then(() => {
              void navigate('/home');
            })
            .catch((error: Error) => {
              throw error;
            });
        }
      })
      .catch((error) => {
        throw error;
      });
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
          value={isQuestionsAvailable ? nowQuestion!.order : maxOrder}
          max={maxOrder}
          height="0.8rem"
        />
      </header>

      {isLastUnit ? (
        <ReviewContent
          section={section}
          progress={nowChallenge!.progress as Progress[]}
          handleClick={handleReviewContentEndButtonClick}
        />
      ) : (
        <UnitContent
          nowProgress={nowProgress}
          isLastQuestion={isLastQuestion}
          question={questions ? nowQuestion! : null}
          setNowProgress={setNowProgress}
          setNextQuestionIndex={setNextQuestionIndex}
          trimAndSubmitProgress={trimAndSubmitProgress}
        />
      )}
    </div>
  );
}

export default UnitPage;
