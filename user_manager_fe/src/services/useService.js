import api from "./api";

const getListUsers = () => api.get(api.url.Users).then((res) => res.data);

const getIdUsers = (id) =>
  api.get(`${api.url.Users}/${id}`).then((res) => res.data);
const createUsers = (data) =>
  api.post(api.url.Users, data).then((res) => res.data);
const updateUsers = (id, data) =>
  api.put(`${api.url.Users}/${id}`, data).then((res) => res.data);
const deleteUsers = (id) =>
  api.delete(`${api.url.Users}/${id}`).then((res) => res.data);
const usersService = {
  getListUsers,
  getIdUsers,
  createUsers,
  updateUsers,
  deleteUsers,
};
export default usersService;
