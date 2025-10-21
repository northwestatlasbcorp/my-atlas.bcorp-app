// Основные функции сайта

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    initScrollEffects();
    initCurrentYear();
});

// Инициализация частиц
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 40, density: { enable: true, value_area: 800 } },
                color: { value: '#d4af37' },
                shape: { type: 'circle' },
                opacity: { value: 0.3, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#d4af37',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out'
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'repulse' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                }
            }
        });
    }
}

// Эффекты скролла
function initScrollEffects() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(13, 13, 13, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(13, 13, 13, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
    });
}

// Установка текущего года
function initCurrentYear() {
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = `&copy; ${currentYear} North West Atlas B Corp. Все права защищены.`;
    }
}

// Переключение меню на мобильных
function toggleMenu() {
    const menu = document.getElementById('nav-menu');
    menu.classList.toggle('active');
}

// ESG калькулятор
function calculateESG() {
    const resultsContainer = document.getElementById('results');
    const company = document.getElementById('company').value;
    
    const results = {
        solidcore: {
            ratings: [
                ['Sustainalytics', '8.5'],
                ['Refinitiv', '92'],
                ['MSCI', 'AA'],
                ['RAEX Europe', 'A+'],
                ['Средняя согласованность', '7.50']
            ],
            recommendations: [
                'Высокая оригинальность проекта',
                'Подтвержденная патентная чистота',
                'Высокая потенциальная доходность',
                'Требуется доработка бизнес-модели'
            ]
        }
    };
    
    const companyData = results[company];
    
    if (companyData) {
        let html = '<h3 class="text-gold">Результаты оценки</h3>';
        
        // Рейтинги
        html += '<div class="ratings"><h4>Рейтинги:</h4><ul>';
        companyData.ratings.forEach(rating => {
            html += `<li><strong>${rating[0]}:</strong> ${rating[1]}</li>`;
        });
        html += '</ul></div>';
        
        // Рекомендации
        html += '<div class="recommendations"><h4>Рекомендации:</h4><ul>';
        companyData.recommendations.forEach(rec => {
            html += `<li>${rec}</li>`;
        });
        html += '</ul></div>';
        
        resultsContainer.innerHTML = html;
        resultsContainer.style.display = 'block';
        
        // Анимация появления
        resultsContainer.style.opacity = '0';
        resultsContainer.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            resultsContainer.style.transition = 'all 0.5s ease';
            resultsContainer.style.opacity = '1';
            resultsContainer.style.transform = 'translateY(0)';
        }, 100);
    }
}

// Плавная прокрутка к секциям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Закрываем меню на мобильных
            if (window.innerWidth <= 768) {
                document.getElementById('nav-menu').classList.remove('active');
            }
        }
    });
});

// Анимация появления элементов при скролле
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

// Наблюдаем за карточками
document.querySelectorAll('.about-card, .expertise-card, .investment-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});
