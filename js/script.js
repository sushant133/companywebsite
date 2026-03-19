// ============================================
// MantraSphere Innovations - Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // ---- Preloader ----
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', function () {
            setTimeout(function () {
                preloader.classList.add('hidden');
            }, 800);
        });
        // Fallback: hide after 3 seconds
        setTimeout(function () {
            preloader.classList.add('hidden');
        }, 3000);
    }

    // ---- Navbar Scroll Effect ----
    const navbar = document.getElementById('navbar');
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run on load

    // ---- Mobile Menu ----
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu on link click
        document.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu on outside click
        document.addEventListener('click', function (e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // ---- Back to Top Button ----
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ---- Counter Animation ----
    function animateCounters() {
        const counters = document.querySelectorAll('[data-count]');
        counters.forEach(function (counter) {
            if (counter.dataset.animated) return;

            const rect = counter.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (isVisible) {
                counter.dataset.animated = 'true';
                const target = parseInt(counter.dataset.count);
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;

                const timer = setInterval(function () {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current);
                }, 16);
            }
        });
    }

    window.addEventListener('scroll', animateCounters);
    animateCounters();

    // ---- AOS (Animate on Scroll) - Custom Implementation ----
    function initAOS() {
        const elements = document.querySelectorAll('[data-aos]');
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.aosDelay || 0;
                    setTimeout(function () {
                        entry.target.classList.add('aos-animate');
                    }, parseInt(delay));
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(function (el) {
            observer.observe(el);
        });
    }
    initAOS();

    // ---- FAQ Accordion ----
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function (item) {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function () {
                const isActive = item.classList.contains('active');

                // Close all
                faqItems.forEach(function (faq) {
                    faq.classList.remove('active');
                });

                // Open clicked if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // ---- Testimonials Slider ----
    const track = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('testPrev');
    const nextBtn = document.getElementById('testNext');
    const dotsContainer = document.getElementById('testDots');

    if (track && prevBtn && nextBtn && dotsContainer) {
        const cards = track.querySelectorAll('.testimonial-card');
        let currentIndex = 0;
        const total = cards.length;

        // Create dots
        for (let i = 0; i < total; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', function () {
                goToSlide(i);
            });
            dotsContainer.appendChild(dot);
        }

        function goToSlide(index) {
            currentIndex = index;
            track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
            updateDots();
        }

        function updateDots() {
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach(function (dot, i) {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        nextBtn.addEventListener('click', function () {
            currentIndex = (currentIndex + 1) % total;
            goToSlide(currentIndex);
        });

        prevBtn.addEventListener('click', function () {
            currentIndex = (currentIndex - 1 + total) % total;
            goToSlide(currentIndex);
        });

        // Auto slide
        let autoSlide = setInterval(function () {
            currentIndex = (currentIndex + 1) % total;
            goToSlide(currentIndex);
        }, 5000);

        // Pause on hover
        track.addEventListener('mouseenter', function () {
            clearInterval(autoSlide);
        });

        track.addEventListener('mouseleave', function () {
            autoSlide = setInterval(function () {
                currentIndex = (currentIndex + 1) % total;
                goToSlide(currentIndex);
            }, 5000);
        });
    }

    // ---- Hero Particles ----
    const heroParticles = document.getElementById('heroParticles');
    if (heroParticles) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
            particle.style.width = (Math.random() * 4 + 2) + 'px';
            particle.style.height = particle.style.width;
            heroParticles.appendChild(particle);
        }
    }

    // ---- Contact Form ----
// ---- Contact Form ----
const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

if (contactForm) {

contactForm.addEventListener("submit", async function(e){

e.preventDefault();

const submitBtn = contactForm.querySelector("button[type='submit']");
submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
submitBtn.disabled = true;

const data = new FormData(contactForm);

const response = await fetch(contactForm.action,{
method:"POST",
body:data,
headers:{ "Accept":"application/json" }
});

if(response.ok){
contactForm.style.display="none";
if(formSuccess){
formSuccess.style.display="block";
}
contactForm.reset();
}else{
alert("There was a problem sending your message.");
submitBtn.disabled=false;
submitBtn.innerHTML='<i class="fas fa-paper-plane"></i> Send Message';
}

});

}

    // ---- Smooth scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = navbar.offsetHeight + 20;
                const targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
            }
        });
    });

    // ---- Typing effect for hero (optional) ----
    const gradientText = document.querySelector('.hero .gradient-text');
    if (gradientText) {
        const words = ['Digital Reality', 'Smart Solutions', 'Innovation', 'Success'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                gradientText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                gradientText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }

            setTimeout(typeEffect, typeSpeed);
        }

        setTimeout(typeEffect, 2000);
    }

    // ---- Page transition effect ----
    document.querySelectorAll('a').forEach(function (link) {
        if (link.hostname === window.location.hostname &&
            !link.getAttribute('href').startsWith('#') &&
            link.getAttribute('href') !== '' &&
            !link.getAttribute('href').startsWith('tel') &&
            !link.getAttribute('href').startsWith('mailto')) {
            link.addEventListener('click', function (e) {
                // Allow normal navigation
            });
        }
    });

});