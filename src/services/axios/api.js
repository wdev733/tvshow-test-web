import { getClient } from "./apiConfig";

/* tv shows */
const searchAPI = (query) => {
  return query === ""
    ? getClient().get(`/shows`)
    : getClient().get(`/search/shows?q=${query}`);
};

const getShowAPI = (id) => {
  return getClient().get(`/shows/${id}`);
};

const getCastAPI = (id) => {
  return getClient().get(`/shows/${id}/cast`);
};

const getCrewAPI = (id) => {
  return getClient().get(`/shows/${id}/crew`);
};

export { searchAPI, getShowAPI, getCastAPI, getCrewAPI };
