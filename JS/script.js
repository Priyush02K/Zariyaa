    // <!-- --- INLINE JS FIXES FOR SLIDER & ICONS --- -->
   
        document.addEventListener('DOMContentLoaded', () => {
            // 1. Force Icons to Render
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }

            // 2. HERO SLIDER LOGIC (Embedded)
            const slides = document.querySelectorAll('.hero-slide');
            const prevBtn = document.getElementById('prev-slide');
            const nextBtn = document.getElementById('next-slide');
            const dotsContainer = document.getElementById('slider-dots');
            
            if (slides.length > 0) {
                let currentSlide = 0;
                const slideInterval = 5000; // 5 seconds
                let slideTimer;

                // Create Dots dynamically
                dotsContainer.innerHTML = ''; // Clear existing
                slides.forEach((_, index) => {
                    const dot = document.createElement('button');
                    dot.classList.add('w-2', 'h-2', 'rounded-full', 'transition-all', 'duration-300');
                    if (index === 0) dot.classList.add('bg-white', 'w-6');
                    else dot.classList.add('bg-white/50');
                    
                    dot.addEventListener('click', () => {
                        goToSlide(index);
                        resetTimer(); // Reset timer on manual interaction
                    });
                    dotsContainer.appendChild(dot);
                });

                const dots = dotsContainer.querySelectorAll('button');

                function updateSlides() {
                    slides.forEach((slide, index) => {
                        const img = slide.querySelector('img');
                        
                        if (index === currentSlide) {
                            slide.classList.remove('opacity-0');
                            slide.classList.add('opacity-100', 'active');
                            
                            // Reset Animation Trick
                            if(img) {
                                img.classList.remove('animate-pan');
                                void img.offsetWidth; // Trigger reflow
                                img.classList.add('animate-pan');
                            }
                        } else {
                            slide.classList.remove('opacity-100', 'active');
                            slide.classList.add('opacity-0');
                        }
                    });

                    // Update Dots
                    dots.forEach((dot, index) => {
                        if (index === currentSlide) {
                            dot.classList.remove('bg-white/50', 'w-2');
                            dot.classList.add('bg-white', 'w-6');
                        } else {
                            dot.classList.add('bg-white/50', 'w-2');
                            dot.classList.remove('bg-white', 'w-6');
                        }
                    });
                }

                function nextSlide() {
                    currentSlide = (currentSlide + 1) % slides.length;
                    updateSlides();
                }

                function prevSlide() {
                    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                    updateSlides();
                }

                function goToSlide(index) {
                    currentSlide = index;
                    updateSlides();
                }

                function resetTimer() {
                    clearInterval(slideTimer);
                    slideTimer = setInterval(nextSlide, slideInterval);
                }

                // Initialize
                updateSlides();
                resetTimer();

                // Button Listeners
                if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });
                if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });
            }
        });
 