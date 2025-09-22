// ARNAV ENTERPRISES - Main JavaScript with Enhanced Mobile Machine Details Functionality

// Global variables
let currentMachinerySlideIndex = 0;
let totalMachinerySlides = 0;
let autoMachinerySlideInterval;
let productAutoSlideIntervals = new Map(); // Store intervals for each product carousel
let expandedMachineIndex = -1; // Track which machine has expanded details
let autoSlideBlocked = false; // Block auto-slide when details are expanded

// ========== INITIALIZATION ========== 
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    setupEventListeners();
    startAutoSlide();
    startProductAutoSlides();
    setupImageModal();
});

function initializeWebsite() {
    // Generate all dynamic content
    generateMachinerySlides();
    generateMachineryDots();
    generateProducts();
    generateClients();
    
    // Set total slides count
    totalMachinerySlides = machineryData.length;
    
    // Initialize intersection observer for animations
    setupScrollAnimations();
    
    // Create image modal
    createImageModal();
}

// ========== NAVIGATION FUNCTIONS ==========
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const offset = headerHeight + 20;
        
        setTimeout(() => {
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }, 10);
    }
}

// ========== MACHINERY CAROUSEL FUNCTIONS ==========
function showMachinerySlide(index) {
    const container = document.getElementById('machineryCarouselContainer');
    if (!container) return;
    
    const translateX = -index * 100;
    container.style.transform = `translateX(${translateX}%)`;
    
    // Update dots
    const dots = document.querySelectorAll('#machineryCarouselDots .dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextMachinerySlide() {
    // Collapse current expanded details before moving
    if (expandedMachineIndex !== -1) {
        collapseMachineDetails(expandedMachineIndex);
    }
    
    currentMachinerySlideIndex = (currentMachinerySlideIndex + 1) % totalMachinerySlides;
    showMachinerySlide(currentMachinerySlideIndex);
}

function prevMachinerySlide() {
    // Collapse current expanded details before moving
    if (expandedMachineIndex !== -1) {
        collapseMachineDetails(expandedMachineIndex);
    }
    
    currentMachinerySlideIndex = (currentMachinerySlideIndex - 1 + totalMachinerySlides) % totalMachinerySlides;
    showMachinerySlide(currentMachinerySlideIndex);
}

function currentMachinerySlide(index) {
    // Collapse current expanded details before moving
    if (expandedMachineIndex !== -1) {
        collapseMachineDetails(expandedMachineIndex);
    }
    
    currentMachinerySlideIndex = index - 1;
    showMachinerySlide(currentMachinerySlideIndex);
}

// ========== MOBILE MACHINE DETAILS FUNCTIONALITY ==========
function toggleMachineDetails(machineIndex) {
    const detailsElement = document.getElementById(`machine-details-${machineIndex}`);
    const viewButton = document.getElementById(`view-btn-${machineIndex}`);
    
    if (!detailsElement || !viewButton) return;
    
    // If this machine is already expanded, collapse it
    if (expandedMachineIndex === machineIndex) {
        collapseMachineDetails(machineIndex);
        return;
    }
    
    // If another machine is expanded, collapse it first
    if (expandedMachineIndex !== -1) {
        collapseMachineDetails(expandedMachineIndex);
    }
    
    // Expand current machine details
    expandMachineDetails(machineIndex);
}

function expandMachineDetails(machineIndex) {
    const detailsElement = document.getElementById(`machine-details-${machineIndex}`);
    const viewButton = document.getElementById(`view-btn-${machineIndex}`);
    
    if (!detailsElement || !viewButton) return;
    
    // Update states
    expandedMachineIndex = machineIndex;
    autoSlideBlocked = true;
    
    // Stop auto-slide
    stopAutoSlide();
    
    // Update UI
    detailsElement.classList.add('expanded');
    viewButton.textContent = 'Hide Details';
    viewButton.classList.add('expanded');
    
    // Add smooth animation
    setTimeout(() => {
        detailsElement.style.transition = 'max-height 0.4s ease-in-out, opacity 0.4s ease-in-out';
    }, 10);
}

function collapseMachineDetails(machineIndex) {
    const detailsElement = document.getElementById(`machine-details-${machineIndex}`);
    const viewButton = document.getElementById(`view-btn-${machineIndex}`);
    
    if (!detailsElement || !viewButton) return;
    
    // Update states
    expandedMachineIndex = -1;
    autoSlideBlocked = false;
    
    // Update UI
    detailsElement.classList.remove('expanded');
    viewButton.textContent = 'View Details';
    viewButton.classList.remove('expanded');
    
    // Restart auto-slide after a short delay
    setTimeout(() => {
        if (!autoSlideBlocked) {
            startAutoSlide();
        }
    }, 5000);
}

// ========== IMAGE MODAL FUNCTIONALITY ==========
function createImageModal() {
    // Create modal HTML structure
    const modalHTML = `
        <div id="imageModal" class="image-modal">
            <div class="modal-content">
                <img id="modalImage" class="modal-image" src="" alt="Product Image">
                <button id="modalClose" class="modal-close">&times;</button>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function setupImageModal() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.getElementById('modalClose');
    
    if (!modal || !modalImage || !modalClose) return;
    
    // Close modal when clicking X button
    modalClose.addEventListener('click', closeImageModal);
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeImageModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeImageModal();
        }
    });
    
    // Add click listeners to all product images
    setupImageClickListeners();
}

function setupImageClickListeners() {
    // Wait a bit for products to be generated
    setTimeout(() => {
        const productImages = document.querySelectorAll('.product-image-carousel .image-container img');
        const machineryImages = document.querySelectorAll('.machine-image img');
        
        // Product images click listeners
        productImages.forEach(img => {
            img.addEventListener('click', function(e) {
                // Prevent triggering carousel navigation
                e.stopPropagation();
                openImageModal(this.src, this.alt);
            });
        });
        
        // Machinery images click listeners
        machineryImages.forEach(img => {
            img.addEventListener('click', function(e) {
                // Prevent triggering carousel navigation
                e.stopPropagation();
                openImageModal(this.src, this.alt);
            });
        });
    }, 100);
}

function openImageModal(imageSrc, imageAlt) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    if (!modal || !modalImage) return;
    
    modalImage.src = imageSrc;
    modalImage.alt = imageAlt;
    modal.classList.add('active');
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
    
    // Stop all auto-sliding when modal is open
    stopAutoSlide();
    stopProductAutoSlides();
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    
    if (!modal) return;
    
    modal.classList.remove('active');
    
    // Restore body scrolling
    document.body.style.overflow = '';
    
    // Restart auto-sliding when modal is closed (only if not blocked)
    if (!autoSlideBlocked) {
        restartAutoSlide();
    }
    startProductAutoSlides();
}

// ========== PRODUCT CAROUSEL FUNCTIONS ==========
function nextProductImage(button) {
    const imageContainer = button.closest('.product-image-carousel').querySelector('.image-container');
    const scrollAmount = imageContainer.clientWidth;
    imageContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    
    // Reset auto-slide timer for this specific carousel
    resetProductAutoSlide(button.closest('.product-item'));
}

function prevProductImage(button) {
    const imageContainer = button.closest('.product-image-carousel').querySelector('.image-container');
    const scrollAmount = imageContainer.clientWidth;
    imageContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    
    // Reset auto-slide timer for this specific carousel
    resetProductAutoSlide(button.closest('.product-item'));
}

// ========== PRODUCT AUTO-SLIDE FUNCTIONALITY ==========
function startProductAutoSlides() {
    const productCarousels = document.querySelectorAll('.product-item');
    
    productCarousels.forEach((productItem, index) => {
        const imageContainer = productItem.querySelector('.image-container');
        if (!imageContainer) return;
        
        const images = imageContainer.querySelectorAll('img');
        if (images.length <= 1) return; // Skip if only one image
        
        let currentImageIndex = 0;
        
        const interval = setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            const scrollAmount = imageContainer.clientWidth * currentImageIndex;
            imageContainer.scrollTo({ left: scrollAmount, behavior: 'smooth' });
        }, 5000); // 5 seconds
        
        productAutoSlideIntervals.set(productItem, interval);
    });
}

function stopProductAutoSlides() {
    productAutoSlideIntervals.forEach((interval) => {
        clearInterval(interval);
    });
    productAutoSlideIntervals.clear();
}

function resetProductAutoSlide(productItem) {
    if (productAutoSlideIntervals.has(productItem)) {
        clearInterval(productAutoSlideIntervals.get(productItem));
        
        const imageContainer = productItem.querySelector('.image-container');
        const images = imageContainer.querySelectorAll('img');
        if (images.length <= 1) return;
        
        // Get current scroll position to determine current image
        const scrollLeft = imageContainer.scrollLeft;
        const imageWidth = imageContainer.clientWidth;
        let currentImageIndex = Math.round(scrollLeft / imageWidth);
        
        const interval = setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            const scrollAmount = imageContainer.clientWidth * currentImageIndex;
            imageContainer.scrollTo({ left: scrollAmount, behavior: 'smooth' });
        }, 5000);
        
        productAutoSlideIntervals.set(productItem, interval);
    }
}

// ========== MACHINERY AUTO-SLIDE FUNCTIONALITY ==========
function startAutoSlide() {
    // Don't start auto-slide if blocked by expanded details
    if (autoSlideBlocked) return;
    
    autoMachinerySlideInterval = setInterval(() => {
        // Double-check if auto-slide is still allowed
        if (!autoSlideBlocked) {
            nextMachinerySlide();
        }
    }, 5000); // 5 seconds
}

function stopAutoSlide() {
    clearInterval(autoMachinerySlideInterval);
}

function restartAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

// ========== EVENT LISTENERS SETUP ==========
function setupEventListeners() {
    // Header scroll effect
    window.addEventListener('scroll', handleHeaderScroll);
    
    // Machinery carousel hover effects (desktop only)
    const machineryCarousel = document.querySelector('.machinery-carousel');
    if (machineryCarousel && window.innerWidth > 768) {
        machineryCarousel.addEventListener('mouseenter', () => {
            if (!autoSlideBlocked) stopAutoSlide();
        });
        machineryCarousel.addEventListener('mouseleave', () => {
            if (!autoSlideBlocked) restartAutoSlide();
        });
    }
    
    // Call touch events for machinery carousel (for all devices)
    if (machineryCarousel) {
        setupMachineryTouchEvents(machineryCarousel);
    }
    
    // Product carousels hover and touch events
    setupProductInteractionEvents();
    
    // Visibility change handling
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Window resize handler
    window.addEventListener('resize', debounce(handleWindowResize, 250));
}

// ========== WINDOW RESIZE HANDLER ==========
function handleWindowResize() {
    // Reset expanded state on resize to prevent UI issues
    if (expandedMachineIndex !== -1) {
        collapseMachineDetails(expandedMachineIndex);
    }
    
    // Reinitialize event listeners for machinery carousel based on new screen size
    const machineryCarousel = document.querySelector('.machinery-carousel');
    if (machineryCarousel) {
        // Remove existing event listeners and add new ones based on screen size
        machineryCarousel.removeEventListener('mouseenter', stopAutoSlide);
        machineryCarousel.removeEventListener('mouseleave', restartAutoSlide);
        
        if (window.innerWidth > 768) {
            machineryCarousel.addEventListener('mouseenter', () => {
                if (!autoSlideBlocked) stopAutoSlide();
            });
            machineryCarousel.addEventListener('mouseleave', () => {
                if (!autoSlideBlocked) restartAutoSlide();
            });
        }
    }
}

// ========== HEADER SCROLL EFFECT ==========
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    if (window.scrollY > 50) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
        header.style.borderBottom = '1px solid rgba(0, 255, 255, 0.3)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
        header.style.borderBottom = '1px solid rgba(0, 255, 255, 0.2)';
    }
}

// ========== TOUCH EVENTS SETUP ==========
function setupMachineryTouchEvents(carousel) {
    let startX = 0;
    let isDragging = false;

    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        if (!autoSlideBlocked) stopAutoSlide();
    });

    carousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        // Allow vertical scrolling by not preventing default
    });

    carousel.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        
        const endX = e.changedTouches[0].clientX;
        const deltaX = startX - endX;
        
        if (Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                nextMachinerySlide();
            } else {
                prevMachinerySlide();
            }
        }
        
        if (!autoSlideBlocked) restartAutoSlide();
    });
}

function setupProductInteractionEvents() {
    const productCarousels = document.querySelectorAll('.product-image-carousel');
    
    productCarousels.forEach(carousel => {
        const productItem = carousel.closest('.product-item');
        
        // Hover events for desktop
        carousel.addEventListener('mouseenter', () => {
            if (productAutoSlideIntervals.has(productItem)) {
                clearInterval(productAutoSlideIntervals.get(productItem));
            }
        });
        
        carousel.addEventListener('mouseleave', () => {
            resetProductAutoSlide(productItem);
        });
        
        // Touch events
        let startX = 0;
        let isDragging = false;

        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            // Stop auto-slide on touch
            if (productAutoSlideIntervals.has(productItem)) {
                clearInterval(productAutoSlideIntervals.get(productItem));
            }
        });

        carousel.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            // Allow vertical scrolling by not preventing default
        });

        carousel.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            
            const endX = e.changedTouches[0].clientX;
            const deltaX = startX - endX;
            
            if (Math.abs(deltaX) > 50) {
                const imageContainer = carousel.querySelector('.image-container');
                const scrollAmount = imageContainer.clientWidth;
                
                if (deltaX > 0) {
                    imageContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                } else {
                    imageContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                }
            }
            
            // Restart auto-slide after touch interaction
            resetProductAutoSlide(productItem);
        });
    });
}

// ========== SCROLL ANIMATIONS ==========
function setupScrollAnimations() {
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

    // Apply animation setup and observe elements
    const animatedElements = document.querySelectorAll('.section, .nav-card, .product-item, .info-card, .clients-section');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(element);
    });
}

// ========== VISIBILITY CHANGE HANDLING ==========
function handleVisibilityChange() {
    if (document.hidden) {
        stopAutoSlide();
        stopProductAutoSlides();
    } else {
        if (!autoSlideBlocked) restartAutoSlide();
        startProductAutoSlides();
    }
}

// ========== UTILITY FUNCTIONS ==========
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========== ERROR HANDLING ==========
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // Continue functioning even if there are errors
});

// ========== PERFORMANCE OPTIMIZATION ==========
// Debounced scroll handler for better performance
const debouncedScrollHandler = debounce(handleHeaderScroll, 10);
window.removeEventListener('scroll', handleHeaderScroll);
window.addEventListener('scroll', debouncedScrollHandler);