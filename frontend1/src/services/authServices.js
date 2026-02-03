import api from '../api/axios.js';

export const loginUser = async (formData) => {
   return api.post("/api/users/login", formData);
}

export const signupUser = async (formData) => {
   return api.post("/api/users/signup", formData);
}