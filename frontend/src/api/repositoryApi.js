import api from "./axios";

// Get all repositories of logged-in user
export const getRepositoriesRequest = () => {
  return api.get("/repositories");
};

// Get one repository
export const getRepositoryRequest = (id) => {
  return api.get(`/repositories/${id}`);
};

// Create repository
export const createRepositoryRequest = (data) => {
  return api.post("/repositories", data);
};

// Update repository
export const updateRepositoryRequest = (id, data) => {
  return api.put(`/repositories/${id}`, data);
};

// Delete repository
export const deleteRepositoryRequest = (id) => {
  return api.delete(`/repositories/${id}`);
};
