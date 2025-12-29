document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    const animationContainer = document.getElementById('lottie-animation');
    
    if (!animationContainer) {
        console.error('Animation container not found!');
        return;
    }

    // Add loading class to container
    animationContainer.classList.add('loading');
    
    // Animation configuration
    const animationConfig = {
        container: animationContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'animation.json',
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid meet',
            progressiveLoad: true,
            hideOnTransparent: true
        }
    };

    try {
        console.log('Attempting to load animation...');
        const anim = lottie.loadAnimation(animationConfig);

        // Animation event handlers
        anim.addEventListener('DOMLoaded', function() {
            console.log('Animation loaded successfully');
            animationContainer.classList.remove('loading');
            animationContainer.classList.add('loaded');
            document.querySelector('.content').style.opacity = '1';
        });

        anim.addEventListener('data_failed', function() {
            console.error('Failed to load animation data');
            animationContainer.innerHTML = '<div class="error">Failed to load animation. Please check console for details.</div>';
            animationContainer.classList.remove('loading');
            animationContainer.classList.add('error');
        });

        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                anim.resize();
            }, 250);
        });

    } catch (error) {
        console.error('Error initializing animation:', error);
        animationContainer.innerHTML = `<div class="error">Animation error: ${error.message}</div>`;
        animationContainer.classList.remove('loading');
        animationContainer.classList.add('error');
    }
});
