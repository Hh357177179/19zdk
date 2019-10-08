import api from '../axios'


export const fishList = params => api.post('/project/pondList', params);