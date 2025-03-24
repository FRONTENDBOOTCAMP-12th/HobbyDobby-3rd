import { useEffect, useRef, useState } from 'react';

import { useEditProfileStore } from '@/stores/user-profile-edit';
import { getPublicImage } from '@/utils/getPublic';
import { DEFAULT_PROFILE_IMG_URL } from '@/utils/editProfile';

import './styles/edit-profile-header.css';

interface EditProfileHeaderProps {
  profileImg?: string | null;
  item: { image: string; name: string } | null;
}

// 프로필 이미지 수정 및 제거 기능을 담당하는 컴포넌트
function EditProfileHeader({ profileImg, item }: EditProfileHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // 새로운 프로필 이미지를 zustand 상태 관리에 업데이트
  const handleSetNewProfileImg = (newProfileImg: string | null) => {
    useEditProfileStore.setState((state) => ({
      profile: {
        ...state.profile,
        image: newProfileImg,
      },
    }));
  };

  // 프로필 이미지 파일 변경
  const handleEditProfileImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      handleSetNewProfileImg(url);
      useEditProfileStore.getState().updateProfile({ file });
    } else {
      console.log('파일이 없습니다.');
    }
    closeMenu(); // 메뉴 닫기
  };

  // 프로필 이미지 제거
  const handleRemoveProfile = () => {
    handleSetNewProfileImg(DEFAULT_PROFILE_IMG_URL);
    closeMenu(); // 메뉴 닫기
  };

  // 메뉴 닫기
  const closeMenu = () => setMenuOpen(false);

  // 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 프로필 이미지 수정 메뉴
  const ProfileMenu = () => (
    <div className="edit-profile-menu" ref={menuRef}>
      <button
        className="edit-profile-menu__item"
        type="button"
        onClick={handleRemoveProfile}
      >
        프로필 제거
      </button>
      <input
        type="file"
        id="input-profile-img-file"
        accept=".png, .jpg, .jpeg, .svg"
        onChange={handleEditProfileImg}
        hidden
      />
      <label
        className="edit-profile-menu__item"
        htmlFor="input-profile-img-file"
      >
        프로필 수정
      </label>
    </div>
  );

  return (
    <header className="edit-profile-header">
      {/* 아이템 이미지 표시 */}
      <span className="profile-item__frame" aria-label="프로필 꾸미기 아이템">
        {item?.image && <img src={item.image} alt={item.name} />}
      </span>

      {/* 프로필 이미지 및 수정 버튼 */}
      <span className="edit-profile-img__frame">
        {profileImg && <img src={profileImg} alt="프로필 이미지" />}
        <button
          className="edit-profile-img__button"
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)} // 메뉴 토글
        >
          <img src={getPublicImage('edit-profile.svg')} alt="프로필 수정하기" />
        </button>
      </span>

      {/* 프로필 이미지 수정 메뉴 표시 */}
      {menuOpen && <ProfileMenu />}
    </header>
  );
}

export default EditProfileHeader;
