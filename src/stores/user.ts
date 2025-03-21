import { ChallengeData, UserData } from '@/lib/supabase-client';
import { create } from 'zustand';
import { combine, devtools, persist } from 'zustand/middleware';

type User = Omit<UserData, 'created_date' | 'now_challenge'> & {
  user_hobbies: (string | null)[];
  now_challenge: ChallengeData | null;
  created_date: string | null;
};

// 비로그인 상태
const initialUser: User = {
  uid: '',
  id: '',
  password: '',
  nickname: '',
  created_date: null,
  image: null,
  exp: null,
  gem: null,
  item: null,
  title: null,
  main_hobby: null,
  now_hobby: null,
  now_challenge: null,
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
          updateNowChllenge: (hobby: string, challenge: ChallengeData) =>
            set(
              {
                now_hobby: hobby,
                now_challenge: challenge,
              },
              undefined,
              'updateNowChallenge'
            ),
          updateNowHobby: (hobby: string) =>
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
