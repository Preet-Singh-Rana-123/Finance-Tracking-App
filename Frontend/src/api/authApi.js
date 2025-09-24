import api from "./api";

export const loginApi = ({formData}) => {
  const res = api.post('/auth/login', formData);
  return res;
}

export const registerApi = ({formData}) => {
  const res = api.post('/auth/register', formData);
  return res;
}