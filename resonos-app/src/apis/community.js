import api from './api';

export const getIndex = async () => {
  return api.get('/community/')
}