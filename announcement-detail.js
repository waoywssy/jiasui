// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('announcementDetail')) {
        initDetailPage();
    }
});

// 初始化详情页
function initDetailPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const announcementId = parseInt(urlParams.get('id'));
    
    if (!announcementId) {
        showError('未找到公示信息');
        return;
    }
    
    const announcement = announcementsData.find(item => item.id === announcementId);
    
    if (!announcement) {
        showError('公示信息不存在');
        return;
    }
    
    // 渲染详情
    renderDetail(announcement);
}

// 渲染详情
function renderDetail(announcement) {
    // 更新面包屑
    document.getElementById('breadcrumbTitle').textContent = announcement.title;
    
    // 更新分类标签
    const categoryBadge = document.getElementById('categoryBadge');
    categoryBadge.textContent = announcement.categoryName;
    categoryBadge.className = `category-badge ${announcement.category}`;
    
    // 更新标题
    document.getElementById('detailTitle').textContent = announcement.title;
    
    // 更新元信息
    document.getElementById('detailDate').textContent = announcement.date;
    document.getElementById('detailAuthor').textContent = announcement.author;
    
    // 更新内容
    document.getElementById('detailContent').innerHTML = announcement.content;
    
    // 渲染附件（如果有）
    if (announcement.attachments && announcement.attachments.length > 0) {
        renderAttachments(announcement.attachments);
    } else {
        document.getElementById('detailAttachments').style.display = 'none';
    }
}

// 渲染附件
function renderAttachments(attachments) {
    const attachmentsContainer = document.getElementById('detailAttachments');
    
    attachmentsContainer.style.display = 'block';
    attachmentsContainer.innerHTML = `
        <h3 class="attachments-title">
            <i class="fas fa-paperclip"></i>
            附件下载
        </h3>
        <div class="attachments-list">
            ${attachments.map(file => `
                <div class="attachment-item">
                    <div class="attachment-icon">
                        <i class="fas ${file.icon}"></i>
                    </div>
                    <div class="attachment-info">
                        <div class="attachment-name">${file.name}</div>
                        <div class="attachment-size">${file.size}</div>
                    </div>
                    <button class="download-btn" onclick="downloadFile('${file.name}')">
                        <i class="fas fa-download"></i>
                        下载
                    </button>
                </div>
            `).join('')}
        </div>
    `;
}

// 显示错误信息
function showError(message) {
    const detailContainer = document.getElementById('announcementDetail');
    detailContainer.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-circle"></i>
            <h2>${message}</h2>
            <button class="back-btn" onclick="window.location.href='announcements.html'">
                <i class="fas fa-arrow-left"></i>
                返回列表
            </button>
        </div>
    `;
}

// 下载文件
function downloadFile(filename) {
    alert(`下载文件：${filename}\n\n此功能需要连接到实际的文件服务器。`);
}
