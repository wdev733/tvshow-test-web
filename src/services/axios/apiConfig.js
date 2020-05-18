import axios from "axios"
import { apiUrl } from 'Constants/defaultValues'

const getClient = () => {
  return axios.create({ baseURL: apiUrl});
};

export { getClient }
