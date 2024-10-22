// whiskr.js

import './whiskr.css';

const Whiskr = (function () {
    // Default global options
    const defaultGlobalOptions = {
        maxToasts: 0, // 0 for unlimited
        queue: false,
        fontFamily: '', // Global font family
    };

    // Current global settings
    let globalOptions = { ...defaultGlobalOptions };

    // Default per-toast options
    const defaultOptions = {
        message: '',
        type: 'info', // 'success', 'error', 'info', 'warning'
        duration: 5000, // in milliseconds
        position: 'bottom-right', // 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'center', 'top-center', 'bottom-center'
        actionButtons: [], // Array of action button objects
        styles: {}, // Custom styles object
        borderColor: '', // Border color
        borderSides: [], // Array of sides: 'top', 'right', 'bottom', 'left'
        borderThickness: {}, // Border thickness per side (e.g., { top: '2px', right: '3px' })
        closeButtonStyle: 'right', // 'left', 'right', 'bar', 'none'
        closeButtonColor: '#fff', // Color of the close button or bar
        closeButtonContent: '&times;', // Custom content for close button
        textAlign: 'left', // 'left', 'center', 'right'
        customClass: '', // Custom class name(s)
        animationType: 'slide', // 'slide', 'fade', 'zoom', 'bounce', 'flip', 'rotate', 'none'
        animationDuration: 500, // in milliseconds
        animationEase: 'ease', // CSS easing function
        pauseOnHover: false, // Pause the auto-dismiss timer on hover
        onClose: null, // Callback when toast is closed
        html: '', // Custom HTML content
        focus: false, // Whether to focus the toast when it appears

        // New options for width and text overflow
        width: 'auto', // 'auto', 'full-width', or specific units like '300px', '50%', '20rem'
        textOverflow: 'wrap', // 'wrap', 'ellipsis', 'scroll'

        // **New Option for Custom Font**
        fontFamily: '', // Added for per-toast font
    };

    // Object to hold containers for each position
    const containers = {};

    // Object to keep track of toasts per container
    const toasts = {};

    /**
     * Function to set global settings
     * @param {object} options - Global settings to apply
     */
    function settings(options = {}) {
        // Merge provided options with existing globalOptions
        globalOptions = { ...globalOptions, ...options };
    }

    /**
     * Function to get or create a container for a specific position
     * @param {string} position - The position class for the container
     * @returns {HTMLElement} - The container element
     */
    function getContainer(position) {
        // If the container for this position already exists, return it
        if (containers[position]) {
            return containers[position];
        }

        // Otherwise, create a new container
        const container = document.createElement('div');
        container.className = `whiskr-js-container ${position}`;
        document.body.appendChild(container);

        // Store the container in the containers object
        containers[position] = container;
        toasts[position] = []; // Initialize the toasts array for this container

        return container;
    }

    /**
     * Function to apply hover and active styles to action buttons
     * @param {HTMLElement} button - The action button element
     * @param {object} action - The action button configuration
     */
    function applyButtonStates(button, action) {
        if (action.hoverColor) {
            button.addEventListener('mouseover', () => {
                button.style.backgroundColor = action.hoverColor;
            });
            button.addEventListener('mouseout', () => {
                button.style.backgroundColor = action.styles.backgroundColor;
            });
        }

        if (action.activeColor) {
            button.addEventListener('mousedown', () => {
                button.style.backgroundColor = action.activeColor;
            });
            button.addEventListener('mouseup', () => {
                button.style.backgroundColor = action.hoverColor || action.styles.backgroundColor;
            });
        }
    }

    /**
     * Helper to create a whiskr element
     * @param {object} options - Options for the toast
     * @param {function} removeWhiskr - Function to remove the toast
     * @returns {HTMLElement} - The created toast element
     */
    function createWhiskr(options, removeWhiskr) {
        const whiskr = document.createElement('div');
        whiskr.className = `whiskr-js ${options.type} ${options.customClass} text-${options.textAlign}`.trim();

        // Apply custom styles if provided
        if (options.styles && typeof options.styles === 'object') {
            for (let [key, value] of Object.entries(options.styles)) {
                if (key.toLowerCase() === 'fontsize') {
                    whiskr.style.fontSize = value; // Directly set fontSize without conversion
                } else {
                    whiskr.style[key] = value;
                }
            }
        }

        // **Apply Custom Font if Specified**
        if (options.fontFamily) {
            whiskr.style.fontFamily = options.fontFamily;
        } else if (globalOptions.fontFamily) { // Apply global font if set and per-toast font is not set
            whiskr.style.fontFamily = globalOptions.fontFamily;
        }

        // Apply border customization
        if (options.borderColor && options.borderSides.length > 0 && Object.keys(options.borderThickness).length > 0) {
            options.borderSides.forEach(side => {
                const borderProperty = `border-${side}`;
                const thickness = options.borderThickness[side] || '';
                if (thickness) {
                    whiskr.style[borderProperty] = `${thickness} solid ${options.borderColor}`;
                }
            });
        }

        // Apply width customization
        if (options.width) {
            if (options.width === 'full-width') {
                whiskr.style.width = '100%';
            } else if (options.width === 'auto') {
                whiskr.style.width = 'auto';
            } else {
                whiskr.style.width = options.width;
            }
        }

        // Create message span
        const messageSpan = document.createElement('span');
        if (options.html) {
            messageSpan.innerHTML = options.html;
        } else {
            messageSpan.textContent = options.message;
        }

        if (options.textOverflow === 'wrap') {
            messageSpan.style.whiteSpace = 'normal';
            messageSpan.style.overflow = 'visible';
        } else if (options.textOverflow === 'ellipsis') {
            messageSpan.style.whiteSpace = 'nowrap';
            messageSpan.style.overflow = 'hidden';
            messageSpan.style.textOverflow = 'ellipsis';
        } else if (options.textOverflow === 'scroll') {
            messageSpan.style.whiteSpace = 'nowrap';
            messageSpan.style.overflowX = 'auto';
            messageSpan.classList.add('scrollable-text');
        }

        whiskr.appendChild(messageSpan);

        // Action Buttons
        if (Array.isArray(options.actionButtons) && options.actionButtons.length > 0) {
            const actionsContainer = document.createElement('div');
            actionsContainer.className = 'whiskr-js-actions';

            options.actionButtons.forEach((action, index) => {
                if (!action.text || typeof action.onClick !== 'function') {
                    console.warn(`Whiskr-js: Action button at index ${index} is missing 'text' or 'onClick' property.`);
                    return;
                }

                const actionBtn = document.createElement('button');
                actionBtn.className = 'whiskr-js-action-btn';
                actionBtn.textContent = action.text;

                // Apply custom action button styles if provided
                if (action.styles && typeof action.styles === 'object') {
                    for (let [key, value] of Object.entries(action.styles)) {
                        if (key.toLowerCase() === 'fontsize') {
                            actionBtn.style.fontSize = value; // Directly set fontSize without conversion
                        } else {
                            actionBtn.style[key] = value;
                        }
                    }
                }

                // Apply hover and active states if specified
                applyButtonStates(actionBtn, action);

                // Event listener for action button
                actionBtn.onclick = () => {
                    action.onClick();
                    removeWhiskr(whiskr);
                };

                actionsContainer.appendChild(actionBtn);
            });

            whiskr.appendChild(actionsContainer);
        }

        // Accessibility Attributes
        whiskr.setAttribute('role', 'alert');
        whiskr.setAttribute('aria-live', 'assertive');
        whiskr.setAttribute('aria-atomic', 'true');

        // Handle Close Button Styles
        let wrapper = null;

        if (options.closeButtonStyle === 'bar') {
            // Create a separate Close Bar above the snackbar
            const closeBar = document.createElement('div');
            closeBar.className = 'whiskr-js-close-bar';
            closeBar.style.backgroundColor = options.closeButtonColor; // Apply color
            closeBar.setAttribute('aria-label', 'Close notification'); // Accessibility
            closeBar.tabIndex = 0; // Make it focusable

            // Event listeners for click and keyboard
            closeBar.addEventListener('click', () => removeWhiskr(wrapper || whiskr));
            closeBar.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    removeWhiskr(wrapper || whiskr);
                }
            });

            // Create a wrapper to hold both the close bar and the snackbar
            wrapper = document.createElement('div');
            wrapper.className = 'whiskr-js-wrapper with-close-bar';

            wrapper.appendChild(closeBar);
            wrapper.appendChild(whiskr);

            return wrapper; // Return the wrapper containing both elements
        } else if (options.closeButtonStyle === 'left' || options.closeButtonStyle === 'right') {
            // Create Close Button positioned externally
            const closeBtn = document.createElement('button');
            closeBtn.className = 'whiskr-js-close-btn external';
            closeBtn.innerHTML = options.closeButtonContent;
            closeBtn.style.color = options.closeButtonColor; // Apply color
            closeBtn.setAttribute('aria-label', 'Close notification'); // Accessibility
            closeBtn.tabIndex = 0; // Make it focusable

            // Event listeners for click and keyboard
            closeBtn.addEventListener('click', () => removeWhiskr(wrapper || whiskr));
            closeBtn.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    removeWhiskr(wrapper || whiskr);
                }
            });

            // Create a wrapper to hold both the snackbar and the external close button
            wrapper = document.createElement('div');
            wrapper.className = 'whiskr-js-wrapper';
            wrapper.style.display = 'flex';
            wrapper.style.alignItems = 'center';
            wrapper.style.gap = '8px';

            if (options.closeButtonStyle === 'left') {
                wrapper.appendChild(closeBtn);
                wrapper.appendChild(whiskr);
            } else {
                wrapper.appendChild(whiskr);
                wrapper.appendChild(closeBtn);
            }

            return wrapper; // Return the wrapper containing both elements
        } else if (options.closeButtonStyle === 'none') {
            // Do not add a close button
        } else {
            // Default to internal close button on the right
            const closeBtn = document.createElement('button');
            closeBtn.className = 'whiskr-js-close-btn';
            closeBtn.innerHTML = options.closeButtonContent;
            closeBtn.style.color = options.closeButtonColor; // Apply color
            closeBtn.setAttribute('aria-label', 'Close notification'); // Accessibility
            closeBtn.tabIndex = 0; // Make it focusable

            // Event listeners for click and keyboard
            closeBtn.addEventListener('click', () => removeWhiskr(whiskr));
            closeBtn.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    removeWhiskr(whiskr);
                }
            });

            whiskr.appendChild(closeBtn);
        }

        return whiskr;
    }

    /**
     * Function to show a whiskr
     * @param {object} options - Options for the toast
     */
    function show(options = {}) {
        // Merge default options with global options and user options
        const opts = { ...defaultOptions, ...globalOptions, ...options };

        // Validate and sanitize options
        opts.type = ['success', 'error', 'info', 'warning'].includes(opts.type) ? opts.type : 'info';
        opts.position = ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'center', 'top-center', 'bottom-center'].includes(opts.position)
            ? opts.position
            : 'bottom-right';
        opts.duration = typeof opts.duration === 'number' && opts.duration >= 0 ? opts.duration : 5000;
        opts.borderSides = Array.isArray(opts.borderSides) ? opts.borderSides : [];
        opts.borderThickness = (typeof opts.borderThickness === 'object' && opts.borderThickness !== null) ? opts.borderThickness : {};
        opts.closeButtonStyle = ['left', 'right', 'bar', 'none'].includes(opts.closeButtonStyle) ? opts.closeButtonStyle : 'right';
        opts.closeButtonColor = typeof opts.closeButtonColor === 'string' && opts.closeButtonColor.trim() !== '' ? opts.closeButtonColor : '#fff';
        opts.textAlign = ['left', 'center', 'right'].includes(opts.textAlign) ? opts.textAlign : 'left';

        // Validate width
        const validWidthPatterns = /^(auto|full-width|\d+(\.\d+)?(px|rem|%))$/;
        if (!validWidthPatterns.test(opts.width)) {
            console.warn(`Whiskr-js: Invalid width "${opts.width}". Falling back to "auto".`);
            opts.width = 'auto';
        }

        // Validate textOverflow
        const validTextOverflow = ['wrap', 'ellipsis', 'scroll'];
        if (!validTextOverflow.includes(opts.textOverflow)) {
            console.warn(`Whiskr-js: Invalid textOverflow "${opts.textOverflow}". Falling back to "wrap".`);
            opts.textOverflow = 'wrap';
        }

        // Validate actionButtons
        if (!Array.isArray(opts.actionButtons)) {
            console.warn(`Whiskr-js: 'actionButtons' should be an array. Falling back to empty array.`);
            opts.actionButtons = [];
        }

        // Get or create the container for the specified position
        const container = getContainer(opts.position);

        // Determine current number of toasts in this container
        const currentToasts = toasts[opts.position].length;

        // Check against global maxToasts
        if (globalOptions.maxToasts > 0 && currentToasts >= globalOptions.maxToasts) {
            if (globalOptions.queue) {
                // Queue the toast to be shown later
                setTimeout(() => {
                    show(options);
                }, opts.duration);
                return;
            } else {
                // Do not show the new toast
                return;
            }
        }

        // Define removeWhiskr function
        function removeWhiskr(whiskrElement) {
            hideWhiskr(whiskrElement);
        }

        // Create whiskr element (could be the wrapper)
        const whiskrElement = createWhiskr(opts, removeWhiskr);
        container.appendChild(whiskrElement);
        toasts[opts.position].push(whiskrElement);

        // Apply custom animations
        applyAnimation(whiskrElement, opts, 'in');

        // Auto-remove after duration (if duration > 0)
        let timer;
        if (opts.duration > 0) {
            timer = setTimeout(() => {
                hideWhiskr(whiskrElement);
            }, opts.duration);
        }

        // Pause on hover
        if (opts.pauseOnHover && opts.duration > 0) {
            whiskrElement.addEventListener('mouseenter', () => {
                clearTimeout(timer);
            });
            whiskrElement.addEventListener('mouseleave', () => {
                timer = setTimeout(() => {
                    hideWhiskr(whiskrElement);
                }, opts.duration);
            });
        }

        // Focus management
        if (opts.focus) {
            whiskrElement.setAttribute('tabindex', '-1');
            whiskrElement.focus();
        }

        // Function to hide the whiskr
        function hideWhiskr(whiskrElementToHide) {
            if (whiskrElementToHide && !whiskrElementToHide._isRemoving) {
                whiskrElementToHide._isRemoving = true;

                applyAnimation(whiskrElementToHide, opts, 'out');

                const transitionEndHandler = () => {
                    // Store reference to parent before removing
                    const parent = whiskrElementToHide.parentElement;

                    if (parent) {
                        parent.removeChild(whiskrElementToHide);
                        const index = toasts[opts.position].indexOf(whiskrElementToHide);
                        if (index > -1) {
                            toasts[opts.position].splice(index, 1);
                        }

                        if (parent.children.length === 0) {
                            delete containers[opts.position];
                            parent.remove();
                        }
                    }

                    // Call onClose callback if provided
                    if (typeof opts.onClose === 'function') {
                        opts.onClose();
                    }
                };

                // Remove event listener before adding new one to prevent multiple triggers
                whiskrElementToHide.removeEventListener('animationend', whiskrElementToHide._animationEndHandler);
                whiskrElementToHide._animationEndHandler = transitionEndHandler;

                whiskrElementToHide.addEventListener('animationend', transitionEndHandler, { once: true });

                if (timer) clearTimeout(timer);
            }
        }

        return;
    }

    /**
     * Function to apply animations
     * @param {HTMLElement} element - The toast element
     * @param {object} options - Options for the toast
     * @param {string} direction - 'in' or 'out'
     */
    function applyAnimation(element, options, direction) {
        const animationType = options.animationType;
        const duration = options.animationDuration;
        const ease = options.animationEase;

        let animationClass = '';

        if (animationType === 'fade') {
            animationClass = `whiskr-fade-${direction}`;
        } else if (animationType === 'zoom') {
            animationClass = `whiskr-zoom-${direction}`;
        } else if (animationType === 'slide') {
            animationClass = `whiskr-slide-${direction}`;
        }
        // **New Animation Types**
        else if (animationType === 'bounce') {
            animationClass = `whiskr-bounce-${direction}`;
        } else if (animationType === 'flip') {
            animationClass = `whiskr-flip-${direction}`;
        } else if (animationType === 'rotate') {
            animationClass = `whiskr-rotate-${direction}`;
        }
        else {
            // No animation, but ensure element is visible
            if (direction === 'in') {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            } else {
                element.style.opacity = '0';
                element.style.transform = 'translateY(100%)';
            }
            return;
        }

        // Set custom properties for animation duration and easing
        element.style.setProperty('--whiskr-animation-duration', `${duration}ms`);
        element.style.setProperty('--whiskr-animation-ease', ease);

        element.classList.add(animationClass);
    }

    return {
        show,
        settings, // Expose the settings method
    };
})();
export default Whiskr;
