// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function () {
    // 初始化所有功能
    initNavigation();
    initMobileMenu();
    initScrollEffects();
    initServiceAnimations();
    initImageZoomFunctionality();
    initContactFeatures();
    initAnimationOnScroll();
    initAnnouncementsHome();
});

// 导航栏功能
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const header = document.getElementById('header');

    // 平滑滚动到对应区块
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }

            // 移动端菜单关闭
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    // 导航栏高亮功能
    function updateActiveNav() {
        const scrollPosition = window.scrollY;
        const headerHeight = header.offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // 滚动事件监听
    window.addEventListener('scroll', function () {
        updateActiveNav();
        updateHeaderStyle();
    });

    // 导航栏样式更新
    function updateHeaderStyle() {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 25px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    }

    // 初始化
    updateActiveNav();
}

// 移动端菜单功能
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function () {
            navMenu.classList.toggle('active');

            // 切换图标
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 点击菜单外部关闭
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.header') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// 滚动效果
function initScrollEffects() {
    // 滚动指示器
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function () {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                const header = document.getElementById('header');
                const headerHeight = header.offsetHeight;
                const targetPosition = aboutSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // 统计数字动画
    function animateNumbers() {
        const statNumbers = document.querySelectorAll('.stat-number');

        statNumbers.forEach(stat => {
            const finalValue = stat.textContent;
            const numericValue = parseInt(finalValue.replace(/\D/g, ''));
            const suffix = finalValue.replace(/\d/g, '');

            let currentValue = 0;
            const increment = numericValue / 50;
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= numericValue) {
                    currentValue = numericValue;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(currentValue) + suffix;
            }, 40);
        });
    }

    // 使用Intersection Observer触发数字动画
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }
}

// 服务卡片动画和图片画廊功能
function initServiceAnimations() {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach((card, index) => {
        // 设置初始状态
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';

        // 添加延迟动画
        setTimeout(() => {
            card.style.transition = 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);

        // 初始化图片画廊功能
        initImageGallery(card);

        // 添加鼠标悬停3D效果
        add3DEffect(card);
    });

    // 初始化图片画廊
    function initImageGallery(card) {
        const mainImage = card.querySelector('.main-image img');
        const indicators = card.querySelectorAll('.indicator');

        if (mainImage && indicators.length > 0) {
            // 图片轮播功能
            let currentIndex = 0;
            const images = Array.from(indicators).map(ind => ind.getAttribute('data-image'));

            // 点击指示器切换图片
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', function () {
                    // 移除所有活动状态
                    indicators.forEach(ind => ind.classList.remove('active'));

                    // 添加当前活动状态
                    this.classList.add('active');

                    // 更换图片
                    switchImage(card, images[index]);
                    currentIndex = index;
                });
            });

            // 自动轮播（可选）
            let autoPlayInterval;
            function startAutoPlay() {
                autoPlayInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % images.length;
                    indicators.forEach(ind => ind.classList.remove('active'));
                    indicators[currentIndex].classList.add('active');
                    switchImage(card, images[currentIndex]);
                }, 5000);
            }

            function stopAutoPlay() {
                clearInterval(autoPlayInterval);
            }

            // 鼠标悬停时停止自动播放
            card.addEventListener('mouseenter', stopAutoPlay);
            card.addEventListener('mouseleave', startAutoPlay);

            // 开始自动播放
            startAutoPlay();
        }
    }

    // 图片切换动画
    function switchImage(card, newImageSrc) {
        const mainImage = card.querySelector('.main-image img');
        const overlayContent = card.querySelector('.overlay-content');

        if (mainImage) {
            // 添加淡出效果
            mainImage.style.transition = 'opacity 0.4s ease';
            mainImage.style.opacity = '0.3';

            setTimeout(() => {
                mainImage.src = newImageSrc;
                mainImage.style.opacity = '1';

                // 添加图片加载完成后的处理
                mainImage.onload = function () {
                    // 可以在这里添加图片加载完成的动画
                };
            }, 400);
        }
    }

    // 3D卡片效果
    function add3DEffect(card) {
        let isMouseOver = false;
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;

        card.addEventListener('mouseenter', function (e) {
            isMouseOver = true;
            const rect = card.getBoundingClientRect();
            mouseX = e.clientX - rect.left - rect.width / 2;
            mouseY = e.clientY - rect.top - rect.height / 2;
        });

        card.addEventListener('mousemove', function (e) {
            if (!isMouseOver) return;

            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = (e.clientX - centerX) / 30;
            const deltaY = (e.clientY - centerY) / 30;

            currentX += (deltaX - currentX) * 0.1;
            currentY += (deltaY - currentY) * 0.1;

            card.style.transform = `perspective(1000px) rotateX(${-currentY}deg) rotateY(${currentX}deg) translateZ(20px)`;
        });

        card.addEventListener('mouseleave', function () {
            isMouseOver = false;
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    }

    // 添加滚动动画效果
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.8s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    serviceCards.forEach(card => {
        observer.observe(card);
    });
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(60px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }

    .service-card {
        animation: slideInUp 0.8s ease forwards;
    }

    .feature-item {
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    }

    .feature-item:hover {
        animation: pulse 0.6s ease;
    }
`;
document.head.appendChild(style);

// 地图功能已移除

// 图片放大功能
let currentImageIndex = 0;
let currentServiceImages = [];
let currentServiceData = {};

// 业务图片信息配置
const serviceImageInfo = {
    consulting: {
        title: '咨询服务',
        description: '专业的安全管理咨询和标准化建设服务，为企业提供全方位的安全解决方案。',
        images: [
            'images/生产标准化建设1.jpg',
            'images/生产标准化建设2.jpg',
            'images/生产标准化建设3.jpg',
            'images/生产标准化建设4.jpg'
        ]
    },
    risk: {
        title: '风险管理',
        description: '全面风险防控解决方案，包括风险辨识、双重预防和应急管理体系建设。',
        images: [
            'images/安全生产风险分级1.jpg',
            'images/安全生产风险分级2.jpg',
            'images/安全生产风险分级3.jpg',
            'images/安全生产风险分级4.jpg'
        ]
    },
    education: {
        title: '教育培训',
        description: '专业的安全教育培训服务，包括线上学习平台和VR安全体验。',
        images: [
            'images/培训现场1.jpg',
            'images/培训现场2.jpg',
            'images/培训现场3.jpg',
            'images/培训现场4.jpg'
        ]
    },
    technology: {
        title: '技术产品',
        description: '创新的安全技术产品和软件开发服务，助力企业数字化转型。',
        images: [
            'images/毛发检测毒品筛查服务1.jpg',
            'images/毛发检测毒品筛查服务2.jpg',
            'images/毛发检测毒品筛查服务3.jpg',
            'images/毛发检测毒品筛查服务4.jpg'
        ]
    }
};

function initImageZoomFunctionality() {
    // 为所有业务图片添加点击事件
    const serviceImages = document.querySelectorAll('.service-card .main-image img');

    serviceImages.forEach(img => {
        img.addEventListener('click', function () {
            const serviceCard = this.closest('.service-card');
            const serviceType = serviceCard.dataset.service;

            if (serviceType && serviceImageInfo[serviceType]) {
                currentServiceData = serviceImageInfo[serviceType];
                currentServiceImages = currentServiceData.images;

                // 找到当前点击的图片索引
                const currentSrc = this.src;
                currentImageIndex = currentServiceImages.findIndex(imgPath =>
                    currentSrc.includes(imgPath.split('/').pop())
                );

                if (currentImageIndex === -1) currentImageIndex = 0;

                openImageModal(currentServiceImages[currentImageIndex]);
            }
        });
    });

    // 为指示器添加点击事件
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach(indicator => {
        indicator.addEventListener('click', function (e) {
            e.stopPropagation();
            const imageSrc = this.dataset.image;
            if (imageSrc) {
                const serviceCard = this.closest('.service-card');
                const serviceType = serviceCard.dataset.service;

                if (serviceType && serviceImageInfo[serviceType]) {
                    currentServiceData = serviceImageInfo[serviceType];
                    currentServiceImages = currentServiceData.images;
                    currentImageIndex = currentServiceImages.findIndex(imgPath =>
                        imageSrc.includes(imgPath.split('/').pop())
                    );

                    if (currentImageIndex === -1) currentImageIndex = 0;

                    openImageModal(imageSrc);
                }
            }
        });
    });
}

function openImageModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalImageTitle');
    const modalDesc = document.getElementById('modalImageDesc');

    modalImage.src = imageSrc;
    modalTitle.textContent = currentServiceData.title;
    modalDesc.textContent = currentServiceData.description;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // 更新按钮状态
    updateModalButtons();
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function showPrevImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        const modalImage = document.getElementById('modalImage');
        modalImage.src = currentServiceImages[currentImageIndex];
        updateModalButtons();
    }
}

function showNextImage() {
    if (currentImageIndex < currentServiceImages.length - 1) {
        currentImageIndex++;
        const modalImage = document.getElementById('modalImage');
        modalImage.src = currentServiceImages[currentImageIndex];
        updateModalButtons();
    }
}

function updateModalButtons() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    prevBtn.disabled = currentImageIndex === 0;
    nextBtn.disabled = currentImageIndex === currentServiceImages.length - 1;
}

// 键盘事件处理
document.addEventListener('keydown', function (e) {
    const modal = document.getElementById('imageModal');
    if (modal.classList.contains('active')) {
        switch (e.key) {
            case 'Escape':
                closeImageModal();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    }
});

// 点击模态框图片关闭
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('modal-image')) {
        closeImageModal();
    }
});

// 联系功能
function initContactFeatures() {
    // 联系方式项悬停效果
    const contactItems = document.querySelectorAll('.contact-item');

    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 复制联系信息功能
    const contactTexts = document.querySelectorAll('.contact-text p');

    contactTexts.forEach(text => {
        if (text.textContent.includes('@') || text.textContent.match(/\d{3,}/)) {
            text.style.cursor = 'pointer';
            text.title = '点击复制';

            text.addEventListener('click', function () {
                const textToCopy = this.textContent.trim();
                navigator.clipboard.writeText(textToCopy).then(() => {
                    // 显示复制成功提示
                    const originalText = this.textContent;
                    this.textContent = '已复制到剪贴板！';
                    this.style.color = '#27ae60';

                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.color = '';
                    }, 2000);
                });
            });
        }
    });
}

// 滚动动画
function initAnimationOnScroll() {
    const animatedElements = document.querySelectorAll('.section-header, .about-content, .service-cards, .contact-content');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
}

// CTA按钮功能
function initCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-button');

    ctaButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const header = document.getElementById('header');
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// 页面加载优化
window.addEventListener('load', function () {
    // 预加载图片
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.complete) {
            img.addEventListener('load', function () {
                this.style.opacity = '1';
            });
        }
    });

    // 初始化CTA按钮
    initCTAButtons();

    // 添加页面加载完成类
    document.body.classList.add('loaded');
});

// 性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 优化的滚动事件处理
const optimizedScroll = debounce(() => {
    // 这里可以添加需要优化的滚动处理逻辑
}, 10);

window.addEventListener('scroll', optimizedScroll);

// 错误处理
function handleError(error) {
    console.error('Website Error:', error);

    // 显示用户友好的错误信息
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #e74c3c;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 9999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    errorDiv.textContent = '页面加载出现问题，请刷新页面重试';
    document.body.appendChild(errorDiv);

    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// 全局错误监听
window.addEventListener('error', handleError);

// 导出函数供全局使用
window.jiasuiWebsite = {
    scrollToSection: function (sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const header = document.getElementById('header');
            const headerHeight = header.offsetHeight;
            const targetPosition = section.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    },

    showNotification: function (message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 9999;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            max-width: 300px;
            word-wrap: break-word;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
};

// 主页公示信息分页配置
let homeAnnouncementsPage = 1;
const homeItemsPerPage = 5;

// 初始化主页公示信息
function initAnnouncementsHome() {
    const listContainer = document.getElementById('announcementsListHome');

    if (!listContainer) {
        console.log('未找到公示信息容器');
        return;
    }

    // 检查是否有公示数据
    if (typeof announcementsData === 'undefined') {
        console.log('公示数据未定义');
        listContainer.innerHTML = '<p class="no-announcements">正在加载公示信息...</p>';
        // 延迟重试
        setTimeout(initAnnouncementsHome, 100);
        return;
    }

    if (!announcementsData.length) {
        console.log('公示数据为空');
        listContainer.innerHTML = '<p class="no-announcements">暂无公示信息</p>';
        return;
    }

    console.log('加载公示信息，共' + announcementsData.length + '条');
    announcementsData.sort((a, b) => b.date.localeCompare(a.date));
    renderAnnouncementsHome();
    renderPaginationHome();
}

// 渲染主页公示信息列表
function renderAnnouncementsHome() {
    const listContainer = document.getElementById('announcementsListHome');

    if (!listContainer) {
        console.error('渲染失败：未找到容器');
        return;
    }

    const startIndex = (homeAnnouncementsPage - 1) * homeItemsPerPage;
    const endIndex = startIndex + homeItemsPerPage;
    const pageData = announcementsData.slice(startIndex, endIndex);

    console.log('渲染第' + homeAnnouncementsPage + '页，共' + pageData.length + '条');

    listContainer.innerHTML = pageData.map(item => `
        <div class="announcement-item-home">
            <span class="announcement-bullet">•</span>
            <a href="announcement-detail.html?id=${item.id}" class="announcement-link-home" target="_blank">
                ${item.title}
            </a>
            <span class="announcement-date-home">${item.date}</span>
        </div>
    `).join('');
}

// 渲染主页分页
function renderPaginationHome() {
    const paginationContainer = document.getElementById('paginationHome');
    const totalPages = Math.ceil(announcementsData.length / homeItemsPerPage);

    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }

    let paginationHTML = '';

    // 上一页按钮
    paginationHTML += `
        <button class="page-btn-home prev-page" ${homeAnnouncementsPage === 1 ? 'disabled' : ''} onclick="changePageHome(${homeAnnouncementsPage - 1})">
            <i class="fas fa-chevron-left"></i>
            上一页
        </button>
    `;

    // 页码按钮
    paginationHTML += '<div class="page-numbers-home">';

    // 始终显示第一页
    paginationHTML += `
        <button class="page-number-home ${homeAnnouncementsPage === 1 ? 'active' : ''}" onclick="changePageHome(1)">1</button>
    `;

    // 显示省略号或中间页码
    if (homeAnnouncementsPage > 3) {
        paginationHTML += '<span class="page-ellipsis-home">...</span>';
    }

    // 显示当前页附近的页码
    for (let i = Math.max(2, homeAnnouncementsPage - 1); i <= Math.min(totalPages - 1, homeAnnouncementsPage + 1); i++) {
        paginationHTML += `
            <button class="page-number-home ${homeAnnouncementsPage === i ? 'active' : ''}" onclick="changePageHome(${i})">${i}</button>
        `;
    }

    // 显示省略号或最后一页
    if (homeAnnouncementsPage < totalPages - 2) {
        paginationHTML += '<span class="page-ellipsis-home">...</span>';
    }

    if (totalPages > 1) {
        paginationHTML += `
            <button class="page-number-home ${homeAnnouncementsPage === totalPages ? 'active' : ''}" onclick="changePageHome(${totalPages})">${totalPages}</button>
        `;
    }

    paginationHTML += '</div>';

    // 下一页按钮
    paginationHTML += `
        <button class="page-btn-home next-page" ${homeAnnouncementsPage === totalPages ? 'disabled' : ''} onclick="changePageHome(${homeAnnouncementsPage + 1})">
            下一页
            <i class="fas fa-chevron-right"></i>
        </button>
    `;

    paginationContainer.innerHTML = paginationHTML;
}

// 切换主页公示信息页码
function changePageHome(page) {
    const totalPages = Math.ceil(announcementsData.length / homeItemsPerPage);
    if (page < 1 || page > totalPages) return;

    homeAnnouncementsPage = page;
    renderAnnouncementsHome();
    renderPaginationHome();

    // 滚动到公示信息section顶部
    const announcementsSection = document.getElementById('announcements');
    if (announcementsSection) {
        const header = document.getElementById('header');
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = announcementsSection.offsetTop - headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

console.log('湖南嘉遂安全科技有限公司网站已加载完成');

// 测试公示数据是否加载
if (typeof announcementsData !== 'undefined') {
    console.log('公示数据已加载，共' + announcementsData.length + '条记录');
} else {
    console.log('警告：公示数据未加载');
}