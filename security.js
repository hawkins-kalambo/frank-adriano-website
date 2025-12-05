// ============================================
// FRANK ADRIANO WEBSITE - SECURITY MODULE
// ============================================
// This file contains security enhancements to protect against common web vulnerabilities

// =======================
// 1. INPUT SANITIZATION
// =======================

/**
 * Sanitize HTML content to prevent XSS attacks
 * @param {string} text - The text to sanitize
 * @returns {string} - Sanitized text
 */
function sanitizeHTML(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return String(text).replace(/[&<>"']/g, m => map[m]);
}

/**
 * Sanitize user input for safe display
 * @param {string} input - User input
 * @returns {string} - Sanitized input
 */
function sanitizeUserInput(input) {
    if (!input || typeof input !== 'string') return '';
    return sanitizeHTML(input.trim().slice(0, 500)); // Limit length to prevent abuse
}

// =======================
// 2. URL VALIDATION
// =======================

/**
 * Check if a URL uses a safe protocol
 * @param {string} href - The URL to check
 * @returns {boolean} - True if safe
 */
function isSafeHref(href) {
    if (!href || typeof href !== 'string') return false;
    const safeProtocols = ['http://', 'https://', '#', 'mailto:', 'tel:', 'wa.me/'];
    return safeProtocols.some(protocol => href.toLowerCase().startsWith(protocol));
}

/**
 * Safely escape CSS selectors
 * @param {string} str - The string to escape
 * @returns {string} - Escaped string
 */
function escapeCSSSelector(str) {
    return CSS.escape(String(str));
}

// =======================
// 3. FORM VALIDATION & SECURITY
// =======================

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(String(email).toLowerCase());
}

/**
 * Validate form input length
 * @param {string} input - Input to validate
 * @param {number} minLength - Minimum length
 * @param {number} maxLength - Maximum length
 * @returns {boolean} - True if valid
 */
function validateInputLength(input, minLength = 2, maxLength = 500) {
    const length = String(input).trim().length;
    return length >= minLength && length <= maxLength;
}

/**
 * Validate message content (prevent spam patterns)
 * @param {string} message - Message to validate
 * @returns {boolean} - True if appears safe
 */
function validateMessage(message) {\n    const msg = String(message).toLowerCase();\n    // Block common spam patterns\n    const spamPatterns = [\n        /viagra|cialis|casino|lottery/gi,\n        /http[s]?:\\/\\//gi, // URLs in messages\n        /(shit|fuck|ass|damn)/gi // Excessive profanity\n    ];\n    return !spamPatterns.some(pattern => pattern.test(msg));\n}\n\n// =======================\n// 4. ENHANCED FORM HANDLING\n// =======================\n\n/**\n * Securely submit form data\n * @param {Event} event - Form submit event\n */\nfunction secureFormSubmit(event) {\n    event.preventDefault();\n    const form = event.target;\n    \n    // Validate form existence\n    if (!form || form.tagName !== 'FORM') return false;\n    \n    // Get and sanitize form data\n    const formData = new FormData(form);\n    const data = {};\n    \n    for (let [key, value] of formData.entries()) {\n        // Whitelist allowed fields\n        if (['name', 'email', 'message'].includes(key)) {\n            data[key] = sanitizeUserInput(value);\n        }\n    }\n    \n    // Validate all required fields\n    if (!data.name || !data.email || !data.message) {\n        console.warn('Form validation failed: Missing required fields');\n        return false;\n    }\n    \n    // Additional validation\n    if (!validateEmail(data.email)) {\n        console.warn('Form validation failed: Invalid email');\n        return false;\n    }\n    \n    if (!validateInputLength(data.name, 2, 100)) {\n        console.warn('Form validation failed: Invalid name length');\n        return false;\n    }\n    \n    if (!validateInputLength(data.message, 5, 1000)) {\n        console.warn('Form validation failed: Invalid message length');\n        return false;\n    }\n    \n    if (!validateMessage(data.message)) {\n        console.warn('Form validation failed: Message appears to contain spam');\n        return false;\n    }\n    \n    // If all validations pass, proceed with form submission\n    console.log('Form validation passed');\n    return true;\n}\n\n// =======================\n// 5. SAFE ELEMENT SELECTION\n// =======================\n\n/**\n * Safely select an element by ID\n * @param {string} id - Element ID\n * @returns {Element|null} - The element or null\n */\nfunction getSafeElementById(id) {\n    if (!id || typeof id !== 'string') return null;\n    try {\n        return document.getElementById(escapeCSSSelector(id));\n    } catch (e) {\n        console.error('Error selecting element:', e);\n        return null;\n    }\n}\n\n/**\n * Safely query selector\n * @param {string} selector - CSS selector\n * @returns {Element|null} - The element or null\n */\nfunction getSafeElement(selector) {\n    if (!selector || typeof selector !== 'string') return null;\n    try {\n        return document.querySelector(selector);\n    } catch (e) {\n        console.error('Invalid selector:', e);\n        return null;\n    }\n}\n\n// =======================\n// 6. EVENT SECURITY\n// =======================\n\n/**\n * Prevent clickjacking and unauthorized interactions\n */\nfunction preventClickjacking() {\n    if (window.self !== window.top) {\n        window.top.location = window.self.location;\n    }\n}\n\n/**\n * Disable right-click context menu (optional, can be removed for user experience)\n */\nfunction disableContextMenu() {\n    // Note: This is optional and not recommended for modern sites\n    // Keeping commented for reference\n    // document.addEventListener('contextmenu', (e) => e.preventDefault());\n}\n\n// =======================\n// 7. DATA PROTECTION\n// =======================\n\n/**\n * Never log sensitive data\n */\nfunction secureLogs() {\n    // Remove any console logging that might expose sensitive data\n    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {\n        console.log = function() {};\n        console.debug = function() {};\n    }\n}\n\n/**\n * Disable autofill for sensitive fields (optional)\n */\nfunction disableAutofill() {\n    // In this case, autofill is not a concern as we don't collect sensitive data\n    // But included for reference\n}\n\n// =======================\n// 8. INITIALIZATION\n// =======================\n\n/**\n * Initialize all security measures\n */\nfunction initializeSecurityMeasures() {\n    // Run on page load\n    if (document.readyState === 'loading') {\n        document.addEventListener('DOMContentLoaded', function() {\n            preventClickjacking();\n            secureLogs();\n        });\n    } else {\n        preventClickjacking();\n        secureLogs();\n    }\n}\n\n// Start security measures\ninitializeSecurityMeasures();\n\n// =======================\n// 9. EXPORT FOR USE\n// =======================\n\nwindow.Security = {\n    sanitizeHTML,\n    sanitizeUserInput,\n    isSafeHref,\n    escapeCSSSelector,\n    validateEmail,\n    validateInputLength,\n    validateMessage,\n    secureFormSubmit,\n    getSafeElementById,\n    getSafeElement,\n    preventClickjacking,\n    disableContextMenu,\n    secureLogs\n};\n