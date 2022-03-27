type GetUrlParam = (name: string) => string | null;
export const getUrlParam: GetUrlParam = (name) => {
  const urlParams = new URLSearchParams(location.search);
  return urlParams.get(name);
};
