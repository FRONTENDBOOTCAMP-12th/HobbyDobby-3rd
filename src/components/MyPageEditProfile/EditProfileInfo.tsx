import RightArrow from '@/components/ArrowButtons/RightArrow';
import {
  animateEditPageOpening,
  handleCloseEditPage,
} from '@/utils/editProfile';
import { RefObject, useLayoutEffect, useRef, useState } from 'react';
import EditNickname from './EditNickname';
import SelectMainHobby from './SelectMainHobby';
import SelectMainTitle from './SelectMainTitle';
import './styles/edit-profile-info.css';

function EditProfileInfo({
  nickname,
  mainTitle,
  mainHobby,
}: {
  nickname: string;
  mainTitle: string | null;
  mainHobby: string | null;
}) {
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const editInfoPageRef = useRef<HTMLDivElement>(null);
  const [clickedEditInfo, setClickedEditInfo] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  // 수정 가능 프로필 정보 리스트 데이터 (항목명, 값, 클릭 이벤트 핸들러)
  const infoList = [
    { label: '닉네임', value: nickname },
    {
      label: '칭호',
      value: mainTitle,
      onClick: () => handleClickEditInfo('칭호'),
    },
    {
      label: '대표 취미',
      value: mainHobby,
      onClick: () => handleClickEditInfo('대표 취미'),
    },
  ];

  // 각 항목의 오른쪽 화살표 버튼 클릭 이벤트 핸들러
  const handleClickEditInfo = (label: string) => {
    setClickedEditInfo(label);
    setIsEditingInfo(true);
  };

  // 해당 항목의 수정 페이지 열림
  useLayoutEffect(() => {
    animateEditPageOpening(
      editInfoPageRef as React.RefObject<HTMLDivElement>,
      isEditingInfo
    );
    if (clickedEditInfo !== '') {
      // console.log(`${clickedEditInfo} 수정 페이지 열림`);
    }
  }, [isEditingInfo, clickedEditInfo]);

  // 수정 페이지 닫기 이벤트 핸들러
  const handleClickClose = () => {
    handleCloseEditPage(
      '변경사항을 취소하시겠습니까?',
      editInfoPageRef as RefObject<HTMLDivElement>,
      isEditingInfo,
      setIsEditingInfo,
      () => {
        // console.log(`${clickedEditInfo} 수정 페이지 닫힘`);
      },
      setClickedEditInfo,
      setIsDisabled
    ).catch((error) => {
      console.error('Error closing edit page:', error);
    });
  };

  // 완료 버튼 눌렀을 때 이벤트 핸들러
  const handleClickSave = () => {
    handleCloseEditPage(
      '변경사항을 저장하시겠습니까?',
      editInfoPageRef as RefObject<HTMLDivElement>,
      isEditingInfo,
      setIsEditingInfo,
      () => {
        // console.log(`${clickedEditInfo} 수정 페이지 저장`);
      },
      setClickedEditInfo,
      setIsDisabled
    ).catch((error) => {
      console.error('Error closing edit page:', error);
    });
  };

  return (
    <>
      {/* 수정 가능한 프로필 정보 리스트 렌더링 (닉네임, 칭호, 대표 취미) */}
      {infoList.map((info) => (
        <section key={`${info.label}-${info.value}`} className="edit-info-page">
          <h3 className="info-title">{info.label}</h3>
          <div className="info-and-btn__wrapper">
            <p>
              {info.label === '닉네임'
                ? nickname
                : info.label === '칭호'
                  ? mainTitle
                  : mainHobby}
            </p>
            <RightArrow onClick={() => handleClickEditInfo(info.label)} />
          </div>
        </section>
      ))}

      {/* 각 항목별 수정 페이지 조건부 렌더링 */}
      {isEditingInfo && (
        <div ref={editInfoPageRef} className="edit-info__warpper">
          <div className="edit-info__container">
            {clickedEditInfo === '닉네임' && (
              <EditNickname
                nickname={nickname}
                isDisabled={isDisabled}
                handleClickClose={handleClickClose}
                handleClickSave={handleClickSave}
                setIsDisabled={setIsDisabled}
              />
            )}
            {clickedEditInfo === '칭호' && (
              <SelectMainTitle
                isDisabled={isDisabled}
                setIsDisabled={setIsDisabled}
                mainTitle={mainTitle}
                handleClickSave={handleClickSave}
                handleClickClose={handleClickClose}
              />
            )}
            {clickedEditInfo === '대표 취미' && (
              <SelectMainHobby
                isDisabled={isDisabled}
                setIsDisabled={setIsDisabled}
                mainHobby={mainHobby}
                handleClickSave={handleClickSave}
                handleClickClose={handleClickClose}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default EditProfileInfo;
