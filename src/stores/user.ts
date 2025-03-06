import { UserData as User } from '@/lib/supabase-client';
import { create } from 'zustand';
import { combine, devtools, persist } from 'zustand/middleware';

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
  uid: -1,
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
              'user/login'
            ),
          logout: () => set(initialUser, undefined, 'user/logout'),
        })
      )
    ),
    { name: 'store/user' }
  )
);
