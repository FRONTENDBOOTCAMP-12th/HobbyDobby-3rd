import { HobbyData, UserData } from '@/lib/supabase-client';
import { create } from 'zustand';
import { combine, devtools, persist } from 'zustand/middleware';

type User = Omit<UserData, 'now_hobby' | 'created_date'> & {
  user_hobbies: (HobbyData | null)[];
  now_hobby: HobbyData | null;
  created_date: string | null;
};

// 비로그인 상태
const initialUser: User = {
  created_date: null,
  exp: null,
  gem: null,
  id: '',
  image: null,
  item: null,
  main_hobby: null,
  nickname: '',
  now_challenge: null,
  now_hobby: null,
  password: '',
  title: null,
  uid: '',
  user_hobbies: [],
};

export const useUserStore = create(
  persist(
    devtools(
      combine(
        {
          ...initialUser,
        },
        (set) => ({
          // 유저 데이터 값 set 함수들
          login: (user: User) =>
            set(
              {
                ...user,
              },
              undefined,
              'login'
            ),
          logout: () => set(initialUser, undefined, 'logout'),
          updateNowHobby: (hobby: HobbyData) =>
            set(
              {
                now_hobby: hobby,
              },
              undefined,
              'updateNowHobby'
            ),
        })
      )
    ),
    { name: 'store/user' }
  )
);
