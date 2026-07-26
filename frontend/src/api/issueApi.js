import api from "./axios";

// Get all issues of a repository
export const getRepositoryIssuesRequest = (repositoryId) => {
  return api.get(`/issues/${repositoryId}`);
};

// Create Issue
export const createIssueRequest = (data) => {
  return api.post("/issues", data);
};

// Update Issue
export const updateIssueRequest = (issueId, data) => {
  return api.put(`/issues/${issueId}`, data);
};

// Delete Issue
export const deleteIssueRequest = (issueId) => {
  return api.delete(`/issues/${issueId}`);
};
