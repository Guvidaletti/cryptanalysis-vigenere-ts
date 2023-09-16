const STORAGE_KEY = 'NEXT_KEY';
export const getNextKey = () => {
  const k = localStorage.getItem(STORAGE_KEY) ?? '0';
  const nk = parseInt(k) + 1;
  localStorage.setItem(STORAGE_KEY, String(nk));
  return nk;
};
