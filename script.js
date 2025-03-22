// Function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to handle scroll animations
function handleScrollAnimations() {
    const animatedElements = document.querySelectorAll('.box, .mission-box, .roadmap-item, .roadmap-content, #inputBox, #suggestion, #practices');
    
    animatedElements.forEach(element => {
        if (isInViewport(element)) {
            element.classList.add('visible');
            // If it's a roadmap item, also make the container visible
            if (element.classList.contains('roadmap-item')) {
                const container = element.closest('.roadmap-container');
                if (container) {
                    container.classList.add('visible');
                }
            }
        }
    });
}

// Add event listeners for scroll and load
window.addEventListener('scroll', handleScrollAnimations);
window.addEventListener('load', handleScrollAnimations); 