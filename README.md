# Epicor Loading Extension

This is a browser extension designed to show a loading spinner and prevent user interaction during loading in the Epicor SaaS application. The extension displays a full-screen overlay with a loading indicator when the application is in a loading state and disables user actions during that time.

## Features

- **Loading Indicator**: Displays a loading spinner with a "Loading..." text.
- **Full-Screen Overlay**: A transparent overlay with a gradient background covers the entire screen.
- **Disable User Interaction**: While the loading indicator is visible, the user cannot interact with the page (click or type).
- **Dynamic Indicator Detection**: Detects loading indicators within the application, even in iframes, and shows/hides the overlay accordingly.

## Files

1. **manifest.json**: Configuration file for the extension.
2. **content.js**: Injects scripts into the page and controls the extension's behavior.
3. **loading.js**: Contains the logic to create and manage the loading overlay and spinner.
4. **epicor_icon.png**: The extension icon displayed in the browser toolbar.

## Installation

### 1. Clone the repository or download the files

```bash
git clone https://github.com/HarisTanone/epicor_loading.git
```

### 2. Load the extension into your browser

#### For Chrome:
* Open Chrome and go to `chrome://extensions/`.
* Enable **Developer mode** (top right).
* Click **Load unpacked** and select the folder containing the extension files (`manifest.json`, `content.js`, `loading.js`, etc.).

#### For Firefox:
* Open Firefox and go to `about:debugging`.
* Click on **This Firefox**.
* Click **Load Temporary Add-on** and select the `manifest.json` file.

### 3. Enjoy using the Epicor Loading Extension!

## How it Works

### 1. Manifest File (`manifest.json`)
* The `manifest.json` defines the extension's settings, including the name, version, description, and permissions.
* It specifies the content script (`content.js`) that will run on pages matching the pattern `*://*.epicorsaas.com/*`.

### 2. Loading Overlay and Spinner (`loading.js`)
* When a loading indicator is detected (either in the main document or an iframe), a full-screen overlay with a spinner is displayed.
* The spinner is animated with a gradient effect using CSS and JavaScript.
* The overlay prevents any interaction with the page while loading.

### 3. Content Script (`content.js`)
* The `content.js` script manages the loading logic, injecting the necessary scripts (`loading.js`) into the page when required.
* It enables and disables the loading overlay based on the loading state of the page.

## Customization

* You can customize the spinner and overlay styles by modifying the CSS within the `loading.js` file.
* To modify the behavior, adjust the logic in `content.js` and `loading.js`.
