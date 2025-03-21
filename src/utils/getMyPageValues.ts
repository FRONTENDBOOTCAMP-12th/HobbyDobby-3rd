export const calculateAchievement = (id: number, daysSinceJoin: number) => {
  switch (id) {
    case 1: {
      // 연속 출석 업적 (7일 단위)
      const level = Math.floor(daysSinceJoin / 7 + 1);
      console.log('level', level);
      const progress = daysSinceJoin % 7;
      return { level: String(level), current: progress };
    }

    default:
      return { level: '0', current: 0 };
  }
};

// export const getUserStats =
