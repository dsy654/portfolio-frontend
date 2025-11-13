import axios from 'axios';

const API_URL = 'https://henry-portfolio-blog-api.onrender.com/api/projects';

// 获取所有项目 (公开接口，不需要 token)
export const getProjects = () => {
  return axios.get(API_URL);
};

// 创建一个新项目 (受保护接口，需要 token)
export const createProject = (projectData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.post(API_URL, projectData, config);
};

// 更新一个项目 (受保护接口)
export const updateProject = (id, projectData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.put(`${API_URL}/${id}`, projectData, config);
};

// 删除一个项目 (受保護接口)
export const deleteProject = (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.delete(`${API_URL}/${id}`, config);
};