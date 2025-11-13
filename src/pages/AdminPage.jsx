import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getProjects, createProject, updateProject, deleteProject } from '../services/projectService';

function AdminPage() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // --- 表单状态 ---
  const [isEditing, setIsEditing] = useState(false); 
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    imageUrl: ''
  });

  const { token } = useContext(AuthContext);

  // 获取项目列表
  const fetchProjects = async () => {
    try {
      const response = await getProjects();
      setProjects(response.data);
    } catch (err) {
      setError('无法加载项目列表');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);
  
  // --- 表单处理 ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const resetForm = () => {
    setIsEditing(false);
    setCurrentProjectId(null);
    setFormData({ title: '', description: '', link: '', imageUrl: '' });
  };
  
  // --- CRUD 操作 ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError('认证失败，请重新登录');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      if (isEditing) {
        await updateProject(currentProjectId, formData, token);
      } else {
        await createProject(formData, token);
      }
      resetForm();
      await fetchProjects();
    } catch (err) {
      setError(err.response?.data?.message || (isEditing ? '更新项目失败' : '创建项目失败'));
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setIsEditing(true);
    setCurrentProjectId(project._id);
    setFormData({
      title: project.title,
      description: project.description,
      link: project.link,
      imageUrl: project.imageUrl || ''
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('你确定要删除这个项目吗？此操作不可撤销。')) {
      try {
        await deleteProject(id, token);
        await fetchProjects();
      } catch (err) {
        setError(err.response?.data?.message || '删除项目失败');
      }
    }
  };

  return (
    <div>
      <h1>后台管理面板 - 项目管理</h1>
      
      {/* 创建/编辑 表单 */}
      <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '30px' }}>
        <h2>{isEditing ? '编辑项目' : '创建新项目'}</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="标题" value={formData.title} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
          <textarea name="description" placeholder="描述" value={formData.description} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', minHeight: '80px', marginBottom: '10px' }} />
          <input type="url" name="link" placeholder="项目链接 (URL)" value={formData.link} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
          <input type="url" name="imageUrl" placeholder="图片链接 (URL, 可选)" value={formData.imageUrl} onChange={handleInputChange} style={{ width: '100%', padding: '8px', marginBottom: '15px' }} />
          
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" disabled={loading} style={{ padding: '10px 20px' }}>
            {loading ? '保存中...' : (isEditing ? '更新项目' : '创建项目')}
          </button>
          {isEditing && <button type="button" onClick={resetForm} style={{ marginLeft: '10px' }}>取消编辑</button>}
        </form>
      </div>

      {/* 项目列表 */}
      <div>
        <h2>现有项目列表</h2>
        {projects.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {projects.map(project => (
              <li key={project._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #eee' }}>
                <span>{project.title}</span>
                <div>
                  <button onClick={() => handleEdit(project)} style={{ marginLeft: '10px' }}>编辑</button>
                  <button onClick={() => handleDelete(project._id)} style={{ marginLeft: '10px', background: '#dc3545', color: 'white' }}>删除</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>当前没有项目。</p>
        )}
      </div>
    </div>
  );
}

export default AdminPage;