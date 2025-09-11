export const validateHeightAndWeight = (
  height: string,
  weight: string,
): boolean => {
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) return true;
  return false;
};
