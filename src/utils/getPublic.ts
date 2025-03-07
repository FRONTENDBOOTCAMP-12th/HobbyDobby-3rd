const { BASE_URL } = import.meta.env;

export const getPublic = (filePath: string) => BASE_URL + filePath;

export const getPublicImage = (filePath: string, imagesDirName = 'assets') => {
  return getPublic(`${imagesDirName}/${filePath}`);
};
