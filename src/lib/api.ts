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
) =>
  await supabase
    .from('user')
    .update({ now_hobby: nowHobby.name })
    .eq('uid', uid)
    .select();

export const createUserAccount = async ({
  id,
  nickname,
  password,
}: {
  id: string;
  nickname: string;
  password: string;
}) => await supabase.from('user').insert({ id, nickname, password }).select();

export const getHobby = async () => await supabase.from('hobby').select('*');

export const getSubHobby = async (hobbyId: string) =>
  await supabase
    .from('sub_hobby')
    .select('id,info,name')
    .eq('hobby_id', hobbyId);

export const isUserInputDuplicate = async (
  inputName: string,
  inputData: string
) => {
  const { data: response } = await supabase
    .from('user')
    .select(inputName)
    .eq(inputName, inputData);

  if (response?.length === 0) return false;

  return true;
};

export const getUserCompletedChallenge = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_completed_challenges')
    .select(`challenge(name,created_date,completed_date)`)
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching completed challenges:', error.message);
    throw error;
  }

  return data;
};

export const getUserRank = async () => {
  const { data } = await supabase
    .from('user')
    .select('uid, nickname,image,title,exp');

  // exp의 값을 비교하여 큰 값부터 내림차순으로 재정렬
  const sortedData = data?.sort((a, b) => b.exp! - a.exp!);

  return sortedData;
};
