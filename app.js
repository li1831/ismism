document.addEventListener('DOMContentLoaded', () => {
  const contentEl = document.getElementById('content');
  const navLinks = document.querySelectorAll('#nav-menu a');

  function loadPage(fileName) {
    if (!fileName) fileName = '导言.html';

    // 更新 active 状态
    navLinks.forEach(link => {
      link.classList.toggle('active', link.textContent === fileName.replace('.html', ''));
    });

    // 加载文章
    fetch(`content/${fileName}`)
      .then(response => {
        if (!response.ok) throw new Error('文章未找到');
        return response.text();
      })
      .then(html => {
        contentEl.innerHTML = html;
        document.title = fileName.replace('.html', '') + ' - 主义主义';
      })
      .catch(err => {
        contentEl.innerHTML = `<p style="color: red;">❌ ${err.message}：${fileName}</p>`;
      });
  }

  // 绑定点击事件
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const fileName = link.textContent + '.html';
      window.location.hash = fileName;
      loadPage(fileName);
    });
  });

  // 支持浏览器前进/后退
  window.addEventListener('hashchange', () => {
    const fileName = window.location.hash.substring(1);
    loadPage(fileName);
  });

  // 初始加载
  const initialFile = window.location.hash.substring(1) || '导言.html';
  loadPage(initialFile);
});