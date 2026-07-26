import api from "./axios";

// Get commit history
export const getCommitHistoryRequest = (repositoryId) => {
  return api.get(`/commits/log/${repositoryId}`);
};

// Pull latest commit
export const pullCommitRequest = (repositoryId) => {
  return api.get(`/commits/pull/${repositoryId}`, {
    responseType: "blob",
  });
};

// Revert to a commit
export const revertCommitRequest = (commitId) => {
  return api.get(`/commits/revert/${commitId}`, {
    responseType: "blob",
  });
};
