import { UserData } from '@/lib/supabase-client';
import { ItemType } from '@/types/my-page-edit-profile/profile-item';
import { create } from 'zustand';
import { combine, devtools, persist } from 'zustand/middleware';

type EditableProfile = Pick<
  UserData,
  'nickname' | 'title' | 'main_hobby' | 'image' | 'item'
> & {
  main_hobby: string | null;
  item: ItemType | null;
  file: File | null;
};

const initialEditableProfile: EditableProfile = {
  nickname: '',
  title: '',
  main_hobby: null,
  image: null,
  file: null,
  item: null,
};

export const useEditProfileStore = create(
  persist(
    devtools(
      combine(
        {
          profile: initialEditableProfile,
          isEditing: false,
        },
        (set) => ({
          // 프로필 상태 업데이트
          updateProfile: (newProfile: Partial<EditableProfile>) =>
            set((state) => ({
              profile: {
                ...state.profile,
                ...newProfile,
              },
            })),

          // 편집 상태 변경
          setIsEditing: (isEditing: boolean) => set({ isEditing }),

          // 초기 상태로 리셋 (ex: 저장 후 성공 시)
          resetProfile: () => set({ profile: initialEditableProfile }),
        })
      )
    ),
    {
      name: 'store/editable-profile', // localStorage에 저장될 키 이름
      partialize: (state) => ({ profile: state.profile }), // 저장할 데이터만 선택
    }
  )
);
