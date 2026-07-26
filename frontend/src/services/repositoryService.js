import {
  getRepositoriesRequest,
  getRepositoryRequest,
  createRepositoryRequest,
  updateRepositoryRequest,
  deleteRepositoryRequest,
} from "../api/repositoryApi";

export const getRepositories = async () => {
  const response = await getRepositoriesRequest();
  return response.data;
};

export const getRepository = async (id) => {
  const response = await getRepositoryRequest(id);
  return response.data;
};

export const createRepository = async (data) => {
  const response = await createRepositoryRequest(data);
  return response.data;
};

export const updateRepository = async (id, data) => {
  const response = await updateRepositoryRequest(id, data);
  return response.data;
};

export const deleteRepository = async (id) => {
  const response = await deleteRepositoryRequest(id);
  return response.data;
};
