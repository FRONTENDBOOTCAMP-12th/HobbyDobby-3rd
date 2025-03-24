import { ChallengeData, supabase, UserData } from './supabase-client';

/* -------------------------------------------------------------------------- */
/*                                   select                                   */
/* -------------------------------------------------------------------------- */

export const getUserByID = async (inputID: UserData['id']) =>
  await supabase
    .from('user')
    .select(
      `
      uid,image,gem,created_date,exp,id,nickname,password,main_hobby,now_hobby,title,
      item(name,image),
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
    .eq('hobby_name', hobbyName)
    .order('name');

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

export const getChallengeDetail = async (challengeName: string | undefined) => {
  const { data } = await supabase
    .from('challenge')
    .select('created_date,sub_hobby_name,progress')
    .eq('name', challengeName!);

  return data;
};

export const getUnitsBySubHobby = async (subHobby: string) =>
  await supabase.from('unit').select('*').eq('sub_hobby', subHobby);

export const getAchievement = async () => {
  const { data, error } = await supabase.from('achievement').select('*');

  if (error) {
    console.error('Error fetching achievements:', error.message);
    throw error;
  }

  return data;
};

export const getAchievementByLevelType = async (
  level: number,
  type: 'attendance_days' | 'exp' | 'completed_challenges'
) => {
  // 업적 테이블에서 특정 레벨과 유형의 업적 데이터를 가져옴
  const { data, error } = await supabase
    .from('achievement')
    .select('*')
    .eq('type', type);

  if (error) {
    console.error('Error fetching achievement data:', error);
    return null;
  }

  const achievement = data.find(
    (achievement) => achievement.level === level - 1
  );

  return achievement;
};

export const getUserAchievements = async (userId: string) => {
  // 유저 업적 데이터를 가져옴
  const { data, error } = await supabase
    .from('user_achievements')
    .select('achievement_id')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching user achievements:', error.message);
    throw error;
  }

  return data;
};

export const getUserGem = async (userId: string) => {
  // 유저의 보석 데이터를 가져옴
  const { data, error } = await supabase
    .from('user')
    .select('gem')
    .eq('uid', userId);

  if (error) {
    console.error('Error fetching user gem:', error.message);
    throw error;
  }

  return data?.[0].gem;
};

export const getUserItems = async (userId: string) => {
  // 유저의 아이템 데이터를 가져옴
  const { data, error } = await supabase
    .from('user_having_items')
    .select('item(*)')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching user items:', error.message);
    throw error;
  }

  return data;
};

export const getUserTitles = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_having_titles')
    .select('id,title')
    .eq('user_id', userId);

  return { data, error };
};

export const getQuestionByUnit = async (unit: string) => {
  const { data, error } = await supabase
    .from('question')
    .select('*')
    .eq('unit', unit)
    .order('order', { ascending: true })
    .order('id', { ascending: true });

  if (error) {
    console.error('Error fetching question:', error.message);
    throw error;
  }

  return data;
};

export interface Item {
  id: string;
  name: string;
  description?: string;
  price: number;
  image: string;
}

export const fetchItems = async (): Promise<Item[]> => {
  const { data, error } = await supabase.from('item').select('*');

  if (error) {
    console.error('아이템 불러오기 오류:', error);
    throw error;
  }
  if (!data) {
    return [];
  }
  return data as Item[];
};

export const getUserHavingItems = async (userId: string) => {
  const { data } = await supabase
    .from('user_having_items')
    .select('item')
    .eq('user_id', userId);

  const ownedItems = data ? data.map((item) => item.item) : [];

  return ownedItems;
};

export const isChallengeNameDuplicate = async (
  userUid: string,
  challengeName: string
) => {
  const { data: response, error } = await supabase
    .from('user_completed_challenges')
    .select(`challenge(name)`)
    .eq('user_id', userUid);

  if (error) {
    console.log(error);

    return true;
  }

  // 받아온 데이터 배열에서 중복된 챌린지명이 있는지 하나씩 확인
  const isDuplicate = response?.some(
    (challenge) => challenge.challenge.name === challengeName
  );

  return isDuplicate;
};

/* -------------------------------------------------------------------------- */
/*                                   update                                   */
/* -------------------------------------------------------------------------- */

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
        id: string;
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
      now_challenge: nowChallenge?.[0].id,
    })
    .eq('uid', userUid);

  return { error };
};

// 프로필 편집 사항 업데이트
export const updateUserProfile = async (
  uid: UserData['uid'],
  nickname: string,
  image: string | null,
  title: string | null,
  mainHobby: string | null,
  item: string | null
) => {
  const { data, error } = await supabase
    .from('user')
    .update({ nickname, image, title, main_hobby: mainHobby, item: item })
    .eq('uid', uid)
    .select('uid,image,nickname,main_hobby,title,item');
  console.log(data, error);
};

export const updateChallengeProgress = async (
  id: ChallengeData['id'],
  progress: ChallengeData['progress'],
  nowUnit: string
) => {
  // 유저 챌린지 진행상황 업데이트
  const { data, error } = await supabase
    .from('challenge')
    .update({ progress, now_unit: nowUnit })
    .eq('id', id)
    .select(
      `id,name,created_date,completed_date,progress,
      sub_hobby_name(hobby_name,id,info,name),
      now_unit(id,level,name,section,sub_hobby,title)`
    );

  if (error) {
    console.error('Error updating :', error.message);
    throw error;
  }

  return data;
};

// 챌린지 데이터를 완료화 + 완료 테이블에 올리기 + user.now_challenge 삭제
export const endChallenge = async (challengeId: string, uid: string) => {
  const { error: updateError } = await supabase
    .from('challenge')
    .update({ completed_date: new Date().toISOString() })
    .eq('id', challengeId);

  if (updateError) {
    console.error('Error updating :', updateError.message);
    throw updateError;
  }

  const { error: insertError } = await supabase
    .from('user_completed_challenges')
    .insert({
      challenge_id: challengeId,
      user_id: uid,
    });

  if (insertError) {
    console.error('Error inserting :', insertError.message);
    throw insertError;
  }

  const { data, error } = await supabase
    .from('user')
    .update({ now_challenge: null })
    .eq('uid', uid)
    .select('*');

  if (error) {
    console.error('Error updating user data :', error.message);
    throw error;
  }

  return data;
};

export const updateUserGem = async (uid: UserData['uid'], gem: number | null) =>
  // 유저 보석 데이터 업데이트
  await supabase.from('user').update({ gem }).eq('uid', uid).select();

export const updateUserGemAtStore = async (
  userId: string,
  userGem: number,
  itemPrice: number
) => {
  const { data, error } = await supabase
    .from('user')
    .update({
      gem: userGem ? userGem - itemPrice : null,
    })
    .eq('uid', userId)
    .select('gem');

  if (error) {
    console.log(error);
  }

  const gem = data?.[0].gem;
  return gem;
};

/* -------------------------------------------------------------------------- */
/*                                   insert                                   */
/* -------------------------------------------------------------------------- */

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

export const insertUserAchievement = async (
  // 유저 업적 데이터를 저장
  userId: string,
  achievementId: string
) => {
  const { data, error } = await supabase
    .from('user_achievements')
    .insert([
      {
        user_id: userId,
        achievement_id: achievementId,
      },
    ])
    .select(`id,user_id,achievement_id`);

  return { data, error };
};

export const insertUserTitle = async (userId: string, titleName: string) => {
  // 유저 타이틀 데이터를 저장
  const { data, error } = await supabase
    .from('user_having_titles')
    .insert([
      {
        user_id: userId,
        title: titleName,
      },
    ])
    .select(`id,user_id,title`);

  if (error) {
    console.error('Supabase Error:', error.message);
    return { error: error.message };
  }

  return { data };
};

export const updateUserHavingItem = async (
  userId: string,
  itemName: string
) => {
  const { error } = await supabase.from('user_having_items').insert([
    {
      user_id: userId,
      item: itemName,
    },
  ]);

  if (error) {
    console.log(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                                   delete                                   */
/* -------------------------------------------------------------------------- */

export const deleteUserAchievement = async (
  userId: string,
  achievementId: string
) => {
  // 유저 업적 데이터 삭제
  const { data, error } = await supabase
    .from('user_achievements')
    .delete()
    .eq('user_id', userId)
    .eq('achievement_id', achievementId)
    .select(`id,user_id,achievement_id`);

  return { data, error };
};

export const deleteUserTitle = async (userId: string, titleName: string) => {
  // 유저 타이틀 데이터 삭제
  const { data, error } = await supabase
    .from('user_having_titles')
    .delete()
    .eq('user_id', userId)
    .eq('title', titleName)
    .select(`id,user_id,title`);

  return { data, error };
};

// 회원탈퇴
export const deleteUserData = async (userId: string, password: string) => {
  const { data, error } = await supabase
    .from('user')
    .delete()
    .eq('uid', userId)
    .eq('password', password)
    .select();

  console.log(data, error);

  const isSuccess = data?.length === 1 ? true : false;
  return { isSuccess, error };
};

/* -------------------------------------------------------------------------- */
/*                                   upload                                   */
/* -------------------------------------------------------------------------- */

// 스토어에 챌린지 관련 파일 업로드 후 URL 반환
export const uploadChallengeInputFileToStore = async (file: File) => {
  const filePath = `/challenge_file/${Date.now()}_${file.name}`;

  const { error } = await supabase.storage.from('image').upload(filePath, file);

  if (error) {
    console.error('ChallengeInput Upload to Store Error:', error.message);
    throw error;
  } else {
    const { data: urlData } = supabase.storage
      .from('image')
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  }
};
