// ============================================
// CONTAGEM REGRESSIVA
// ============================================

function startCountdown() {
    const countdownDate = new Date().getTime() + (23 * 24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000) + (37 * 60 * 1000) + (29 * 1000);

    const timer = setInterval(function() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerHTML = String(days).padStart(2, '0');
        document.getElementById('hours').innerHTML = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerHTML = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerHTML = String(seconds).padStart(2, '0');

        if (distance < 0) {
            clearInterval(timer);
            document.getElementById('days').innerHTML = '00';
            document.getElementById('hours').innerHTML = '00';
            document.getElementById('minutes').innerHTML = '00';
            document.getElementById('seconds').innerHTML = '00';
        }
    }, 1000);
}

// ============================================
// CONTADOR DE USUÁRIOS ATIVOS
// ============================================

function animateActiveUsers() {
    const startValue = 0;
    const endValue = 143;
    const duration = 1500;
    const element = document.getElementById('active-count');
    
    let startTime = null;
    
    function animate(currentTime) {
        if (startTime === null) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const value = Math.floor(progress * endValue);
        element.textContent = value;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
    
    // Simular aumento aleatório após carregamento
    setInterval(() => {
        const current = parseInt(element.textContent);
        const increment = Math.floor(Math.random() * 3) + 1;
        element.textContent = current + increment;
    }, 3000);
}

// ============================================
// SCROLL PARA VÍDEO
// ============================================

function scrollToVideo() {
    const videoSection = document.getElementById('video-section');
    videoSection.scrollIntoView({ behavior: 'smooth' });
}

// ============================================
// OBSERVADOR DE INTERSEÇÃO (Animações ao Scroll)
// ============================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar benefit cards
    document.querySelectorAll('.benefit-card').forEach(card => {
        observer.observe(card);
    });

    // Observar feedback cards
    document.querySelectorAll('.feedback-card').forEach(card => {
        observer.observe(card);
    });
}

// Styled CSS para fade-in
function addFadeInStyle() {
    const style = document.createElement('style');
    style.innerHTML = `
        .benefit-card,
        .feedback-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .benefit-card.fade-in,
        .feedback-card.fade-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// Carrossel removido: função descartada

// ============================================
// EFEITO DE PARALLAX SUAVE
// ============================================

function initParallax() {
    // Parallax leve: transformar posição do elemento hero background (apenas se necessário)
    const hero = document.querySelector('.hero');
    if (!hero) return;
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        // Aplicar leve translate para a mockup para efeito de profundidade
        const mockup = document.querySelector('.hero-mockup');
        if (mockup) {
            mockup.style.transform = `translateY(${scrolled * -0.02}px)`;
        }
    });
}

// ============================================
// DÉTECÇÃO DE MOUSE - EFEITO CURSOR
// ============================================

function initMouseGlow() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '999';
    canvas.id = 'mouse-glow';
    
    // Só adicionar em desktop (não mobile)
    if (window.innerWidth > 768) {
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Glow suave ao redor do mouse
            const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 150);
            gradient.addColorStop(0, 'rgba(0, 217, 255, 0.1)');
            gradient.addColorStop(1, 'rgba(0, 217, 255, 0)');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(mouseX - 150, mouseY - 150, 300, 300);
            
            requestAnimationFrame(draw);
        }
        
        draw();
        
        // Resize listener
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
}

// ============================================
// INICIALIZAÇÃO GERAL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Iniciar countdown
    startCountdown();
    
    // Animar usuários ativos
    animateActiveUsers();
    
    // Animações ao scroll
    addFadeInStyle();
    initScrollAnimations();
    
    // Carrossel removido (não executado)
    
    // Parallax
    initParallax();
    
    // Mouse glow
    initMouseGlow();
    
    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#pay') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // Adicionar listener para botão "VER COMO FUNCIONA"
    const versionButton = document.querySelector('.btn-secondary');
    if (versionButton) {
        versionButton.addEventListener('click', scrollToVideo);
    }
    
    // Analytics simples (rastrear cliques)
    document.querySelectorAll('[href*="pay.cakto.com"]').forEach(link => {
        link.addEventListener('click', function() {
            console.log('Conversão: Clique no CTA - Steam Premium');
        });
    });
});

// ============================================
// PRELOAD DE IMAGENS DO CARROSSEL
// ============================================

function preloadImages() {
    const images = [
        'https://steampremium.netlify.app/assets/feedback-01-DcGzbI_E.jpg',
        'https://steampremium.netlify.app/assets/feedback-05-B5cy4J3J.jpg'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Preload após carregamento da página
window.addEventListener('load', preloadImages);

// ============================================
// DETECTAR SUPORTE A WEBP
// ============================================

function checkWebPSupport() {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}

// ============================================
// OTIMIZAÇÕES DE PERFORMANCE
// ============================================

// Lazy loading para vídeo iframe
if ('IntersectionObserver' in window) {
    const videoFrame = document.querySelector('.video-frame');
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !videoFrame.src) {
                // Carregar vídeo apenas quando visível
                videoFrame.src = videoFrame.getAttribute('data-src') || videoFrame.src;
            }
        });
    });
    
    if (videoFrame) {
        videoObserver.observe(videoFrame);
    }
}

// ============================================
// EFEITOS DE CLIQUE NOS BOTÕES
// ============================================

function initButtonRipple() {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Adicionar estilos para ripple effect
function addRippleStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', function() {
    addRippleStyles();
    initButtonRipple();
});
