// Lazy Loading Directive for Images
const imageObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target

        // Load the actual image
        if (img.dataset.src) {
          img.src = img.dataset.src
          img.removeAttribute('data-src')
        }

        // Load srcset for responsive images
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset
          img.removeAttribute('data-srcset')
        }

        // Add loaded class for animations
        img.classList.add('lazy-loaded')

        // Stop observing this image
        imageObserver.unobserve(img)
      }
    })
  },
  {
    // Start loading when image is 50px away from viewport
    rootMargin: '50px',
    threshold: 0.01
  }
)

// Vue directive
export default {
  mounted(el) {
    // Add loading class
    el.classList.add('lazy-loading')

    // Set up placeholder/blur effect
    if (!el.style.backgroundColor) {
      el.style.backgroundColor = '#f3f4f6'
    }

    // Start observing
    imageObserver.observe(el)
  },

  unmounted(el) {
    imageObserver.unobserve(el)
  }
}

// CSS classes for smooth transitions
export const lazyLoadStyles = `
  .lazy-loading {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  .lazy-loaded {
    opacity: 1;
  }

  .lazy-loading::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 50%, #f3f4f6 100%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`