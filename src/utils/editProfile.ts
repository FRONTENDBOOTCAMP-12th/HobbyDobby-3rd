import { updateUserProfile, uploadChallengeInputFileToStore } from '@/lib/api';
import { useUserStore } from '@/stores/user';
import { ItemType } from '@/types/my-page-edit-profile/profile-item';
import Swal from 'sweetalert2';
import gsap from 'gsap';

export const DEFAULT_PROFILE_IMG_URL = '/assets/profile-none.jpg';

/* -------------------------------------------------------------------------- */
/*                              프로필 수정 페이지 닫기 함수                      */
/* -------------------------------------------------------------------------- */

export const handleCloseEditPage = async (
  confirmText: string,
  editPageRef: React.RefObject<HTMLDivElement>,
  isEditing: boolean,
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>,
  successAction?: () => void,
  setClickedEditInfo?: React.Dispatch<React.SetStateAction<string>>,
  setIsDisabled?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (!editPageRef.current) return;

  const result = await Swal.fire({
    text: confirmText,
    icon: 'question',
    confirmButtonColor: 'var(--primary-color)',
    showCancelButton: true,
    heightAuto: false,
    scrollbarPadding: false,
  });

  if (result.isConfirmed) {
    animateEditPageClosing(
      editPageRef,
      isEditing,
      setIsEditing,
      setIsDisabled,
      setClickedEditInfo
    );
    successAction?.();
  }
};

/* -------------------------------------------------------------------------- */
/*                           프로필 수정 사항 저장 함수                           */
/* -------------------------------------------------------------------------- */

// 서버에 업데이트
const handleProfileUpdate = async (
  newProfileImg: string | null,
  newFile: File | null,
  userId: string,
  newNickname: string,
  newTitle: string | null,
  newMainHobby: string | null,
  newItem: ItemType | null
) => {
  try {
    // 새로운 프로필 이미지 파일이 있을 경우 파일 업로드 후 프로필 업데이트
    let uploadedProfileImg = newProfileImg;
    if (newFile) {
      uploadedProfileImg = await uploadChallengeInputFileToStore(newFile);
    }

    await updateUserProfile(
      userId,
      newNickname,
      uploadedProfileImg,
      newTitle,
      newMainHobby,
      newItem ? newItem.name : null
    );

    useUserStore
      .getState()
      .updateProfile(
        newTitle,
        newItem,
        newMainHobby,
        uploadedProfileImg,
        newNickname
      );

    console.log('Profile updated successfully');
  } catch (error) {
    console.error('Error updating profile or uploading file:', error);
  }
};

// 프로필 수정 사항 저장
export const handleSaveProfile = async (
  newProfileImg: string | null,
  newFile: File | null,
  userId: string,
  newNickname: string,
  newTitle: string | null,
  newMainHobby: string | null,
  newItem: ItemType | null
) => {
  try {
    await handleProfileUpdate(
      newProfileImg,
      newFile,
      userId,
      newNickname,
      newTitle,
      newMainHobby,
      newItem
    );
  } catch (error) {
    console.error('프로필 업데이트 중 오류 발생:', error);
  }
};

/* -------------------------------------------------------------------------- */
/*                                 gsap 애니메이션                              */
/* -------------------------------------------------------------------------- */

// 프로필 수정 페이지 열기 애니메이션
export const animateEditPageOpening = (
  editPageRef: React.RefObject<HTMLDivElement>,
  isEditing: boolean
) => {
  if (!isEditing || !editPageRef.current) return;

  gsap.fromTo(
    editPageRef.current,
    { x: '100%' },
    {
      x: '0%',
      duration: 0.25,
      ease: 'power2.out',
    }
  );
};

// 프로필 수정 페이지 닫기 애니메이션
export const animateEditPageClosing = (
  editPageRef: React.RefObject<HTMLDivElement>,
  isEditing: boolean,
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>,
  setIsDisabled?: React.Dispatch<React.SetStateAction<boolean>>,
  setClickedEditInfo?: React.Dispatch<React.SetStateAction<string>>
) => {
  if (!isEditing || !editPageRef.current) return;

  gsap.to(editPageRef.current, {
    x: '100%',
    duration: 0.25,
    ease: 'power2.in',
    onComplete: () => {
      setIsEditing(false);
      setIsDisabled?.(true);
      setClickedEditInfo?.('');
    },
  });
};
