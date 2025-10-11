// 简化的语言切换器
(function() {
    // 获取当前语言
    const currentLang = localStorage.getItem('language') || 'en';
    
    // 设置HTML lang属性
    document.documentElement.lang = currentLang;
    
    // 监听语言选择器变化
    document.addEventListener('DOMContentLoaded', function() {
        const langSelect = document.querySelector('select[onchange*="changeLanguage"]');
        if (langSelect) {
            langSelect.value = currentLang;
            
            // 移除旧的onchange
            langSelect.removeAttribute('onchange');
            
            // 添加新的事件监听
            langSelect.addEventListener('change', function(e) {
                const newLang = e.target.value;
                localStorage.setItem('language', newLang);
                
                // 显示切换提示
                alert('Language switching feature is under development. Currently showing English version only.\n\n语言切换功能正在开发中。目前仅显示英文版本。');
                
                // 未来可以重定向到对应语言版本
                // if (newLang === 'zh') {
                //     window.location.href = 'index-zh.html';
                // } else {
                //     window.location.href = 'index.html';
                // }
            });
        }
    });
})();
