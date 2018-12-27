const axios = require('axios');

const notesClient = axios.create({ baseURL: 'http://localhost:3000/notes' });

export const get = () => notesClient.get('/').then(({ data }) => data);

export const create = ({ text }) => notesClient.post('/', { text })
  .then(({ data: { id } }) => ({ id }));

export const update = ({ id, text }) => notesClient.put(`/${id}`, { text });

export const remove = ({ id }) => notesClient.delete(`/${id}`);
