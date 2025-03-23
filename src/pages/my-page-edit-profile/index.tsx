import CloseButton from '@/components/CloseButton';
import EditProfileHeader from '@/components/MyPageEditProfile/EditProfileHeader';
import EditProfileInfo from '@/components/MyPageEditProfile/EditProfileInfo';
import ProfileItemList from '@/components/MyPageEditProfile/ProfileItemList';
import { useEditProfileStore } from '@/stores/user-profile-edit';
import { ItemType } from '@/types/my-page-edit-profile/profile-item';
import gsap from 'gsap';
import { useLayoutEffect, useRef } from 'react';
import './style.css';

interface MyPageEditProfileProps {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  userProfileImg: string | null;
  userProfileItem: ItemType | null;
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
  const {
    nickname: newNickname,
    image: newProfileImg,
    item: newItem,
    title: newTitle,
  } = useEditProfileStore((state) => state.profile);

  const editPageRef = useRef<HTMLDivElement>(null);

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
            console.log('프로필 수정 페이지 열림', isEditing);
          },
        }
      );

      useEditProfileStore.setState({
        profile: {
          nickname: userNickname,
          title: userTitle,
          main_hobby: userMainHobby,
          image: userProfileImg,
          item: userProfileItem,
        },
      });
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
          console.log('프로필 수정 페이지 닫힘', !prevIsEditing);
        },
      });
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
        <EditProfileHeader profileImg={newProfileImg} item={newItem} />
      </section>

      <section className="edit-profile__body">
        <article className="article-container">
          <h2>보유 아이템</h2>
          <ProfileItemList newItem={newItem} />
        </article>
        <article className="article-container profile-details">
          <h2 className="sr-only">프로필 정보</h2>
          <EditProfileInfo
            nickname={newNickname}
            mainTitle={newTitle}
            mainHobby={userMainHobby}
          />
        </article>
      </section>
    </div>
  );
}

export default MyPageEditProfile;
