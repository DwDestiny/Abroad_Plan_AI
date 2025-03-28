// 操作引导提示功能实现
document.addEventListener('DOMContentLoaded', function() {
    // 引入intro.js库
    loadIntroJS();
    
    // 添加启动引导的按钮
    addGuideButton();
    
    // 自动触发引导提示（延迟1秒执行，确保页面元素已完全加载）
    setTimeout(function() {
        // 检查是否是首次访问
        if (!localStorage.getItem('guideSeen')) {
            startGuide();
            // 标记已经看过引导
            localStorage.setItem('guideSeen', 'true');
        }
    }, 1000);
});

// 加载intro.js库
function loadIntroJS() {
    // 加载CSS
    const introCss = document.createElement('link');
    introCss.rel = 'stylesheet';
    introCss.href = 'https://cdnjs.cloudflare.com/ajax/libs/intro.js/7.2.0/introjs.min.css';
    document.head.appendChild(introCss);
    
    // 加载自定义样式
    const customCss = document.createElement('style');
    customCss.textContent = `
        /* Apple Design 风格的引导样式 */
        .introjs-tooltip {
            background-color: rgba(255, 255, 255, 0.95) !important;
            border-radius: 12px !important;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12) !important;
            padding: 16px !important;
            max-width: 320px !important;
            backdrop-filter: blur(10px) !important;
            border: 1px solid rgba(0, 0, 0, 0.05) !important;
        }
        
        .introjs-tooltiptext {
            color: #333 !important;
            font-size: 14px !important;
            line-height: 1.5 !important;
            font-weight: 400 !important;
        }
        
        .introjs-button {
            background: #0071e3 !important;
            color: white !important;
            border: none !important;
            border-radius: 20px !important;
            padding: 8px 16px !important;
            font-size: 13px !important;
            font-weight: 500 !important;
            text-shadow: none !important;
            box-shadow: none !important;
            transition: all 0.2s ease !important;
        }
        
        .introjs-button:hover {
            background: #0077ed !important;
            color: white !important;
        }
        
        .introjs-skipbutton {
            color: #0071e3 !important;
            background: transparent !important;
        }
        
        .introjs-bullets ul li a {
            background: #d1d1d6 !important;
            width: 8px !important;
            height: 8px !important;
        }
        
        .introjs-bullets ul li a.active {
            background: #0071e3 !important;
        }
        
        .introjs-progress {
            background-color: #f2f2f7 !important;
        }
        
        .introjs-progressbar {
            background-color: #0071e3 !important;
        }
        
        .introjs-arrow {
            border-color: rgba(255, 255, 255, 0.95) !important;
        }
    `;
    document.head.appendChild(customCss);
    
    // 加载JS
    const introJs = document.createElement('script');
    introJs.src = 'https://cdnjs.cloudflare.com/ajax/libs/intro.js/7.2.0/intro.min.js';
    introJs.onload = function() {
        console.log('Intro.js loaded successfully');
    };
    document.head.appendChild(introJs);
}

// 添加启动引导的按钮
function addGuideButton() {
    const tabActions = document.querySelector('.tab-actions');
    if (tabActions) {
        const guideButton = document.createElement('div');
        guideButton.className = 'action-btn icon-only guide-btn';
        guideButton.innerHTML = '<i class="fas fa-lightbulb action-btn-icon" style="color: #FFCC00;"></i><span class="tooltip">功能引导</span>';
        guideButton.addEventListener('click', startGuide);
        
        // 添加自定义样式
        const btnStyle = document.createElement('style');
        btnStyle.textContent = `
            .guide-btn {
                position: relative;
                overflow: hidden;
            }
            
            .guide-btn:after {
                content: '';
                position: absolute;
                top: -10px;
                right: -10px;
                width: 20px;
                height: 20px;
                background-color: #FFCC00;
                border-radius: 50%;
                opacity: 0;
                transform: scale(0);
                transition: transform 0.3s ease, opacity 0.3s ease;
            }
            
            .guide-btn:hover:after {
                opacity: 0.2;
                transform: scale(3);
            }
        `;
        document.head.appendChild(btnStyle);
        
        tabActions.appendChild(guideButton);
    }
}

// 启动引导
function startGuide() {
    // 确保intro.js已加载
    if (typeof introJs === 'undefined') {
        setTimeout(startGuide, 500);
        return;
    }
    
    // 创建引导实例
    const intro = introJs();
    
    // 设置引导步骤
    intro.setOptions({
        steps: [
            {
                element: document.querySelector('.school-actions'),
                intro: '<div style="text-align:left;line-height:1.6">方案功能区：<br><br>1. <b>同步到定校</b>：将方案一键同步至确认定校<br>2. <b>方案锁定</b>：重新推荐方案时，锁定的方案将不再刷新<br>3. <b>更多</b>：复制方案、查看申请材料、删除方案<br>4. <b>展开/收起</b>：点击可展开或收起方案卡片</div>',
                position: 'bottom'
            },
            {
                element: document.querySelector('.action-btn:has(i.fa-sync)'),
                intro: '点此按钮更改您的需求信息，即可触发AI重新推荐方案，获取更多符合您需求的留学方案。',
                position: 'bottom'
            },
            {
                element: document.querySelector('.form-input'),
                intro: '点击字段，即可对字段内容进行编辑；',
                position: 'left'
            }
        ],
        nextLabel: '下一步',
        prevLabel: '上一步',
        skipLabel: '跳过',
        doneLabel: '完成',
        showBullets: true,
        showProgress: true,
        exitOnOverlayClick: false,
        disableInteraction: false,
        tooltipClass: 'apple-style-tooltip'
    });
    
    // 开始引导
    intro.start();
}