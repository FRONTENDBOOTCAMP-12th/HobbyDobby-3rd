import { supabase, UserData } from './supabase-client';

export const getUserById = async (inputId: UserData['id']) =>
  await supabase.from('user').select('*').eq('id', inputId);
