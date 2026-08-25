'use client';

import { useEffect, useRef } from 'react';

export default function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current || document;

    function revealElements() {
      const elements = root.querySelectorAll('[data-reveal]:not(.revealed)');
      elements.forEach((el) => observer.observe(el));
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: options.threshold || 0,
        rootMargin: options.rootMargin || '0px 0px 50px 0px',
      }
    );

    revealElements();

    const fallback = setTimeout(() => {
      root.querySelectorAll('[data-reveal]:not(.revealed)').forEach((el) => {
        el.classList.add('revealed');
      });
    }, 1000);

    const mutObs = new MutationObserver(() => {
      revealElements();
    });
    mutObs.observe(root === document ? document.body : root, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutObs.disconnect();
      clearTimeout(fallback);
    };
  }, [options.threshold, options.rootMargin]);
}
