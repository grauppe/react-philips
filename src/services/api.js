import axios from 'axios';

const api = axios.create({ baseURL: 'https://api.themoviedb.org/3/'});
//const api = axios.create({ baseURL: 'https://api.themoviedb.org/4/'});

export default api;