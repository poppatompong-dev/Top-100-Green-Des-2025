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
            if(toggleBtn) toggleBtn.textContent = "EN"; // Button shows what you CAN switch to
        } else {
            thElements.forEach(el => el.style.display = "none");
            enElements.forEach(el => el.style.display = "");
            if(toggleBtn) toggleBtn.textContent = "TH";
        }
        
        // Save preference
        localStorage.setItem('site-lang', lang);
        currentLang = lang;
    }

    // Initialize
    applyLanguage(currentLang);

    // Event Listener
    if (toggleBtn) {
        toggleBtn.addEventListener("click", function() {
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
    if(navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
});
