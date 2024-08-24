# Haima Ecommerce App Project

This project is a simple ecommerce applications for muslims, with user security at it's core.

## Table of Contents

- [Haima Ecommerce App Project](#haima-ecommerce-app-project)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [Dependencies](#dependencies)
      - [DevDependencies](#devdependencies)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the App](#running-the-app)
    - [Folder Structure](#folder-structure)
    - [Contributing](#contributing)

## About

Welcome to a safe and secure market space for Muslim women!

Find your perfect fit: Explore a diverse range of modest clothing, accessories, beauty, and lifestyle essentials.

## Dependencies

- **@expo/vector-icons**: Provides customizable icons for React Native.
- **@react-native-async-storage/async-storage**: Async storage solution for persistent data storage.
- **@react-navigation/native**: Handles navigation between screens in the app.
- **expo**: Development framework for React Native apps.
- **expo-constants**: Accesses system constants like device info and app configuration.
- **expo-font**: Loads and manages custom fonts.
- **expo-linking**: Manages deep linking and URL schemes.
- **expo-router**: Provides routing and navigation capabilities.
- **expo-splash-screen**: Manages app splash screens during loading.
- **expo-status-bar**: Configures the status bar appearance.
- **expo-system-ui**: Controls system UI settings.
- **expo-web-browser**: Opens external links in a web browser.
- **formik**: Manages form state and validation.
- **nativewind**: Styles components using Tailwind CSS classes.
- **react**: Core library for building user interfaces.
- **react-dom**: DOM bindings for React.
- **react-native**: Framework for building native mobile applications.
- **react-native-confirmation-code-field**: Input field for confirmation codes.
- **react-native-gesture-handler**: Handles gestures in React Native.
- **react-native-reanimated**: Animations library for React Native.
- **react-native-safe-area-context**: Manages safe area insets for React Native.
- **react-native-screens**: Optimizes screen transitions and memory usage.
- **react-native-toast-message**: Displays toast notifications.
- **react-native-web**: Enables React Native components to run on the web.
- **yup**: Schema validation library for form validation.
- **zustand**: State management library.

#### DevDependencies

- **@babel/core**: Babel compiler for JavaScript.
- **@testing-library/jest-native**: Extends Jest assertions for React Native.
- **@testing-library/react-native**: Testing utilities for React Native components.
- **@types/jest**: TypeScript types for Jest.
- **@types/react**: TypeScript types for React.
- **@types/react-test-renderer**: TypeScript types for React Test Renderer.
- **jest**: JavaScript testing framework.
- **jest-expo**: Jest preset for Expo projects.
- **react-test-renderer**: Renderer for testing React components.
- **tailwindcss**: Utility-first CSS framework.
- **typescript**: Adds type safety to JavaScript.


## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- Node.js: Make sure Node.js is installed on your system. You can download it from [here](https://nodejs.org/).
- Expo CLI: Install Expo CLI globally by running `npm install -g expo-cli`.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/HaimaApp/Client.git
   ```
2. Navigate into the project directory:
   ```bash
   cd Client
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

1. Start the Expo development server:
   ```bash
   npm start
   ```
   or
   ```bash
   npx expo start -c
   ```
2. Use an emulator/simulator or scan the QR code using the Expo Go app to run the app on your device.

### Folder Structure

Rydah/
│
├── assets/ # Images, Icons, fonts, and other static assets
│
├── ./ # Source files
│ ├── components/ # Reusable components
│ ├── components/_tests_ # Holding all test files and grouped in folder
│ ├── app/ # Navigation setup
│ ├── constants/ # Holding files that is Reusable within the entire application
│ ├── types/ # Main global types folder
│ └── ...
│
├── app/index.tsx # Root component of the app
├── app.json # Expo configuration file
├── package.json # NPM package configuration
└── ...

### Contributing

Contributions are welcome! Feel free to submit pull requests or open issues for any bugs or feature requests.

If you'd like to contribute to this project, please follow these steps:

1. Request access to the repository
2. Create a new branch (git checkout -b feature-name)
3. Make your changes
4. Commit your changes (git commit -am 'Add new feature')
5. Push to the branch (git push origin feature-name)
6. Create a new Pull Request
