import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const signIn = (formData) => API.post("/user/signin", formData);
export const signup = (formData) => API.post("/user/signup", formData);
export const googleSignIn = (result) => API.post("/user/googleSignIn", result);

export const addtour = (tourData) => API.post("/tour", tourData);
export const getTours = (page) => API.get(`/tour?page=${page}`);
export const getTour = (id) => API.get(`/tour/${id}`);
export const deleteTour = (id) => API.delete(`/tour/deleteTour/${id}`);
export const updateTour = (updatedTourData, id) =>
  API.patch(`/tour/updateTour/${id}`, updatedTourData);
export const getToursByUser = (userId) =>
  API.get(`/tour/getToursByUser/${userId}`);

export const searchTours = (searchQuery) =>
  API.get(`/tour/search?searchQuery=${searchQuery}`);
export const toursByTags = (tag) => API.get(`/tour/byTags/${tag}`);

export const getRelatedTour = (tags) => API.post("/tour/getRelatedTours", tags);
export const likeTourApi = (id) => API.patch(`/tour/like/${id}`);
