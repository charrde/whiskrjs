# WhiskrJS

WhiskrJS is a highly customizable toast/snackbar library for modern web applications. It enables developers to display non-blocking notifications with extensive customization options, including styles, animations, positions, action buttons, and more.

## WhiskrJS Demo

Want to test out all the features? [Click here to check out a demo!](https://whiskr.patski.dev/)


## Table of Contents

- [WhiskrJS](#whiskrjs)
  - [WhiskrJS Demo](#whiskrjs-demo)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
    - [Via NPM](#via-npm)
    - [Via CDN](#via-cdn)
  - [Getting Started](#getting-started)
    - [Importing WhiskrJS](#importing-whiskrjs)
      - [ES Modules (Recommended)](#es-modules-recommended)
      - [CommonJS](#commonjs)
      - [UMD (Browser Global)](#umd-browser-global)
    - [Basic Usage](#basic-usage)
  - [API Reference](#api-reference)
    - [Whiskr.show(options)](#whiskrshowoptions)
      - [Parameters:](#parameters)
  - [Options](#options)
    - [message](#message)
    - [html](#html)
    - [type](#type)
    - [duration](#duration)
    - [position](#position)
    - [styles](#styles)
    - [borderColor](#bordercolor)
    - [borderSides](#bordersides)
    - [borderThickness](#borderthickness)
    - [closeButtonStyle](#closebuttonstyle)
    - [closeButtonColor](#closebuttoncolor)
    - [closeButtonContent](#closebuttoncontent)
    - [textAlign](#textalign)
    - [animationType](#animationtype)
    - [animationDuration](#animationduration)
    - [pauseOnHover](#pauseonhover)
    - [width](#width)
    - [textOverflow](#textoverflow)
    - [actionButtons](#actionbuttons)
  - [Whiskr.settings(options)](#whiskrsettingsoptions)
    - [Global Settings Options](#global-settings-options)
  - [Examples](#examples)
    - [Simple Notification](#simple-notification)
    - [Custom Styled Notification](#custom-styled-notification)
    - [Notification with Action Buttons](#notification-with-action-buttons)
    - [Custom Animation](#custom-animation)
    - [Custom Close Button](#custom-close-button)
    - [Full Comprehensive Example](#full-comprehensive-example)
  - [Advanced Usage](#advanced-usage)
    - [Global Settings](#global-settings)
  - [Browser Compatibility](#browser-compatibility)
  - [Contributing](#contributing)
  - [License](#license)
  - [Acknowledgements](#acknowledgements)
  - [Contact](#contact)
  - [Frequently Asked Questions](#frequently-asked-questions)
    - [Q: How do I include custom fonts or icons in my notifications?](#q-how-do-i-include-custom-fonts-or-icons-in-my-notifications)
    - [Q: Can I display multiple notifications at the same time?](#q-can-i-display-multiple-notifications-at-the-same-time)
    - [Q: How do I remove all notifications at once?](#q-how-do-i-remove-all-notifications-at-once)
    - [Q: How can I customize the animation of the notifications?](#q-how-can-i-customize-the-animation-of-the-notifications)
    - [Q: Is WhiskrJS accessible?](#q-is-whiskrjs-accessible)
  - [Support](#support)

## Features

- **Highly Customizable:** Tailor notifications to match your application's style.
- **Multiple Positions:** Display notifications in various screen positions.
- **Action Buttons:** Add interactive buttons for user actions.
- **Variety of Animations:** Choose from multiple entrance and exit animations.
- **Responsive Design:** Works seamlessly on all screen sizes.
- **Queueing and Limits:** Control the number of simultaneous notifications and queue behavior.
- **Easy Integration:** Simple API for quick setup and use.
- **Pause on Hover:** Option to pause the notification timer when hovered over.
- **Accessibility:** Designed with accessibility in mind.

## Installation

### Via NPM

Install WhiskrJS via NPM:

```bash
npm install whiskrjs
```

### Via CDN

Include the CSS and JS files directly in your HTML:

```html
<!-- Include CSS -->
<link rel="stylesheet" href="https://unpkg.com/whiskrjs/dist/whiskr.css">
<!-- Include JS -->
<script src="https://unpkg.com/whiskrjs/dist/whiskr.umd.js"></script>
```

## Getting Started

### Importing WhiskrJS

#### ES Modules (Recommended)

```javascript
// Import WhiskrJS
import Whiskr from 'whiskrjs';
import 'whiskrjs/dist/whiskr.css';
```

#### CommonJS

```javascript
// Require WhiskrJS
const Whiskr = require('whiskrjs');
require('whiskrjs/dist/whiskr.css');
```

#### UMD (Browser Global)

Include the CSS and JS files in your HTML:

```html
<!-- Include CSS -->
<link rel="stylesheet" href="https://unpkg.com/whiskrjs/dist/whiskr.css">
<!-- Include JS -->
<script src="https://unpkg.com/whiskrjs/dist/whiskr.umd.js"></script>
<!-- Whiskr is now available as a global variable -->
```

### Basic Usage

Display a simple notification:

```javascript
Whiskr.show({
  message: 'Hello World!',
  type: 'success', // 'success', 'error', 'info', 'warning'
});
```

## API Reference

### Whiskr.show(options)

Displays a notification with the specified options.

#### Parameters:

- `options` (object): Configuration options for the notification.

## Options

### message

- **Type:** `string`
- **Default:** `''`
- **Description:** The text message to display in the notification.

```javascript
message: 'Operation completed successfully!'
```

### html

- **Type:** `string`
- **Default:** `''`
- **Description:** Custom HTML content to display in the notification. Overrides message if provided.

```javascript
html: '<strong>Success:</strong> Data saved!'
```

### type

- **Type:** `string`
- **Default:** `'info'`
- **Options:** `'success'`, `'error'`, `'info'`, `'warning'`
- **Description:** Predefined styling for common notification types.

```javascript
type: 'error'
```

### duration

- **Type:** `number`
- **Default:** `5000` (milliseconds)
- **Description:** Duration the notification is displayed. Set to `0` for persistent notifications until manually closed.

```javascript
duration: 3000 // 3 seconds
```

### position

- **Type:** `string`
- **Default:** `'top-right'`
- **Options:**
  - `'top-left'`
  - `'top-right'`
  - `'bottom-left'`
  - `'bottom-right'`
  - `'top-center'`
  - `'bottom-center'`
  - `'center'`
- **Description:** Screen position where the notification appears.

```javascript
position: 'bottom-center'
```

### styles

- **Type:** `object`
- **Default:** `{}`
- **Description:** Custom CSS styles applied to the notification container.

```javascript
styles: {
  backgroundColor: '#4CAF50',
  color: '#FFFFFF',
  fontSize: '16px',
  padding: '15px 20px',
  borderRadius: '8px',
}
```

### borderColor

- **Type:** `string`
- **Default:** `''`
- **Description:** Color of the notification border.

```javascript
borderColor: '#9c27b0'
```

### borderSides

- **Type:** `array`
- **Default:** `[]`
- **Description:** Sides of the notification to apply the border to. Options are `'top'`, `'right'`, `'bottom'`, `'left'`.

```javascript
borderSides: ['top', 'bottom']
```

### borderThickness

- **Type:** `object`
- **Default:** `{}`
- **Description:** Thickness of the border on each side.

```javascript
borderThickness: {
  top: '2px',
  bottom: '2px',
}
```

### closeButtonStyle

- **Type:** `string`
- **Default:** `'right'`
- **Options:** `'right'`, `'left'`, `'bar'`, `'none'`
- **Description:** Position or style of the close button.

```javascript
closeButtonStyle: 'bar'
```

### closeButtonColor

- **Type:** `string`
- **Default:** `'#FFFFFF'`
- **Description:** Color of the close button.

```javascript
closeButtonColor: '#FFFFFF'
```

### closeButtonContent

- **Type:** `string`
- **Default:** `'&times;'`
- **Description:** HTML content inside the close button.

```javascript
closeButtonContent: '&times;'
```

### textAlign

- **Type:** `string`
- **Default:** `'left'`
- **Options:** `'left'`, `'center'`, `'right'`
- **Description:** Text alignment within the notification.

```javascript
textAlign: 'center'
```

### animationType

- **Type:** `string`
- **Default:** `'slide'`
- **Options:** `'slide'`, `'fade'`, `'zoom'`, `'flip'`, `'bounce'`, `'rotate'`, `'none'`
- **Description:** Entrance and exit animation of the notification.

```javascript
animationType: 'fade'
```

### animationDuration

- **Type:** `number`
- **Default:** `500` (milliseconds)
- **Description:** Duration of the animation.

```javascript
animationDuration: 800
```

### pauseOnHover

- **Type:** `boolean`
- **Default:** `false`
- **Description:** Pauses the notification timer when hovered over.

```javascript
pauseOnHover: true
```

### width

- **Type:** `string`
- **Default:** `'auto'`
- **Description:** Width of the notification. Can be `'auto'`, `'full-width'`, or any valid CSS width value (e.g., `'300px'`, `'50%'`).

```javascript
width: '400px'
```

### textOverflow

- **Type:** `string`
- **Default:** `'wrap'`
- **Options:** `'wrap'`, `'scroll'`, `'ellipsis'`
- **Description:** Behavior when text overflows the notification container.

```javascript
textOverflow: 'ellipsis'
```

### actionButtons

- **Type:** `array`
- **Default:** `[]`
- **Description:** Array of action button objects to include in the notification.

**Action Button Object Structure:**

```javascript
{
  text: 'Button Text',
  onClick: () => { /* Handle click */ },
  styles: {
    /* Custom styles */
  },
  hoverColor: '#FFD54F',
  activeColor: '#FFCA28',
}
```

**Example:**

```javascript
actionButtons: [
  {
    text: 'Undo',
    onClick: () => {
      console.log('Undo action clicked!');
    },
    styles: {
      backgroundColor: '#FFC107',
      color: '#FFFFFF',
      padding: '6px 12px',
      borderRadius: '4px',
    },
    hoverColor: '#FFD54F',
    activeColor: '#FFCA28',
  },
]
```

## Whiskr.settings(options)

Sets global settings that affect all notifications.

### Global Settings Options

- `maxToasts` (number): Maximum number of notifications to display per position. Set to `0` for unlimited.
- `queue` (boolean): Whether to queue notifications when the maximum is reached.
- `fontFamily` (string): Global font family for all notifications.

**Example:**

```javascript
Whiskr.settings({
  maxToasts: 5, // Maximum number of notifications per position
  queue: true,  // Enable queueing of notifications
  fontFamily: 'Arial, sans-serif', // Set global font family
});
```

## Examples

### Simple Notification

```javascript
Whiskr.show({
  message: '✅ Success! Your action was completed.',
  type: 'success',
  duration: 4000,
});
```

### Custom Styled Notification

```javascript
Whiskr.show({
  message: '🎨 Custom Styled Notification',
  styles: {
    backgroundColor: '#9C27B0',
    color: '#FFFFFF',
    fontSize: '18px',
    padding: '20px 30px',
    borderRadius: '10px',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
  },
  borderColor: '#E91E63',
  borderSides: ['top'],
  borderThickness: {
    top: '3px',
  },
  position: 'top-center',
  textAlign: 'center',
});
```

### Notification with Action Buttons

```javascript
Whiskr.show({
  message: '💾 Do you want to save changes?',
  type: 'info',
  duration: 0, // Keep the toast open indefinitely until an action is taken
  closeButtonStyle: 'none', // Remove the close button
  actionButtons: [
    {
      text: 'Save',
      onClick: () => {
        console.log('Save clicked');
        // Your save logic here
      },
      styles: {
        backgroundColor: '#4CAF50',
        color: '#FFFFFF',
        padding: '6px 12px',
        borderRadius: '4px',
      },
      hoverColor: '#66BB6A',
    },
    {
      text: 'Cancel',
      onClick: () => {
        console.log('Cancel clicked');
        // Your cancel logic here
      },
      styles: {
        backgroundColor: '#F44336',
        color: '#FFFFFF',
        padding: '6px 12px',
        borderRadius: '4px',
      },
      hoverColor: '#EF5350',
    },
  ],
});
```

### Custom Animation

```javascript
Whiskr.show({
  message: '🎞️ Custom Animation',
  animationType: 'zoom',
  animationDuration: 700,
});
```

### Custom Close Button

```javascript
Whiskr.show({
  message: '❎ Custom Close Button',
  closeButtonStyle: 'left',
  closeButtonColor: '#FFC107',
  closeButtonContent: '✖',
});
```

### Full Comprehensive Example

```javascript

Whiskr.show({
  // Basic Content
  message: '🚀 Welcome to WhiskrJS!',
  html: '<strong>🚀 Welcome to <span style="color: #e91e63;">WhiskrJS</span>!</strong>',
  
  // Notification Type
  type: 'success', // Options: 'success', 'error', 'info', 'warning'

  // Duration and Position
  duration: 0, // Keep the notification open indefinitely until an action is taken
  position: 'top-center', // Options: 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'top-center', 'bottom-center', 'center'

  // Custom Styles
  styles: {
    backgroundColor: '#333',
    color: '#fff',
    fontSize: '16px',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    fontFamily: 'Roboto, sans-serif',
  },

  // Border Customization
  borderColor: '#e91e63',
  borderSides: ['top', 'bottom'],
  borderThickness: {
    top: '4px',
    bottom: '4px',
  },
  // Close Button Customization
  closeButtonStyle: 'left', // Options: 'left', 'right', 'bar', 'none'
  closeButtonColor: '#e91e63',
  closeButtonContent: '✖',

  // Text Alignment
  textAlign: 'center', // Options: 'left', 'center', 'right'

  // Animation Settings
  animationType: 'bounce', // Options: 'slide', 'fade', 'zoom', 'flip', 'bounce', 'rotate', 'none'
  animationDuration: 800, // In milliseconds
  animationEase: 'ease-in-out',

  // Interaction Options
  pauseOnHover: true,
  focus: true,

  // Dimensions and Text Overflow
  width: '400px', // Can be 'auto', 'full-width', or any valid CSS width value
  textOverflow: 'wrap', // Options: 'wrap', 'ellipsis', 'scroll'

  // Action Buttons
  actionButtons: [
    {
      text: 'Get Started',
      onClick: () => {
        alert('Let\'s get started!');
      },
      styles: {
        backgroundColor: '#e91e63',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '5px',
        fontSize: '14px',
      },
      hoverColor: '#d81b60',
      activeColor: '#c2185b',
    },
    {
      text: 'Learn More',
      onClick: () => {
        window.open('https://github.com/whiskrjs/whiskrjs', '_blank');
      },
      styles: {
        backgroundColor: '#2196f3',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '5px',
        fontSize: '14px',
      },
      hoverColor: '#1e88e5',
      activeColor: '#1976d2',
    },
  ],

  // Callback Function
  onClose: () => {
    console.log('Notification closed');
  },
});
```

## Advanced Usage

### Global Settings

Control the overall behavior of the notification system.

```javascript
Whiskr.settings({
  maxToasts: 3, // Limit to 3 notifications per position
  queue: true,  // Enable queuing
  fontFamily: 'Verdana, sans-serif', // Set a global font family
});
```

## Browser Compatibility

WhiskrJS is compatible with all modern browsers, including:

- Chrome
- Firefox
- Safari
- Edge
- Opera

For legacy browser support (e.g., Internet Explorer 11), ensure you transpile your code with Babel and include necessary polyfills.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the Repository: Click the "Fork" button at the top right of the GitHub repository page.

2. Clone Your Fork:

```bash
git clone https://github.com/whiskrjs/whiskrjs.git
```

3. Create a New Branch:

```bash
git checkout -b feature/your-feature-name
```

4. Make Your Changes: Implement your feature or bug fix.

5. Commit Your Changes:

```bash
git commit -am 'Add some feature'
```

6. Push to the Branch:

```bash
git push origin feature/your-feature-name
```

7. Open a Pull Request: Go to your fork on GitHub and open a pull request to the main repository.

Please ensure your code adheres to the project's coding standards and passes all tests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Inspired by popular notification libraries like Toastr and Noty.
- Emoji icons from Emoji Cheat Sheet.

## Contact

If you have any questions or need support, please open an issue on the GitHub repository or contact us via email at contact@whiskrjs.com.

## Frequently Asked Questions

### Q: How do I include custom fonts or icons in my notifications?

A: You can include custom fonts or icons by adding them to your project's CSS and referencing them in the styles option.

```javascript
styles: {
  fontFamily: 'Your Custom Font',
},
html: '<i class="custom-icon"></i> Custom Notification',
```

### Q: Can I display multiple notifications at the same time?

A: Yes, WhiskrJS supports displaying multiple notifications simultaneously. You can control the maximum number of notifications displayed per position using `Whiskr.settings({ maxToasts: number })`.

### Q: How do I remove all notifications at once?

A: Currently, WhiskrJS does not provide a built-in method to remove all notifications at once. However, you can manually remove all notifications by selecting them and removing them from the DOM.

```javascript
// Remove all Whiskr notifications
document.querySelectorAll('.whiskr-js-container').forEach(container => {
  container.parentNode.removeChild(container);
});
```

### Q: How can I customize the animation of the notifications?

A: You can customize the animation by setting the `animationType`, `animationDuration`, and `animationEase` options in `Whiskr.show()`.

```javascript
Whiskr.show({
  message: 'Custom Animation',
  animationType: 'bounce',
  animationDuration: 800,
  animationEase: 'ease-in-out',
});
```

### Q: Is WhiskrJS accessible?

A: Yes, WhiskrJS is designed with accessibility in mind, using appropriate ARIA roles and attributes.

## Support

If you find this library helpful, please consider starring the repository on GitHub. Your support is much appreciated!

---

Thank you for using WhiskrJS!
