import { HobbyData, supabase, UserData } from './supabase-client';

export const getUserByID = async (inputID: UserData['id']) =>
  await supabase
    .from('user')
    .select(
      `
      *,
      now_hobby:hobby!now_hobby(id,name)
    `
    )
    .eq('id', inputID);

export const getUserHobbiesByUID = async (inputUID: UserData['uid']) => {
  const { data: userHobbies, error } = await supabase
    .from('user_hobbies')
    .select(
      `
      hobby(
        id,
        name
      )
      `
    )
    .eq('user_id', inputUID);

  if (error) {
    throw error;
  }

  return userHobbies.map(({ hobby }) => {
    return hobby;
  });
};

export const updateUserNowHobby = async (
  uid: UserData['uid'],
  nowHobby: HobbyData
) => {
  await supabase
    .from('user')
    .update({ now_hobby: nowHobby.name })
    .eq('uid', uid)
    .select();
};

export const getSubHobby = async () =>
  await supabase.from('sub_hobby').select('id,info,name');
