import { createClient } from '@supabase/supabase-js';
import { Database, Tables } from './schema';
import { ItemType } from '@/types/my-page-edit-profile/profile-item';

const { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY } = import.meta.env;

export const supabase = createClient<Database>(
  VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY
);

// export type MemoItem = Database['public']['Tables']['memo-list']['Row'];

// 단축된 방법 (별도 제공)
// export type 가져올타입명 = Tables<'테이블명'>;

export type UserData = Omit<Tables<'user'>, 'item'> & {
  item: ItemType | null;
};
export type HobbyData = Tables<'hobby'>;
export type SubHobbyData = Tables<'sub_hobby'>;
export type UnitData = Tables<'unit'>;
export type QuestionData = Tables<'question'>;

export type ChallengeData = Omit<
  Tables<'challenge'>,
  'now_unit' | 'sub_hobby_name'
> & {
  now_unit: UnitData | null;
  sub_hobby_name: SubHobbyData | null;
};
