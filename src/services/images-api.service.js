import {
  API,
  KEY,
  TYPE,
  ORIENTATION,
  PER_PAGE,
} from 'constants/images-api.constants';

import axios from 'axios';

export async function fetchImages(searchQuery, page = 1) {
  const params = {
    q: searchQuery,
    page,
    key: KEY,
    image_type: TYPE,
    orientation: ORIENTATION,
    per_page: PER_PAGE,
  };
  const searchAPI = API + '?' + new URLSearchParams(params);

  try {
    const response = await axios.get(searchAPI);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}
