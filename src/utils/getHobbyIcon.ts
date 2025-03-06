// hobby_id에 따른 hobbyIcon을 리턴하는 함수
export const getHobbyIcon = (id: number | null): string | undefined => {
  switch (id) {
    case 1:
      return '/assets/book.svg';
    case 2:
      return '/assets/exercise-running.svg';
    case 3:
      return '/assets/art.svg';
    case 4:
      return '/assets/music.svg';
    case 5:
      return '/assets/travel.svg';
    case 6:
      return '/assets/cooking.svg';
    default:
      return;
  }
};
