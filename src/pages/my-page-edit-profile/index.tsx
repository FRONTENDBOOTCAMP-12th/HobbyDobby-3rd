import { RefObject, useLayoutEffect, useRef } from 'react';

import CloseButton from '@/components/CloseButton';
import EditProfileHeader from '@/components/MyPageEditProfile/EditProfileHeader';
import EditProfileInfo from '@/components/MyPageEditProfile/EditProfileInfo';
import ProfileItemList from '@/components/MyPageEditProfile/ProfileItemList';

import { useEditProfileStore } from '@/stores/user-profile-edit';
import { animateEditPageOpening, handleSaveProfile } from '@/utils/editProfile';

import { ItemType } from '@/types/my-page-edit-profile/profile-item';

import { handleCloseEditPage } from '@/utils/editProfile';
import './style.css';

interface MyPageEditProfileProps {
  userId: string;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  userProfileImg: string | null;
  userProfileItem: ItemType | null;
  userNickname: string;
  userTitle: string | null;
  userMainHobby: string | null;
}

// 프로필 편집 페이지 컴포넌트
function MyPageEditProfile({
  isEditing,
  userId,
  setIsEditing,
  userProfileImg,
  userProfileItem,
  userNickname,
  userTitle,
  userMainHobby,
}: MyPageEditProfileProps) {
  // 프로필 수정 상태 관리 zustand 스토어
  const {
    nickname: newNickname,
    image: newProfileImg,
    file: newFile,
    item: newItem,
    title: newTitle,
    main_hobby: newMainHobby,
  } = useEditProfileStore((state) => state.profile);

  // 수정 페이지 ref
  const editPageRef = useRef<HTMLDivElement>(null);

  // 수정 페이지 열림 -> 프로필 수정 상태 초기 설정
  useLayoutEffect(() => {
    animateEditPageOpening(
      editPageRef as React.RefObject<HTMLDivElement>,
      isEditing
    );

    useEditProfileStore.setState({
      profile: {
        nickname: userNickname,
        title: userTitle,
        main_hobby: userMainHobby,
        image: userProfileImg,
        item: userProfileItem,
        file: null,
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing]);

  // X(닫기) 버튼 클릭 이벤트 핸들러
  const handleClickCloseButton = () => {
    handleCloseEditPage(
      '변경사항을 취소하시겠습니까?',
      editPageRef as RefObject<HTMLDivElement>,
      isEditing,
      setIsEditing as React.Dispatch<React.SetStateAction<boolean>>,
      () => {
        // console.log('프로필 수정 페이지 닫힘');
      }
    ).catch((error) => {
      console.error('Error closing edit page:', error);
    });
  };

  // 저장 버튼 클릭 이벤트 핸들러
  const handleClickSaveButton = () => {
    // 컨펌 모달 띄우기
    handleCloseEditPage(
      '변경사항을 저장하시겠습니까?',
      editPageRef as RefObject<HTMLDivElement>,
      isEditing,
      setIsEditing as React.Dispatch<React.SetStateAction<boolean>>,
      () => {
        console.log('프로필 수정 페이지 닫힘');
      }
    )
      .then(() =>
        // 수정 사항 저장
        handleSaveProfile(
          newProfileImg,
          newFile,
          userId,
          newNickname,
          newTitle,
          newMainHobby,
          newItem
        )
      )
      .catch((error) => {
        console.error('Error closing edit page:', error);
      });
  };

  return (
    <div ref={editPageRef} className="edit-profile-page">
      {/* 상단 헤더 (저장, 페이지명, X) */}
      <header className="edit-profile__top-header">
        <h2 className="edit-profile__title">프로필 수정</h2>
        <div className="top-btns">
          <button
            type="button"
            className="save-edit-profile__btn"
            onClick={handleClickSaveButton}
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

      {/* 프로필 편집 페이지 프로필 헤더 (프로필 이미지) */}
      <section className="edit-profile-header">
        <EditProfileHeader profileImg={newProfileImg} item={newItem} />
      </section>

      {/* 프로필 편집 페이지 프로필 바디 (프로필 아이템, 프로필 정보) */}
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
