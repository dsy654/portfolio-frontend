import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 我已经将这里换成了你提供的后端 API 地址
const API_URL = 'https://henry-portfolio-blog-api.onrender.com/api'; 

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // 我们将从 '/projects' 这个端点获取数据
        const response = await axios.get(`${API_URL}/projects`);
        setProjects(response.data);
        setError(null);
      } catch (err) {
        setError('无法获取项目数据。请检查 API URL 或服务器状态。');
        console.error('获取项目数据时出错:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>正在加载项目...</div>;
  }

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center', marginTop: '50px' }}>{error}</div>;
  }

  return (
    <div>
      <h1>我的项目</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {projects.length > 0 ? (
          projects.map(project => (
            <div key={project._id} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
              <h3 style={{ marginTop: 0 }}>{project.title}</h3>
              <p>{project.description}</p>
              {project.imageUrl && <img src={project.imageUrl} alt={project.title} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '4px', marginBottom: '15px' }} />}
              <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>
                查看项目
              </a>
            </div>
          ))
        ) : (
          <p>你的作品集里暂时还没有项目。请在后台添加。</p>
        )}
      </div>
    </div>
  );
}

export default ProjectsPage;