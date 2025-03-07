import { HobbyData, supabase, UserData } from './supabase-client';

export const getUserByID = async (inputID: UserData['id']) =>
  await supabase
    .from('user')
    .select(
      `
      *,
      now_hobby(*)
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

  return userHobbies.map((item) => ({
    id: item.hobby.id,
    name: item.hobby.name,
  }));
};

export const updateUserNowHobby = async (
  uid: UserData['uid'],
  nowHobby: HobbyData
) => {
  await supabase
    .from('user')
    .update({ now_hobby: nowHobby.id })
    .eq('uid', uid)
    .select();
};

export const createUserAccount = async (inputData: UserData) =>
  await supabase.from('user').insert([inputData]).select();
