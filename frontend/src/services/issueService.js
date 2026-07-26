import {
  getRepositoryIssuesRequest,
  createIssueRequest,
  updateIssueRequest,
  deleteIssueRequest,
} from "../api/issueApi";

export const getRepositoryIssues = async (repositoryId) => {
  const response = await getRepositoryIssuesRequest(repositoryId);
  return response.data;
};

export const createIssue = async (data) => {
  const response = await createIssueRequest(data);
  return response.data;
};

export const updateIssue = async (issueId, data) => {
  const response = await updateIssueRequest(issueId, data);
  return response.data;
};

export const deleteIssue = async (issueId) => {
  const response = await deleteIssueRequest(issueId);
  return response.data;
};
