import {
  getCommitHistoryRequest,
  pullCommitRequest,
  revertCommitRequest,
} from "../api/commitApi.js";

export const getCommitHistory = async (repositoryId) => {
  const response = await getCommitHistoryRequest(repositoryId);
  return response.data;
};

export const pullCommit = async (repositoryId) => {
  const response = await pullCommitRequest(repositoryId);
  return response;
};

export const revertCommit = async (commitId) => {
  const response = await revertCommitRequest(commitId);
  return response;
};
