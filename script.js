// Ждем загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSmoothScroll();
    initForm();
    initModal();
    initScrollEffects();
    initProfileImage();
    initDownloadCV();
});

// Навигация и мобильное меню
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Открытие/закрытие меню на мобильных
    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu?.classList.toggle('active');
        
        // Анимация гамбургера
        const bars = hamburger.querySelectorAll('.bar');
        if (hamburger.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    // Закрытие меню при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
            
            const bars = hamburger?.querySelectorAll('.bar');
            if (bars) {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    });
}

// Плавная прокрутка
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Обработка формы
function initForm() {
    const form = document.getElementById('contact-form');
    
    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Показываем загрузку
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;
        
        // Собираем данные формы
        const formData = {
            name: document.getElementById('name')?.value,
            email: document.getElementById('email')?.value,
            message: document.getElementById('message')?.value
        };
        
        // Валидация
        if (!validateEmail(formData.email)) {
            showToast('Пожалуйста, введите корректный email', 'error');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            return;
        }
        
        try {
            // Имитация отправки на сервер
            await simulateServerRequest(formData);
            
            // Очищаем форму
            form.reset();
            
            // Показываем успешное сообщение
            showToast('Сообщение успешно отправлено!', 'success');
            
        } catch (error) {
            showToast('Произошла ошибка. Попробуйте позже.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Валидация email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Имитация запроса к серверу
function simulateServerRequest(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Отправленные данные:', data);
            resolve();
        }, 1500);
    });
}

// Модальное окно для проектов
function initModal() {
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.close-modal');
    
    // Данные проектов
    const projectsData = {
        1: {
            title: 'Интернет-магазин',
            description: 'Полноценный интернет-магазин с корзиной, фильтрацией товаров и личным кабинетом. Использованы React, Redux, Node.js, MongoDB.',
            technologies: ['React', 'Redux', 'Node.js', 'MongoDB'],
            demo: '#',
            github: '#'
        },
        2: {
            title: 'Task Manager',
            description: 'Приложение для управления задачами с возможностью создания проектов, назначения дедлайнов и отслеживания прогресса.',
            technologies: ['Vue.js', 'Vuex', 'Express', 'PostgreSQL'],
            demo: '#',
            github: '#'
        },
        3: {
            title: 'Погодное приложение',
            description: 'Приложение для просмотра погоды с красивым интерфейсом, поддержкой городов и графиками температуры.',
            technologies: ['React', 'OpenWeather API', 'Chart.js'],
            demo: '#',
            github: '#'
        }
    };
    
    // Открытие модального окна при клике на карточку проекта
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Не открываем модалку при клике на ссылки
            if (e.target.classList.contains('project-link')) return;
            
            const projectId = card.dataset.project;
            const project = projectsData[projectId];
            
            if (project && modal && modalBody) {
                modalBody.innerHTML = `
                    <h2>${project.title}</h2>
                    <p style="margin: 1rem 0;">${project.description}</p>
                    <h3>Технологии:</h3>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin: 1rem 0;">
                        ${project.technologies.map(tech => 
                            `<span style="background: #007bff; color: white; padding: 5px 15px; border-radius: 50px; font-size: 0.9rem;">${tech}</span>`
                        ).join('')}
                    </div>
                    <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                        <a href="${project.demo}" class="btn primary-btn" target="_blank">Посмотреть демо</a>
                        <a href="${project.github}" class="btn secondary-btn" style="color: #333; border-color: #333;" target="_blank">Исходный код</a>
                    </div>
                `;
                
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Закрытие модального окна
    closeBtn?.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Закрытие по клику вне модального окна
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Эффекты при скролле
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Изменение навбара при скролле
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
        
        // Подсветка активного пункта меню
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
                link.style.color = '#007bff';
            } else {
                link.style.color = '';
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
    
    document.querySelectorAll('.project-card, .about-content > *').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Загрузка профиля
function initProfileImage() {
    const profileImg = document.getElementById('profile-image');
    
    // Заглушка для изображения профиля
    if (profileImg) {
        profileImg.onerror = function() {
            this.src = 'https://via.placeholder.com/400x400?text=Profile';
        };
    }
}

// Скачивание резюме
function initDownloadCV() {
    const downloadBtn = document.getElementById('download-cv');
    
    downloadBtn?.addEventListener('click', () => {
        // Создаем временную ссылку для скачивания
        const link = document.createElement('a');
        link.href = '#'; // Здесь должен быть URL вашего резюме
        link.download = 'resume.pdf';
        link.click();
        
        showToast('Скачивание началось...', 'info');
    });
}

// Система уведомлений
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    
    if (toast) {
        toast.textContent = message;
        
        // Устанавливаем цвет в зависимости от типа
        switch(type) {
            case 'success':
                toast.style.background = '#28a745';
                break;
            case 'error':
                toast.style.background = '#dc3545';
                break;
            default:
                toast.style.background = '#333';
        }
        
        toast.classList.add('show');
        
        // Автоматически скрываем через 3 секунды
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Добавляем эффект печати для заголовка
function typeWriterEffect() {
    const title = document.querySelector('.hero-title');
    if (!title) return;
    
    const text = title.textContent;
    title.textContent = '';
    
    let i = 0;
    function type() {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }
    
    // Запускаем эффект после загрузки страницы
    setTimeout(type, 500);
}

// Запускаем эффект печати
typeWriterEffect();

// Предзагрузка изображений
function preloadImages() {
    const images = [
        'https://via.placeholder.com/400',
        'https://via.placeholder.com/300x200'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

preloadImages();

// Обработка ошибок загрузки изображений
document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'https://via.placeholder.com/300x200?text=Image+not+found';
    }
}, true);