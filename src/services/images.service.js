export const API = 'https://pixabay.com/api/';
export const KEY = '13063741-5515a23bced967f7d7ac2fd10';
export const TYPE = 'photo';
export const ORIENTATION = 'horizontal';
export const PER_PAGE = 12;

export const searchAPI = (searchQuery, page) => {
  const params = {
    q: searchQuery,
    page,
    key: KEY,
    image_type: TYPE,
    orientation: ORIENTATION,
    per_page: PER_PAGE,
  };
  return API + '?' + new URLSearchParams(params);
};
