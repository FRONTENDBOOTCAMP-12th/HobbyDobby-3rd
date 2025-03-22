// 날짜를 받아서 'yyyy년 mm월 dd일' 형식으로 반환하는 함수
export const getDate = (inputDate: string | number) => {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}년 ${month}월 ${day}일`;
};

// 날짜를 받아 현재 날짜에서부터 뺀 일수를 반환하는 함수
export const getDiffDate = (
  startDate: string | number,
  endDate: string | number = Date.now()
) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // 두 날짜의 차이를 계산하여 일수로 반환
  const diffInMilliseconds = end.getTime() - start.getTime();
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 3600 * 24));

  return diffInDays;
};
