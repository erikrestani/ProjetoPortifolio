let currentLang = 'en';

function renderProjects(lang) {
    const grid = document.querySelector('.projects-grid');
    if (!grid) return;

    const t = i18n[lang];

    grid.innerHTML = projects.map(p => {
        const isWip = !!p.wip;
        const title = isWip ? t.wip_title : p.title;
        const desc = t[p.descKey] || '';

        const badge = isWip
            ? `<div class="project-badge wip-badge">${t.badge_wip}</div>`
            : `<div class="project-badge">${t.badge_featured}</div>`;

        const tags = isWip
            ? `<div class="project-tags"><span class="tag wip-tag">${t.coming_soon}</span></div>`
            : `<div class="project-tags">${p.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>`;

        const links = p.links.map(link => {
            if (link.type === 'live') {
                return `<a href="${link.url}" target="_blank" class="project-link">
                    <i class="bi bi-box-arrow-up-right"></i><span>${t.view_live}</span>
                </a>`;
            }
            if (link.type === 'github') {
                return `<a href="${link.url}" target="_blank" class="project-link">
                    <i class="bi bi-github"></i><span>${t.view_github}</span>
                </a>`;
            }
            return '';
        }).join('');

        return `
        <div class="project-card reveal${isWip ? ' wip-card' : ''}">
            ${badge}
            <div class="project-icon"><i class="bi ${p.icon}"></i></div>
            <h3>${title}</h3>
            <p>${desc}</p>
            ${tags}
            ${links ? `<div class="project-links">${links}</div>` : ''}
        </div>`;
    }).join('');

    initScrollReveal();
}

function applyTranslations(lang) {
    const t = i18n[lang];

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) el.textContent = t[key];
    });

    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        if (t[key] !== undefined) el.innerHTML = t[key];
    });

    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
}

function initI18n() {
    const btn = document.getElementById('lang-btn');
    btn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'pt' : 'en';
        btn.textContent = currentLang === 'en' ? 'PT-BR' : 'EN';
        applyTranslations(currentLang);
        renderProjects(currentLang);

        const h1 = document.querySelector('.site-header h1');
        if (h1) initTypewriter(h1, i18n[currentLang].hero_title_plain);
    });
}

function initMobileNav() {
    const toggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('.menu-desktop');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => nav.classList.toggle('open'));

    nav.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => nav.classList.remove('open'));
    });
}

document.addEventListener('DOMContentLoaded', () => {
    applyTranslations(currentLang);
    renderProjects(currentLang);

    const h1 = document.querySelector('.site-header h1');
    if (h1) initTypewriter(h1, i18n[currentLang].hero_title_plain);

    initScrollReveal();
    initScrollspy();
    initCursorGlow();
    initI18n();
    initMobileNav();
});
