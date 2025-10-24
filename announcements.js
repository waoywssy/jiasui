// 分页配置
const itemsPerPage = 10;
let currentPage = 1;
let filteredData = [...announcementsData];

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('announcementsList')) {
        initAnnouncementsPage();
    }
});

// 初始化公示信息页面
function initAnnouncementsPage() {
    renderAnnouncementsList();
    renderPagination();
}

// 渲染公示信息列表
function renderAnnouncementsList() {
    const listContainer = document.getElementById('announcementsList');
    
    if (filteredData.length === 0) {
        listContainer.innerHTML = `
            <div class="no-results">
                <p>暂无公示信息</p>
            </div>
        `;
        return;
    }
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredData.slice(startIndex, endIndex);
    
    listContainer.innerHTML = pageData.map(item => `
        <div class="announcement-item" onclick="goToDetail(${item.id})">
            <span class="announcement-bullet">•</span>
            <a href="announcement-detail.html?id=${item.id}" class="announcement-link">
                ${item.title}
            </a>
        </div>
    `).join('');
}

// 渲染分页
function renderPagination() {
    const paginationContainer = document.getElementById('pagination');
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // 上一页按钮
    paginationHTML += `
        <button class="page-btn prev-page" ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})">
            <i class="fas fa-chevron-left"></i>
            上一页
        </button>
    `;
    
    // 页码按钮
    paginationHTML += '<div class="page-numbers">';
    
    // 始终显示第一页
    paginationHTML += `
        <button class="page-number ${currentPage === 1 ? 'active' : ''}" onclick="changePage(1)">1</button>
    `;
    
    // 显示省略号或中间页码
    if (currentPage > 3) {
        paginationHTML += '<span class="page-ellipsis">...</span>';
    }
    
    // 显示当前页附近的页码
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        paginationHTML += `
            <button class="page-number ${currentPage === i ? 'active' : ''}" onclick="changePage(${i})">${i}</button>
        `;
    }
    
    // 显示省略号或最后一页
    if (currentPage < totalPages - 2) {
        paginationHTML += '<span class="page-ellipsis">...</span>';
    }
    
    if (totalPages > 1) {
        paginationHTML += `
            <button class="page-number ${currentPage === totalPages ? 'active' : ''}" onclick="changePage(${totalPages})">${totalPages}</button>
        `;
    }
    
    paginationHTML += '</div>';
    
    // 下一页按钮
    paginationHTML += `
        <button class="page-btn next-page" ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">
            下一页
            <i class="fas fa-chevron-right"></i>
        </button>
    `;
    
    paginationContainer.innerHTML = paginationHTML;
}

// 切换页码
function changePage(page) {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    renderAnnouncementsList();
    renderPagination();
    
    // 滚动到列表顶部
    document.querySelector('.announcements-section').scrollIntoView({ behavior: 'smooth' });
}

// 跳转到详情页
function goToDetail(id) {
    window.location.href = `announcement-detail.html?id=${id}`;
}
