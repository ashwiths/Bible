// hooks/useScrollReveal.js
// Watches elements and adds the "visible" class when they scroll into view

import { useEffect } from 'react';

const useScrollReveal = (selector = '.reveal', options = {}) => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optionally stop observing after first reveal for performance
          if (options.once !== false) observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: options.threshold || 0.12,
      rootMargin: options.rootMargin || '0px 0px -60px 0px',
    });

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selector, options.threshold]);
};

export default useScrollReveal;
