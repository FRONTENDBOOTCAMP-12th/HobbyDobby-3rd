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
  switch (type) {
    case 'attendance_days': {
      const level = Math.floor(value / 7 + 1);
      const progress = value % 7;
      return { level: String(level), current: progress };
    }

    case 'exp': {
      const level = Math.floor(value / 100 + 1);
      const progress = value % 100;
      return { level: String(level), current: progress };
    }

    case 'completed_challenges': {
      const level = Math.floor(value / 4 + 1);
      const progress = value % 4;
      return { level: String(level), current: progress };
    }

    default:
      return { level: '0', current: 0 };
  }
};
