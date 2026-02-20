// Bilingual System & Institutional Animation Logic

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Bilingual Toggle Logic ---
    const toggleBtn = document.getElementById("lang-toggle");

    // Check local storage for saved language or default to 'th'
    let currentLang = localStorage.getItem('site-lang') || "th";

    // Function to apply language
    function applyLanguage(lang) {
        const thElements = document.querySelectorAll('[data-lang="th"]');
        const enElements = document.querySelectorAll('[data-lang="en"]');

        if (lang === "th") {
            thElements.forEach(el => el.style.display = ""); // Reset to default (block/inline)
            enElements.forEach(el => el.style.display = "none");
            if (toggleBtn) toggleBtn.textContent = "EN"; // Button shows what you CAN switch to
        } else {
            thElements.forEach(el => el.style.display = "none");
            enElements.forEach(el => el.style.display = "");
            if (toggleBtn) toggleBtn.textContent = "TH";
        }

        // Save preference
        localStorage.setItem('site-lang', lang);
        currentLang = lang;
    }

    // Initialize
    applyLanguage(currentLang);

    // Event Listener
    if (toggleBtn) {
        toggleBtn.addEventListener("click", function () {
            const newLang = currentLang === "th" ? "en" : "th";
            applyLanguage(newLang);
        });
    }


    // --- 2. Institutional Fade-in Animation ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Select all sections/elements to animate
    const animatedElements = document.querySelectorAll('.fade-in');
    animatedElements.forEach(el => observer.observe(el));


    // --- 3. Navbar Scroll Effect (Consolidated) ---
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    // --- 4. Video Modal Logic ---
    const videoModal = document.getElementById('video-modal');
    const watchBtn = document.getElementById('watch-video-btn');
    const closeBtn = document.getElementById('modal-close');
    const modalVideo = document.getElementById('modal-video');

    if (watchBtn && videoModal && modalVideo) {
        watchBtn.addEventListener('click', () => {
            videoModal.classList.add('active');
            modalVideo.play();
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                videoModal.classList.remove('active');
                modalVideo.pause();
                modalVideo.currentTime = 0;
            });
        }

        // Close on background click
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                videoModal.classList.remove('active');
                modalVideo.pause();
                modalVideo.currentTime = 0;
            }
        });
    }

    // --- 5. Image Lightbox Logic ---
    // Inject Modal HTML if not exists
    if (!document.getElementById('image-modal')) {
        const imgModal = document.createElement('div');
        imgModal.id = 'image-modal';
        imgModal.className = 'image-modal';
        imgModal.innerHTML = '<img src="" alt="Full Size">';
        document.body.appendChild(imgModal);

        imgModal.addEventListener('click', () => {
            imgModal.classList.remove('active');
        });
    }

    const imgModal = document.getElementById('image-modal');
    const modalImg = imgModal.querySelector('img');

    // Add click event to all relevant images (excluding decorative/backgrounds if needed)
    // Targeting images inside .section, .card, or .grid-2
    const clickableImages = document.querySelectorAll('.section img, .card img, .grid-2 img');

    clickableImages.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', (e) => {
            modalImg.src = e.target.src;
            imgModal.classList.add('active');
        });
    });


    // --- 6. Scroll To Top Logic ---
    // Inject Button HTML
    if (!document.getElementById('scroll-top-btn')) {
        const scrollBtn = document.createElement('button');
        scrollBtn.id = 'scroll-top-btn';
        scrollBtn.className = 'scroll-top-btn';
        scrollBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>';
        document.body.appendChild(scrollBtn);

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Show/Hide logic
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });
    }

});
