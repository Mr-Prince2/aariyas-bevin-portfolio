import { useEffect } from 'react';

const useFadeUp = () => {
  useEffect(() => {
    const fadeEls = document.querySelectorAll('.fade-up');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optional: Stop observing once visible to save resources
          observer.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px' // Triggers slightly before element enters view
    });

    fadeEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

export default useFadeUp;