import { getPublicImage } from '@/utils/getPublic';
import './EditProfileHeader.css';
import { useEffect, useRef, useState } from 'react';
// import { supabase } from '@/lib/supabase-client';

function EditProfileHeader({
  setProfileImg,
  profileImg,
  item,
}: {
  setProfileImg: (profileImg: string | null) => void;
  profileImg?: string | null;
  item: { image: string; name: string } | null;
}) {
  // const uploadChallengeInputFileToStore = async (file: File) => {
  //   const filePath = `/challenge_file/${Date.now()}_${file.name}`;

  //   const { error } = await supabase.storage.from('image').upload(filePath, file);

  //   if (error) {
  //     console.error('ChallengeInput Upload to Store Error:', error.message);
  //     throw error;
  //   } else {
  //     const { data: urlData } = supabase.storage
  //       .from('image')
  //       .getPublicUrl(filePath);

  //     return urlData.publicUrl;
  //   }
  // };

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleEditProfileImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileImg(url);
    } else {
      console.log('파일이 없습니다.');
    }
    setMenuOpen(false);
  };

  const handleRemoveProfile = () => {
    setProfileImg('/assets/profile-none.jpg');
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="edit-profile-header">
      <span className="profile-item__frame" aria-label="프로필 꾸미기 아이템">
        {item?.image && <img src={item?.image} alt={item?.name} />}
      </span>
      <span className="edit-profile-img__frame">
        {profileImg ? <img src={profileImg} alt="프로필 이미지" /> : null}
        <button
          className="edit-profile-img__button"
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <img src={getPublicImage('edit-profile.svg')} alt="프로필 수정하기" />
        </button>
      </span>

      {/* 프로필 이미지 수정 메뉴 */}
      {menuOpen && (
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
      )}
    </header>
  );
}

export default EditProfileHeader;
