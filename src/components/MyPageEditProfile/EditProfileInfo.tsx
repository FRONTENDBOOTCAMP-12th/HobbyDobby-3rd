import RightArrow from '@/components/ArrowButtons/RightArrow';
import gsap from 'gsap';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import EditNickname from './EditNickname';
import './styles/edit-profile-info.css';
import SelectMainTitle from './SelectMainTitle';

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

  const handleClickClose = () => {
    if (editInfoPageRef.current) {
      gsap.to(editInfoPageRef.current, {
        x: '100%', // 오른쪽으로 사라짐
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          // 애니메이션 완료 후 상태 변경
          setIsEditingInfo(false);
          setIsDisabled(true);
          setClickedEditInfo('');
        },
      });
      editInfoPageRef.current = null;
      console.log('프로필 수정 페이지 닫힘');
    }
  };

  useEffect(() => {
    console.log('닉네임 변경 완료', nickname);
  }, [nickname]);

  return (
    <>
      {infoList.map((info) => (
        <section key={`${info.label}-${info.value}`} className="edit-info-page">
          <h3 className="info-title">{info.label}</h3>
          <div className="info-and-btn__wrapper">
            {info.label === '닉네임' ? (
              <p>{nickname}</p>
            ) : info.label === '칭호' ? (
              <p>{mainTitle}</p>
            ) : (
              <p>{mainHobby}</p>
            )}
            <RightArrow onClick={() => handleClickEditInfo(info.label)} />
          </div>
        </section>
      ))}
      {/* 조건부 렌더링 : 닉네임, 칭호, 대표 취미 수정 */}
      {isEditingInfo && (
        <div ref={editInfoPageRef} className="edit-info__warpper">
          <div className="edit-info__container">
            {clickedEditInfo === '닉네임' && (
              <EditNickname
                nickname={nickname}
                isDisabled={isDisabled}
                handleClickClose={handleClickClose}
                setIsDisabled={setIsDisabled}
              />
            )}
            {clickedEditInfo === '칭호' && (
              <SelectMainTitle
                isDisabled={isDisabled}
                handleClickClose={handleClickClose}
              />
            )}
            {clickedEditInfo === '대표 취미' && (
              <div>대표 취미 수정 컴포넌트 자리</div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default EditProfileInfo;
