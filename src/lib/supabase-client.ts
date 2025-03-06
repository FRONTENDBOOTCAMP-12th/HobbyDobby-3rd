import { createClient } from '@supabase/supabase-js';
import { Database, Tables } from './schema';

const { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY } = import.meta.env;

export const supabase = createClient<Database>(
  VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY
);

// export type MemoItem = Database['public']['Tables']['memo-list']['Row'];

// 단축된 방법 (별도 제공)
// export type 가져올타입명 = Tables<'테이블명'>;

export type UserData = Tables<'user'>;
export type HobbyData = Tables<'hobby'>;
