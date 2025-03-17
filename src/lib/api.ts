import { supabase, UserData } from './supabase-client';

// select

export const getUserByID = async (inputID: UserData['id']) =>
  await supabase
    .from('user')
    .select(
      `
      uid,image,gem,created_date,exp,id,nickname,password,main_hobby,now_hobby,item,title,
      now_challenge(id,name,created_date,completed_date,progress,sub_hobby_name(*),now_unit(
        *
      ))
    `
    )
    .eq('id', inputID);

export const getUserHobbiesByUID = async (inputUID: UserData['uid']) => {
  const { data: userHobbies, error } = await supabase
    .from('user_hobbies')
    .select(
      `
      hobby(
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

export const getHobby = async () => await supabase.from('hobby').select('*');

export const getSubHobby = async (hobbyName: string) =>
  await supabase
    .from('sub_hobby')
    .select('id,info,name')
    .eq('hobby_name', hobbyName);

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

export const getUnitsBySubHobby = async (subHobby: string) =>
  await supabase.from('unit').select('*').eq('sub_hobby', subHobby);

// update

export const updateUserNowHobby = async (
  uid: UserData['uid'],
  nowHobby: string
) =>
  await supabase
    .from('user')
    .update({ now_hobby: nowHobby })
    .eq('uid', uid)
    .select();

export const updateUserNowChallenge = async (
  nowChallenge:
    | {
        name: string;
      }[]
    | null,
  nowHobby: string,
  userUid: string
) => {
  // user now_challenge, now_hobby 업데이트
  const { error } = await supabase
    .from('user')
    .update({
      now_hobby: nowHobby,
      now_challenge: nowChallenge?.[0].name,
    })
    .eq('uid', userUid);

  return { error };
};

// insert

export const createUserAccount = async ({
  id,
  nickname,
  password,
}: {
  id: string;
  nickname: string;
  password: string;
}) => await supabase.from('user').insert({ id, nickname, password }).select();

export const insertChallenge = async (
  challengeName: string,
  subhobby: string
) => {
  // challenge table에 데이터 저장
  const { data, error } = await supabase.from('challenge').insert([
    {
      name: challengeName,
      sub_hobby_name: subhobby,
      now_unit: `${subhobby} 유닛 1-1`,
    },
  ])
    .select(`id,name,created_date,completed_date,progress,sub_hobby_name(*),now_unit(
        *
      )`);

  return { data, error };
};

export const getAchievementsByTypeName = async (
  type: 'attendance_days' | 'exp' | 'completed_challenges'
) => await supabase.from('achievement').select('*').eq('type', type);

export const getAchievement = async () => {
  const { data, error } = await supabase.from('achievement').select('*');

  if (error) {
    console.error('Error fetching achievements:', error.message);
    throw error;
  }

  return data;
};
