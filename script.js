const container = document.getElementById('scroller-container');
let scrollX = 0; let scrollY = 0; 

let verticalItems = document.querySelectorAll('.vertical-item');
let totalVerticalHeight = 0;
let totalScrollableHeight = 0;
let maxVerticalScroll = 0;
let isMobile = window.innerWidth <= 1024;

function recalculateMetrics() {
    isMobile = window.innerWidth <= 1024;
    
    // MOBILE: Reset hoàn toàn về mặc định, không tính toán
    if (isMobile) {
        container.style.transform = 'none';
        document.body.style.overflowY = 'auto'; // Cho phép cuộn body
        return;
    }

    // DESKTOP: Tính toán cuộn ảo
    document.body.style.overflowY = 'hidden'; // Khóa cuộn body
    totalVerticalHeight = 0;
    verticalItems.forEach(item => {
        totalVerticalHeight += item.offsetHeight;
    });
    totalScrollableHeight = totalVerticalHeight + window.innerHeight;
    maxVerticalScroll = totalScrollableHeight - window.innerHeight;
}

recalculateMetrics();

window.addEventListener('resize', () => {
    recalculateMetrics();
});

// LẮNG NGHE SỰ KIỆN CUỘN
window.addEventListener('wheel', (evt) => {
    // 1. Cho phép ZOOM (Ctrl + Lăn chuột hoặc Pinch Touchpad)
    if (evt.ctrlKey || evt.metaKey) {
        return; // Trả về quyền điều khiển cho trình duyệt để Zoom
    }

    // 2. NẾU LÀ MOBILE: Return ngay lập tức để dùng native scroll
    if (isMobile) return;

    // 3. DESKTOP: Chặn cuộn mặc định và chạy logic JS
    evt.preventDefault();

    // Logic cuộn ngang sang dọc
    if (scrollX < window.innerWidth && evt.deltaY > 0 && scrollY <= 0) {
        scrollX += evt.deltaY * 2.5;
        if(scrollX > window.innerWidth) scrollX = window.innerWidth;
        
    } else if (scrollX > 0 && evt.deltaY < 0 && scrollY <= 0) {
        scrollX += evt.deltaY * 2.5;
        if(scrollX < 0) scrollX = 0;
        
    } else {
        scrollY += evt.deltaY * 2.5;
        if(scrollY < 0) scrollY = 0;
        if(scrollY > maxVerticalScroll) scrollY = maxVerticalScroll;
    }

    container.style.transform = `translate3d(${-scrollX}px, ${-scrollY}px, 0)`;
}, { passive: false });