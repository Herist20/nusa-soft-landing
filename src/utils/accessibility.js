// Accessibility Utilities

// Skip to main content link
export function addSkipToContent() {
  const skipLink = document.createElement('a')
  skipLink.href = '#main-content'
  skipLink.className = 'skip-to-content'
  skipLink.textContent = 'Skip to main content'
  skipLink.setAttribute('aria-label', 'Skip navigation and go to main content')

  // Add futuristic styles that match the current theme
  const styles = `
    .skip-to-content {
      position: absolute;
      top: -100px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, rgba(6, 182, 212, 0.9), rgba(59, 130, 246, 0.9));
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      color: white;
      padding: 16px 32px;
      text-decoration: none;
      z-index: 100000;
      border-radius: 12px;
      border: 2px solid rgba(6, 182, 212, 0.5);
      font-weight: 600;
      font-size: 16px;
      font-family: 'Inter', sans-serif;
      box-shadow:
        0 8px 32px rgba(6, 182, 212, 0.3),
        0 0 0 1px rgba(255, 255, 255, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      letter-spacing: 0.5px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    .skip-to-content:focus {
      top: 20px;
      transform: translateX(-50%) scale(1.05);
      background: linear-gradient(135deg, rgba(6, 182, 212, 1), rgba(59, 130, 246, 1));
      border-color: rgba(6, 182, 212, 0.8);
      box-shadow:
        0 12px 48px rgba(6, 182, 212, 0.4),
        0 0 0 1px rgba(255, 255, 255, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.3),
        0 0 20px rgba(6, 182, 212, 0.5);
      outline: none;
    }

    .skip-to-content:hover {
      background: linear-gradient(135deg, rgba(6, 182, 212, 1), rgba(59, 130, 246, 1));
      transform: translateX(-50%) translateY(-2px);
      border-color: rgba(6, 182, 212, 0.7);
    }

    /* Add glow animation */
    .skip-to-content::before {
      content: '';
      position: absolute;
      inset: -2px;
      background: linear-gradient(135deg, rgba(6, 182, 212, 0.6), rgba(59, 130, 246, 0.6));
      border-radius: 14px;
      z-index: -1;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .skip-to-content:focus::before {
      opacity: 1;
      animation: pulse-glow 2s ease-in-out infinite;
    }

    @keyframes pulse-glow {
      0%, 100% {
        transform: scale(1);
        opacity: 0.6;
      }
      50% {
        transform: scale(1.1);
        opacity: 0.8;
      }
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .skip-to-content {
        padding: 12px 24px;
        font-size: 14px;
        border-radius: 10px;
      }
    }
  `

  const styleSheet = document.createElement('style')
  styleSheet.textContent = styles
  document.head.appendChild(styleSheet)

  document.body.insertBefore(skipLink, document.body.firstChild)
}

// Manage focus for modals and overlays
export function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
  )

  const firstFocusableElement = focusableElements[0]
  const lastFocusableElement = focusableElements[focusableElements.length - 1]

  element.addEventListener('keydown', (e) => {
    const isTabPressed = e.key === 'Tab'

    if (!isTabPressed) return

    if (e.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus()
        e.preventDefault()
      }
    } else {
      if (document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus()
        e.preventDefault()
      }
    }
  })

  firstFocusableElement?.focus()
}

// Announce dynamic content changes to screen readers
export function announceToScreenReader(message, priority = 'polite') {
  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', priority)
  announcement.setAttribute('aria-atomic', 'true')
  announcement.style.position = 'absolute'
  announcement.style.left = '-10000px'
  announcement.style.width = '1px'
  announcement.style.height = '1px'
  announcement.style.overflow = 'hidden'

  announcement.textContent = message
  document.body.appendChild(announcement)

  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

// Keyboard navigation enhancement
export function enhanceKeyboardNavigation() {
  // Add visible focus indicators
  const focusStyles = `
    *:focus {
      outline: 2px solid #3B82F6 !important;
      outline-offset: 2px !important;
    }

    button:focus,
    a:focus,
    input:focus,
    select:focus,
    textarea:focus {
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5) !important;
    }

    .focus-visible:focus:not(:focus-visible) {
      outline: none !important;
      box-shadow: none !important;
    }
  `

  const styleSheet = document.createElement('style')
  styleSheet.textContent = focusStyles
  document.head.appendChild(styleSheet)

  // Handle keyboard navigation for custom components
  document.addEventListener('keydown', (e) => {
    // Escape key closes modals
    if (e.key === 'Escape') {
      const openModal = document.querySelector('[role="dialog"][aria-hidden="false"]')
      if (openModal) {
        const closeButton = openModal.querySelector('[aria-label*="Close"]')
        closeButton?.click()
      }
    }

    // Arrow keys for navigation menus
    if (e.key.startsWith('Arrow')) {
      const menu = e.target.closest('[role="menu"]')
      if (menu) {
        handleMenuKeyboard(e, menu)
      }
    }
  })
}

// Handle keyboard navigation in menus
function handleMenuKeyboard(event, menu) {
  const items = Array.from(menu.querySelectorAll('[role="menuitem"]'))
  const currentIndex = items.indexOf(document.activeElement)

  let nextIndex = currentIndex

  switch (event.key) {
    case 'ArrowDown':
      nextIndex = currentIndex + 1 < items.length ? currentIndex + 1 : 0
      break
    case 'ArrowUp':
      nextIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : items.length - 1
      break
    case 'Home':
      nextIndex = 0
      break
    case 'End':
      nextIndex = items.length - 1
      break
    default:
      return
  }

  event.preventDefault()
  items[nextIndex]?.focus()
}

// Add ARIA labels dynamically
export function enhanceARIA() {
  // Add ARIA labels to icons without text
  document.querySelectorAll('svg:not([aria-label])').forEach((svg) => {
    const parent = svg.parentElement
    if (parent && !parent.textContent.trim()) {
      svg.setAttribute('aria-label', 'Decorative icon')
      svg.setAttribute('role', 'img')
    }
  })

  // Add ARIA labels to form fields
  document.querySelectorAll('input, select, textarea').forEach((field) => {
    if (!field.getAttribute('aria-label') && !field.getAttribute('aria-labelledby')) {
      const label = document.querySelector(`label[for="${field.id}"]`)
      if (label) {
        field.setAttribute('aria-labelledby', label.id || `label-${field.id}`)
      } else {
        const placeholder = field.getAttribute('placeholder')
        if (placeholder) {
          field.setAttribute('aria-label', placeholder)
        }
      }
    }

    // Add aria-required for required fields
    if (field.hasAttribute('required')) {
      field.setAttribute('aria-required', 'true')
    }

    // Add aria-invalid for fields with errors
    if (field.classList.contains('error') || field.classList.contains('invalid')) {
      field.setAttribute('aria-invalid', 'true')
    }
  })

  // Add ARIA labels to buttons with only icons
  document.querySelectorAll('button').forEach((button) => {
    if (!button.getAttribute('aria-label') && !button.textContent.trim()) {
      const svg = button.querySelector('svg')
      if (svg) {
        button.setAttribute('aria-label', 'Action button')
      }
    }
  })

  // Add role and ARIA attributes to navigation
  const nav = document.querySelector('nav:not([role])')
  if (nav) {
    nav.setAttribute('role', 'navigation')
    nav.setAttribute('aria-label', 'Main navigation')
  }

  // Add landmarks
  const main = document.querySelector('main:not([role])')
  if (main) {
    main.setAttribute('role', 'main')
    main.setAttribute('id', 'main-content')
  }

  const footer = document.querySelector('footer:not([role])')
  if (footer) {
    footer.setAttribute('role', 'contentinfo')
  }
}

// Check color contrast
export function checkColorContrast(foreground, background) {
  // Convert hex to RGB
  const getRGB = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  // Calculate relative luminance
  const getLuminance = (rgb) => {
    const { r, g, b } = rgb
    const sRGB = [r, g, b].map((value) => {
      value = value / 255
      if (value <= 0.03928) {
        value = value / 12.92
      } else {
        value = Math.pow((value + 0.055) / 1.055, 2.4)
      }
      return value
    })
    return sRGB[0] * 0.2126 + sRGB[1] * 0.7152 + sRGB[2] * 0.0722
  }

  const fgRGB = getRGB(foreground)
  const bgRGB = getRGB(background)

  if (!fgRGB || !bgRGB) return null

  const l1 = getLuminance(fgRGB)
  const l2 = getLuminance(bgRGB)

  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)

  const contrastRatio = (lighter + 0.05) / (darker + 0.05)

  return {
    ratio: contrastRatio.toFixed(2),
    wcagAA: contrastRatio >= 4.5,
    wcagAAA: contrastRatio >= 7,
    wcagAALarge: contrastRatio >= 3,
    wcagAAALarge: contrastRatio >= 4.5
  }
}

// Prefers reduced motion
export function respectMotionPreference() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

  function handleMotionPreference() {
    if (prefersReducedMotion.matches) {
      document.documentElement.classList.add('reduce-motion')
    } else {
      document.documentElement.classList.remove('reduce-motion')
    }
  }

  handleMotionPreference()
  prefersReducedMotion.addEventListener('change', handleMotionPreference)

  // Add CSS for reduced motion
  const styles = `
    .reduce-motion * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  `

  const styleSheet = document.createElement('style')
  styleSheet.textContent = styles
  document.head.appendChild(styleSheet)
}

// Initialize all accessibility features
export function initializeAccessibility() {
  addSkipToContent()
  enhanceKeyboardNavigation()
  enhanceARIA()
  respectMotionPreference()
}

// Export utilities
export default {
  addSkipToContent,
  trapFocus,
  announceToScreenReader,
  enhanceKeyboardNavigation,
  enhanceARIA,
  checkColorContrast,
  respectMotionPreference,
  initializeAccessibility
}