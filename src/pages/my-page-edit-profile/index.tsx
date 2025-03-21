import CloseButton from '@/components/CloseButton';
import EditProfileInfo from '@/components/MyPageEditProfile/EditProfileInfo';
import EditProfileHeader from '@/components/MyPageEditProfile/EditProfileHeader';
import gsap from 'gsap';
import { useLayoutEffect, useRef, useState } from 'react';
import ProfileItemList from '@/components/MyPageEditProfile/ProfileItemList';
import './style.css';
import { ItemType } from '@/types/my-page-edit-profile/profile-item';

interface MyPageEditProfileProps {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  userProfileImg: string | null;
  userProfileItem: (string & ItemType) | null;
  userNickname: string;
  userTitle: string | null;
  userMainHobby: string | null;
}

function MyPageEditProfile({
  isEditing,
  setIsEditing,
  userProfileImg,
  userProfileItem,
  userNickname,
  userTitle,
  userMainHobby,
}: MyPageEditProfileProps) {
  const editPageRef = useRef<HTMLDivElement>(null);

  const [nowItem, setNowItem] = useState<ItemType>({
    name: userProfileItem?.name ?? '',
    image: userProfileItem?.image ?? '',
  });

  const [nowProfileImg, setNowProfileImg] = useState<string | null>(
    userProfileImg ?? '/images/profile-none.png'
  );

  const [nowUserNickname, setUserNickname] = useState<string>(userNickname);
  const [nowUserMainTitle, setUserMainTitle] = useState<string | null>(
    userTitle
  );
  // const [nowUserMainHobby, setUserMainHobby] = useState<string | null>(
  //   userMainHobby
  // );

  console.log(nowItem, nowProfileImg, nowUserNickname, nowUserMainTitle);

  useLayoutEffect(() => {
    if (isEditing && editPageRef.current) {
      gsap.fromTo(
        editPageRef.current,
        { x: '100%' }, // 오른쪽에서 시작
        {
          x: '0%', // 가운데로 이동
          duration: 0.25,
          ease: 'power2.out',
          onComplete: () => {
            // 애니메이션 완료 후 상태 변경
            // document.body.style.overflow = 'hidden';
          },
        }
      );
      console.log('프로필 수정 페이지 열림', isEditing);
    }
  }, [isEditing]);

  const handleClickCloseButton = () => {
    if (editPageRef.current) {
      const prevIsEditing = isEditing;
      gsap.to(editPageRef.current, {
        x: '100%', // 오른쪽으로 사라짐
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          // 애니메이션 완료 후 상태 변경
          setIsEditing(!prevIsEditing);
          document.body.style.overflow = 'auto';
        },
      });
      console.log('프로필 수정 페이지 닫힘', !prevIsEditing);
    }
  };

  return (
    <div ref={editPageRef} className="edit-profile-page">
      <header className="edit-profile__top-header">
        <h2 className="edit-profile__title">프로필 수정</h2>
        <div className="top-btns">
          <button
            type="button"
            className="save-edit-profile__btn"
            onClick={() => console.log('프로필 저장하기')}
          >
            저장
          </button>
          <CloseButton
            onClick={handleClickCloseButton}
            fill="black"
            size={17}
            strokeWidth={1}
            className="close-edit-profile__btn"
          />
        </div>
      </header>

      <section className="edit-profile-header">
        <EditProfileHeader
          profileImg={nowProfileImg}
          setProfileImg={setNowProfileImg}
          item={nowItem}
        />
      </section>

      <section className="edit-profile__body">
        <article className="article-container">
          <h2>보유 아이템</h2>
          <ProfileItemList nowItem={nowItem} setNowItem={setNowItem} />
        </article>
        <article className="article-container profile-details">
          <h2 className="sr-only">프로필 정보</h2>
          <EditProfileInfo
            nickname={userNickname}
            mainTitle={userTitle}
            mainHobby={userMainHobby}
            setNickname={setUserNickname}
            setMainTitle={setUserMainTitle}
          />
        </article>
      </section>
    </div>
  );
}

export default MyPageEditProfile;
