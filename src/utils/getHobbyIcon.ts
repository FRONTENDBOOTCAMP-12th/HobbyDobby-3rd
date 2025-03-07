// hobby_id에 따른 hobbyIcon을 리턴하는 함수
export const getHobbyIcon = (id: string | null): string | undefined => {
  switch (id) {
    case '독서':
      return '/assets/book.svg';
    case '운동':
      return '/assets/exercise-running.svg';
    case '미술':
      return '/assets/art.svg';
    case '음악':
      return '/assets/music.svg';
    case '여행':
      return '/assets/travel.svg';
    case '요리':
      return '/assets/cooking.svg';
    default:
      return;
  }
};
