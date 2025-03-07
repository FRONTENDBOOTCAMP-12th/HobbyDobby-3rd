// subhobby_name에 따른 hobbyIcon을 리턴하는 함수
export const getSubHobbyIcon = (name: string | null): string | undefined => {
  switch (name) {
    case '문학':
      return '/assets/literature.svg';
    case '비문학':
      return '/assets/non-literature.svg';
    default:
      return;
  }
};
