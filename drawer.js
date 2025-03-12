// 抽屉组件功能实现
document.addEventListener('DOMContentLoaded', function() {
    // 初始化抽屉组件
    initDrawer();
    
    // 绑定重新推荐方案按钮点击事件
    const recommendBtn = document.querySelector('.action-btn:has(i.fa-sync)');
    if (recommendBtn) {
        recommendBtn.addEventListener('click', function() {
            openDrawer('recommend');
        });
    }
}); // 添加缺失的闭合花括号

// 初始化抽屉组件
function initDrawer() {
    // 创建抽屉背景
    const backdrop = document.createElement('div');
    backdrop.className = 'drawer-backdrop';
    document.body.appendChild(backdrop);
    
    // 创建抽屉容器
    const drawerContainer = document.createElement('div');
    drawerContainer.className = 'drawer-container';
    document.body.appendChild(drawerContainer);
    
    // 点击背景关闭抽屉
    backdrop.addEventListener('click', closeDrawer);
    
    // 创建加载动画
    createLoadingOverlay();
}

// 创建加载动画
function createLoadingOverlay() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    
    const loadingContent = document.createElement('div');
    loadingContent.className = 'loading-content';
    
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    
    const loadingText = document.createElement('div');
    loadingText.className = 'loading-text';
    loadingText.textContent = '正在为您重新推荐方案...';
    
    loadingContent.appendChild(spinner);
    loadingContent.appendChild(loadingText);
    loadingOverlay.appendChild(loadingContent);
    
    document.body.appendChild(loadingOverlay);
}

// 打开抽屉
function openDrawer(type) {
    const backdrop = document.querySelector('.drawer-backdrop');
    const drawerContainer = document.querySelector('.drawer-container');
    
    // 清空抽屉内容
    drawerContainer.innerHTML = '';
    
    // 创建抽屉头部
    const drawerHeader = document.createElement('div');
    drawerHeader.className = 'drawer-header';
    
    const drawerTitle = document.createElement('div');
    drawerTitle.className = 'drawer-title';
    drawerTitle.textContent = '重新推荐方案';
    
    const drawerClose = document.createElement('div');
    drawerClose.className = 'drawer-close';
    drawerClose.innerHTML = '<i class="fas fa-times"></i>';
    drawerClose.addEventListener('click', closeDrawer);
    
    drawerHeader.appendChild(drawerTitle);
    drawerHeader.appendChild(drawerClose);
    
    // 创建抽屉主体
    const drawerBody = document.createElement('div');
    drawerBody.className = 'drawer-body';

    
    // 添加意向信息部分
    const intentionSection = document.createElement('div');
    intentionSection.className = 'drawer-form-section';
    
    const intentionTitle = document.createElement('div');
    intentionTitle.className = 'drawer-form-title';
    intentionTitle.textContent = '意向信息';
    
    intentionSection.appendChild(intentionTitle);
    
    // 添加意向信息表单
    const intentionForm = createIntentionForm();
    intentionSection.appendChild(intentionForm);
    
    drawerBody.appendChild(intentionSection);
    // 添加教育背景/经历部分
    const educationSection = document.createElement('div');
    educationSection.className = 'drawer-form-section';
    
    const educationTitle = document.createElement('div');
    educationTitle.className = 'drawer-form-title';
    educationTitle.innerHTML = '教育背景/经历 <div class="drawer-form-title-action" id="add-education"><i class="fas fa-plus"></i> 添加</div>';
    
    educationSection.appendChild(educationTitle);
    
    // 添加默认的教育背景卡片
    const educationCard = createEducationCard(1);
    educationSection.appendChild(educationCard);
    
    drawerBody.appendChild(educationSection);

    // 创建抽屉底部
    const drawerFooter = document.createElement('div');
    drawerFooter.className = 'drawer-footer';
    
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'drawer-btn drawer-btn-default';
    cancelBtn.textContent = '取消';
    cancelBtn.addEventListener('click', closeDrawer);
    
    const submitBtn = document.createElement('button');
    submitBtn.className = 'drawer-btn drawer-btn-primary';
    submitBtn.textContent = '重新推荐';
    submitBtn.addEventListener('click', function() {
        submitDrawerForm(type);
    });
    
    drawerFooter.appendChild(cancelBtn);
    drawerFooter.appendChild(submitBtn);
    
    // 组装抽屉
    drawerContainer.appendChild(drawerHeader);
    drawerContainer.appendChild(drawerBody);
    drawerContainer.appendChild(drawerFooter);
    
    // 显示抽屉
    backdrop.classList.add('active');
    drawerContainer.classList.add('active');
    
    // 绑定添加教育背景按钮事件
    const addEducationBtn = document.getElementById('add-education');
    if (addEducationBtn) {
        addEducationBtn.addEventListener('click', function() {
            const educationCards = document.querySelectorAll('.education-card');
            const newCard = createEducationCard(educationCards.length + 1);
            educationSection.appendChild(newCard);
        });
    }
}

// 创建教育背景卡片
function createEducationCard(index) {
    const card = document.createElement('div');
    card.className = 'education-card';
    
    const cardHeader = document.createElement('div');
    cardHeader.className = 'education-card-header';
    
    const cardTitle = document.createElement('div');
    cardTitle.className = 'education-card-title';
    cardTitle.textContent = `教育背景 ${index}`;
    
    const cardActions = document.createElement('div');
    cardActions.className = 'education-card-actions';
    
    // 只有当不是第一个卡片时才添加删除按钮
    if (index > 1) {
        const deleteAction = document.createElement('div');
        deleteAction.className = 'education-card-action delete';
        deleteAction.innerHTML = '<i class="fas fa-trash"></i>';
        deleteAction.addEventListener('click', function() {
            card.remove();
            // 重新排序卡片标题
            const cards = document.querySelectorAll('.education-card');
            cards.forEach((c, i) => {
                c.querySelector('.education-card-title').textContent = `教育背景 ${i + 1}`;
            });
        });
        cardActions.appendChild(deleteAction);
    }
    
    cardHeader.appendChild(cardTitle);
    cardHeader.appendChild(cardActions);
    
    // 卡片内容 - 学历类型
    const educationTypeGroup = createFormGroup('学历类型', 'education-type-' + index, true);
    const educationTypeSelect = document.createElement('select');
    educationTypeSelect.className = 'drawer-form-select';
    educationTypeSelect.id = 'education-type-' + index;
    
    const options = ['本科', '硕士', '博士', '其他'];
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        educationTypeSelect.appendChild(optionElement);
    });
    
    educationTypeGroup.querySelector('.drawer-form-input-wrapper').appendChild(educationTypeSelect);
    
    // 卡片内容 - 所在国家
    const countryGroup = createFormGroup('所在国家', 'country-' + index, true);
    const countrySelect = document.createElement('select');
    countrySelect.className = 'drawer-form-select';
    countrySelect.id = 'country-' + index;
    
    const countries = ['中国', '美国', '英国', '澳大利亚', '加拿大', '新西兰', '其他'];
    countries.forEach(country => {
        const optionElement = document.createElement('option');
        optionElement.value = country;
        optionElement.textContent = country;
        countrySelect.appendChild(optionElement);
    });
    
    countryGroup.querySelector('.drawer-form-input-wrapper').appendChild(countrySelect);
    
    // 卡片内容 - 毕业院校
    const schoolGroup = createFormGroup('毕业院校', 'school-' + index, true);
    const schoolInput = document.createElement('input');
    schoolInput.type = 'text';
    schoolInput.className = 'drawer-form-input';
    schoolInput.id = 'school-' + index;
    
    schoolGroup.querySelector('.drawer-form-input-wrapper').appendChild(schoolInput);
    
    // 卡片内容 - 就读专业
    const majorGroup = createFormGroup('就读专业', 'major-' + index, true);
    const majorInput = document.createElement('input');
    majorInput.type = 'text';
    majorInput.className = 'drawer-form-input';
    majorInput.id = 'major-' + index;
    
    majorGroup.querySelector('.drawer-form-input-wrapper').appendChild(majorInput);
    
    // 卡片内容 - 成绩类型
    const scoreTypeGroup = createFormGroup('成绩类型', 'score-type-' + index, true);
    const scoreTypeSelect = document.createElement('select');
    scoreTypeSelect.className = 'drawer-form-select';
    scoreTypeSelect.id = 'score-type-' + index;
    
    const scoreTypes = ['百分制平均分 (GPA)', '4.0制GPA', '5.0制GPA', '其他成绩类型'];
    scoreTypes.forEach(type => {
        const optionElement = document.createElement('option');
        optionElement.value = type;
        optionElement.textContent = type;
        scoreTypeSelect.appendChild(optionElement);
    });
    
    scoreTypeGroup.querySelector('.drawer-form-input-wrapper').appendChild(scoreTypeSelect);
    
    // 卡片内容 - 成绩分数
    const scoreGroup = createFormGroup('成绩分数', 'score-' + index, true);
    const scoreInput = document.createElement('input');
    scoreInput.type = 'text';
    scoreInput.className = 'drawer-form-input';
    scoreInput.id = 'score-' + index;
    
    scoreGroup.querySelector('.drawer-form-input-wrapper').appendChild(scoreInput);
    
    // 卡片内容 - 起止时间
    const timeGroup = createFormGroup('起止时间', 'time-' + index, true);
    const timeInput = document.createElement('input');
    timeInput.type = 'text';
    timeInput.className = 'drawer-form-input';
    timeInput.id = 'time-' + index;
    timeInput.placeholder = '例如：2021-03-10 至 2024-03-21';
    
    timeGroup.querySelector('.drawer-form-input-wrapper').appendChild(timeInput);
    
    // 卡片内容 - 语言成绩
    const languageGroup = createFormGroup('语言成绩', 'language-' + index, false);
    const languageInput = document.createElement('input');
    languageInput.type = 'text';
    languageInput.className = 'drawer-form-input';
    languageInput.id = 'language-' + index;
    languageInput.placeholder = '例如：IELTS 6.5';
    
    languageGroup.querySelector('.drawer-form-input-wrapper').appendChild(languageInput);
    
    // 卡片内容 - 工作实习经历
    const workGroup = createFormGroup('工作实习经历', 'work-' + index, false);
    const workInput = document.createElement('textarea');
    workInput.className = 'drawer-form-textarea';
    workInput.id = 'work-' + index;
    workInput.placeholder = '请输入工作起止时间，工作岗位及主要工作内容';
    
    workGroup.querySelector('.drawer-form-input-wrapper').appendChild(workInput);
    
    // 将所有表单组添加到卡片中
    card.appendChild(cardHeader);
    card.appendChild(educationTypeGroup);
    card.appendChild(countryGroup);
    card.appendChild(schoolGroup);
    card.appendChild(majorGroup);
    card.appendChild(scoreTypeGroup);
    card.appendChild(scoreGroup);
    card.appendChild(timeGroup);
    card.appendChild(languageGroup);
    card.appendChild(workGroup);
    
    return card;
}

// 创建意向信息表单
function createIntentionForm() {
    const formContainer = document.createElement('div');
    
    // 申请学历
    const degreeGroup = createFormGroup('申请学历', 'degree', true);
    const degreeSelect = document.createElement('select');
    degreeSelect.className = 'drawer-form-select';
    degreeSelect.id = 'degree';
    
    const degrees = ['硕士', '本科', '博士', '预科', '其他'];
    degrees.forEach(degree => {
        const optionElement = document.createElement('option');
        optionElement.value = degree;
        optionElement.textContent = degree;
        degreeSelect.appendChild(optionElement);
    });
    
    degreeGroup.querySelector('.drawer-form-input-wrapper').appendChild(degreeSelect);
    
    // 意向国家
    const intentionCountryGroup = createFormGroup('意向国家', 'intention-country', true);
    const intentionCountrySelect = document.createElement('select');
    intentionCountrySelect.className = 'drawer-form-select';
    intentionCountrySelect.id = 'intention-country';
    
    const intentionCountries = ['澳大利亚', '美国', '英国', '加拿大', '新西兰', '其他'];
    intentionCountries.forEach(country => {
        const optionElement = document.createElement('option');
        optionElement.value = country;
        optionElement.textContent = country;
        intentionCountrySelect.appendChild(optionElement);
    });
    
    intentionCountryGroup.querySelector('.drawer-form-input-wrapper').appendChild(intentionCountrySelect);
    
    // 意向专业
    const intentionMajorGroup = createFormGroup('意向专业', 'intention-major', true);
    const intentionMajorSelect = document.createElement('select');
    intentionMajorSelect.className = 'drawer-form-select';
    intentionMajorSelect.id = 'intention-major';
    
    const intentionMajors = ['Music/音乐', '计算机科学', '商科', '工程', '艺术', '其他'];
    intentionMajors.forEach(major => {
        const optionElement = document.createElement('option');
        optionElement.value = major;
        optionElement.textContent = major;
        intentionMajorSelect.appendChild(optionElement);
    });
    
    intentionMajorGroup.querySelector('.drawer-form-input-wrapper').appendChild(intentionMajorSelect);
    
    // 意向院校
    const intentionSchoolGroup = createFormGroup('意向院校', 'intention-school', false);
    const intentionSchoolInput = document.createElement('input');
    intentionSchoolInput.type = 'text';
    intentionSchoolInput.className = 'drawer-form-input';
    intentionSchoolInput.id = 'intention-school';
    intentionSchoolInput.placeholder = '请输入意向院校';
    
    intentionSchoolGroup.querySelector('.drawer-form-input-wrapper').appendChild(intentionSchoolInput);
    
    // 期望入学时间
    const expectTimeGroup = createFormGroup('期望入学时间', 'expect-time', false);
    const expectTimeInput = document.createElement('input');
    expectTimeInput.type = 'text';
    expectTimeInput.className = 'drawer-form-input';
    expectTimeInput.id = 'expect-time';
    expectTimeInput.placeholder = '例如：2024下半年';
    
    expectTimeGroup.querySelector('.drawer-form-input-wrapper').appendChild(expectTimeInput);
    
    // 意向城市
    const intentionCityGroup = createFormGroup('意向城市', 'intention-city', false);
    const intentionCityInput = document.createElement('input');
    intentionCityInput.type = 'text';
    intentionCityInput.className = 'drawer-form-input';
    intentionCityInput.id = 'intention-city';
    intentionCityInput.placeholder = '点击选择意向城市';
    
    intentionCityGroup.querySelector('.drawer-form-input-wrapper').appendChild(intentionCityInput);
    
    // 其他要求
    const otherRequirementGroup = createFormGroup('其他要求', 'other-requirement', false);
    const otherRequirementInput = document.createElement('textarea');
    otherRequirementInput.className = 'drawer-form-textarea';
    otherRequirementInput.id = 'other-requirement';
    otherRequirementInput.placeholder = '请输入其他要求';
    
    otherRequirementGroup.querySelector('.drawer-form-input-wrapper').appendChild(otherRequirementInput);
    
    // 将所有表单组添加到容器中
    formContainer.appendChild(degreeGroup);
    formContainer.appendChild(intentionCountryGroup);
    formContainer.appendChild(intentionMajorGroup);
    formContainer.appendChild(intentionSchoolGroup);
    formContainer.appendChild(expectTimeGroup);
    formContainer.appendChild(intentionCityGroup);
    formContainer.appendChild(otherRequirementGroup);
    
    return formContainer;
}

// 创建表单组
function createFormGroup(label, id, required = false) {
    const group = document.createElement('div');
    group.className = 'drawer-form-group';
    
    const labelElement = document.createElement('label');
    labelElement.className = 'drawer-form-label';
    labelElement.htmlFor = id;
    labelElement.textContent = label;
    
    // 添加红色星号以表示必填项
    if (required) {
        const star = document.createElement('span');
        star.style.color = 'red';
        star.textContent = ' *';
        labelElement.appendChild(star);
    }
    
    const inputWrapper = document.createElement('div');
    inputWrapper.className = 'drawer-form-input-wrapper';
    
    group.appendChild(labelElement);
    group.appendChild(inputWrapper);
    
    return group;
}


// 提交抽屉表单
function submitDrawerForm(type) {
    // 关闭抽屉
    closeDrawer();
    
    // 显示加载动画
    const loadingOverlay = document.querySelector('.loading-overlay');
    loadingOverlay.classList.add('active');
    
    // 模拟加载过程，3秒后隐藏加载动画
    setTimeout(() => {
        loadingOverlay.classList.remove('active');
    }, 3000);
}

// 关闭抽屉
function closeDrawer() {
    const backdrop = document.querySelector('.drawer-backdrop');
    const drawerContainer = document.querySelector('.drawer-container');
    
    backdrop.classList.remove('active');
    drawerContainer.classList.remove('active');
}

// 显示提示信息
function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.display = 'block';
    
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}
