import {
  API,
  KEY,
  TYPE,
  ORIENTATION,
  PER_PAGE,
} from 'constants/images-api.constants';

export function fetchImages(searchQuery, page = 1) {
  const params = {
    q: searchQuery,
    page,
    key: KEY,
    image_type: TYPE,
    orientation: ORIENTATION,
    per_page: PER_PAGE,
  };
  const searchAPI = API + '?' + new URLSearchParams(params);

  return fetch(searchAPI).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`No photos for search query: ${searchQuery}`)
    );
  });
}
