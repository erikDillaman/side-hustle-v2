# Side-Hustle Explorer - DOM Reference Guide

This document provides a comprehensive reference for all DOM elements and CSS classes in the Side-Hustle Explorer app, making it easy to access and manipulate elements with JavaScript.

## HTML Structure Overview

```
app-container
├── app-header
│   └── app-title
├── main-content
│   └── hustle-container
│       ├── hustle-item (×5)
│       │   └── hustle-label
└── app-footer
    ├── action-button (buttonOne)
    └── action-button (buttonTwo)
```

## DOM Elements by ID

### Hustle Items
- `#hustle-1` - First side hustle item (contains "numOne")
- `#hustle-2` - Second side hustle item (contains "numTwo")
- `#hustle-3` - Third side hustle item (contains "numThree")
- `#hustle-4` - Fourth side hustle item (contains "numFour")
- `#hustle-5` - Fifth side hustle item (contains "numFive")

### Buttons
- `#button-one` - First action button (contains "buttonOne")
- `#button-two` - Second action button (contains "buttonTwo")

## CSS Classes for JavaScript Access

### Container Classes
- `.app-container` - Main application wrapper
- `.app-header` - Header section container
- `.main-content` - Main content area container
- `.hustle-container` - Container for all hustle items
- `.app-footer` - Footer section container

### Content Classes
- `.app-title` - Main application title ("Side Hustle Explorer")
- `.hustle-item` - Individual side hustle item (clickable)
- `.hustle-label` - Text label inside each hustle item
- `.action-button` - Footer buttons (clickable)

## JavaScript Access Examples

### Selecting Elements

```javascript
// Get all hustle items
const hustleItems = document.querySelectorAll('.hustle-item');

// Get specific hustle item by ID
const firstHustle = document.getElementById('hustle-1');

// Get all action buttons
const actionButtons = document.querySelectorAll('.action-button');

// Get specific button by ID
const buttonOne = document.getElementById('button-one');
const buttonTwo = document.getElementById('button-two');

// Get the main container
const mainContainer = document.querySelector('.hustle-container');

// Get the app title
const appTitle = document.querySelector('.app-title');
```

### Adding Event Listeners

```javascript
// Add click listeners to all hustle items
hustleItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        console.log(`Clicked hustle item ${index + 1}`);
    });
});

// Add click listeners to buttons
document.getElementById('button-one').addEventListener('click', () => {
    console.log('Button One clicked');
});

document.getElementById('button-two').addEventListener('click', () => {
    console.log('Button Two clicked');
});
```

### Modifying Content

```javascript
// Change hustle item labels
document.querySelector('#hustle-1 .hustle-label').textContent = 'Pet Sitting';
document.querySelector('#hustle-2 .hustle-label').textContent = 'Tutoring';

// Change button text
document.getElementById('button-one').textContent = 'Sort by Profit';
document.getElementById('button-two').textContent = 'Filter Options';

// Update app title
document.querySelector('.app-title').textContent = 'My Side Hustles';
```

### Adding/Removing CSS Classes

```javascript
// Add active state to a hustle item
document.getElementById('hustle-1').classList.add('active');

// Remove active state
document.getElementById('hustle-1').classList.remove('active');

// Toggle a class
document.getElementById('hustle-1').classList.toggle('selected');

// Check if element has a class
if (document.getElementById('hustle-1').classList.contains('active')) {
    console.log('Item is active');
}
```

### Creating Dynamic Content

```javascript
// Add a new hustle item
function addHustleItem(labelText) {
    const container = document.querySelector('.hustle-container');
    const newItem = document.createElement('div');
    newItem.className = 'hustle-item';
    newItem.innerHTML = `<span class="hustle-label">${labelText}</span>`;
    container.appendChild(newItem);
}

// Remove a hustle item
function removeHustleItem(itemId) {
    const item = document.getElementById(itemId);
    if (item) {
        item.remove();
    }
}
```

## CSS Custom Properties for Dynamic Styling

You can add these CSS custom properties to enable dynamic theming:

```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #b8d4f0;
    --background-color: #f5f5f5;
    --border-color: #999;
    --hover-color: #a5c9ed;
}
```

## Responsive Breakpoints

The app includes responsive design with these breakpoints:
- **Desktop**: > 768px (default styles)
- **Tablet**: ≤ 768px (medium screens)
- **Mobile**: ≤ 480px (small screens)

## Animation Classes

Current hover and active states include:
- Smooth transitions (0.2s ease)
- Transform effects (translateY)
- Box shadow changes
- Background color transitions

## Future Enhancement Hooks

These classes and IDs are designed to support future features:
- Sorting algorithms (via `.hustle-item` manipulation)
- Filtering systems (via class additions/removals)
- Data binding (via `data-*` attributes that can be added)
- Modal dialogs (can be inserted into `.app-container`)
- Loading states (can be applied to `.hustle-container`)
