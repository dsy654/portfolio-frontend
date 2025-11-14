import React from 'react';
import './HomePage.css'; // 引入样式文件

function HomePage() {
  return (
    <div className="homepage-container">
      {/* 原始的标题部分 */}
      <div className="intro-header">
        <h1>主页</h1>
        <p>This is the homepage of my personal portfolio website </p>
      </div>

      {/* 新增的个人介绍部分 */}
      <div className="about-section">
        
        {/* 左侧头像 */}
        <div className="about-left">
          {/* 确保图片路径和 public 文件夹中的文件名一致 */}
          <img src="/avatar.jpg" alt="个人头像" className="avatar-image" />
        </div>

        {/* 右侧详细介绍 */}
        <div className="about-right">
          <h2>About Me</h2>
          <ul>
            <li>Proficient in database</li>
            <li>Interested in machine learning</li>
            <li>With a foundation in web programming</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default HomePage;
