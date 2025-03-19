export const getAchievementName = (type: string | null): string => {
  switch (type) {
    case 'attendance_days':
      return '연속 출석';
    case 'exp':
      return '경험치';
    case 'completed_challenges':
      return '챌린지 완주';
    default:
      return '';
  }
};

export const getAchievementDescription = (type: string | null): string => {
  switch (type) {
    case 'attendance_days':
      return '7일 연속 출석 시 업적 달성';
    case 'exp':
      return '100exp 획득 시 업적 달성';
    case 'completed_challenges':
      return '챌린지 4개 완주 시 업적 달성';
    default:
      return '';
  }
};

export const getAchievementMaxValue = (type: string | null): number => {
  switch (type) {
    case 'attendance_days':
      return 7;
    case 'exp':
      return 100;
    case 'completed_challenges':
      return 4;
    default:
      return 0;
  }
};

export const calculateAchievement = (type: string, value: number) => {
  const maxValue = getAchievementMaxValue(type);

  const level = Math.floor(value / maxValue + 1);
  const progress =
    value > 0 && value % maxValue == 0 ? maxValue : value % maxValue;

  return {
    level,
    current: progress,
  };
};
