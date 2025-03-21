import RightArrow from '@/components/ArrowButtons/RightArrow';
import './EditProfileInfo.css';
import { useLayoutEffect, useRef, useState } from 'react';
import EditNicknameForm from './EditNicknameForm';
import gsap from 'gsap';

function EditProfileInfo({
  nickname,
  mainTitle,
  mainHobby,
  setNickname,
  // setMainTitle,
}: {
  nickname: string;
  mainTitle: string | null;
  mainHobby: string | null;
  setNickname: (nickname: string) => void;
  setMainTitle: (mainTitle: string) => void;
}) {
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const editInfoPageRef = useRef<HTMLDivElement>(null);
  const [clickedEditInfo, setClickedEditInfo] = useState('');

  const handleClickEditInfo = (label: string) => {
    setClickedEditInfo(label);
    setIsEditingInfo(true);
    console.log(`${label} 수정하기`);
  };

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

  useLayoutEffect(() => {
    if (isEditingInfo && editInfoPageRef.current) {
      gsap.fromTo(
        editInfoPageRef.current,
        { x: '100%' }, // 오른쪽에서 시작
        {
          x: '0%', // 가운데로 이동
          duration: 0.25,
          ease: 'power2.out',
        }
      );
      console.log('프로필 수정 페이지 열림', isEditingInfo);
    }
  }, [isEditingInfo]);

  const handleClickCloseButton = () => {
    if (editInfoPageRef.current) {
      gsap.to(editInfoPageRef.current, {
        x: '100%', // 오른쪽으로 사라짐
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          // 애니메이션 완료 후 상태 변경
          setIsEditingInfo(false);
          setClickedEditInfo('');
        },
      });
      editInfoPageRef.current = null;
      console.log('프로필 수정 페이지 닫힘');
    }
  };

  return (
    <>
      {infoList.map((info) => (
        <section key={info.label} className="info__wrapper">
          <h3 className="info-title">{info.label}</h3>
          <div className="info-and-btn__wrapper">
            <p>{info.value}</p>
            <RightArrow onClick={() => handleClickEditInfo(info.label)} />
          </div>
        </section>
      ))}
      {/* 조건부 렌더링 */}
      {isEditingInfo && (
        <div ref={editInfoPageRef} className="edit-info__page">
          <button onClick={handleClickCloseButton}>닫기</button>

          {/* 조건부 렌더링 */}
          {clickedEditInfo === '닉네임' && (
            <EditNicknameForm nickname={nickname} setNickname={setNickname} />
          )}
          {clickedEditInfo === '칭호' && <div>칭호 수정 컴포넌트 자리</div>}
          {clickedEditInfo === '대표 취미' && (
            <div>대표 취미 수정 컴포넌트 자리</div>
          )}
        </div>
      )}
    </>
  );
}

export default EditProfileInfo;
