# Rydah Ecommerce App Project

This project is a simple ecommerce applications for muslims, with user security at it's core.

## Table of Contents

- [Rydah Ecommerce App Project](#rydah-ecommerce-app-project)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [Dependencies](#dependencies)
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

- **React Native**: This project utilizes React Native for building mobile applications.
- **Expo**: Expo is used as a development environment and toolchain for React Native applications.
- **TypeScript**: TypeScript is used for type-checking and providing enhanced development experience.
- **Navigation**: Navigation between screens is managed using Expo App Router.
- **Fonts**: Custom fonts are integrated using Expo Fonts.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- Node.js: Make sure Node.js is installed on your system. You can download it from [here](https://nodejs.org/).
- Expo CLI: Install Expo CLI globally by running `npm install -g expo-cli`.

### Installation

1. Clone the repository:
   ```bash
   git clone hhttps://github.com/RydahApp/Rydah.git
   ```
2. Navigate into the project directory:
   ```bash
   cd Rydah
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
