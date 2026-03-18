# Data Element Market Supply-Side Management System - Frontend

Backend: [yexca/data-element-backend](https://github.com/yexca/data-element-backend)  
Deploy(Docker): [yexca/data-element-docker](https://github.com/yexca/data-element-docker)

## Overview

This project provides a responsive user interface for the supply-side management system of the data element market. Built upon the Vue.js ecosystem (Vue Router, Vuex), it delivers an optimized UI/UX for different roles: users, administrators, and general visitors.

A key feature is its multi-language support (Japanese, Chinese, English), implemented using `vue-i18n` and designed for global use.

## 🌟 Main Features

  * **Reactive UI:** Component-based UI development using Vue.js.
  * **Global State Management:** Centralized management of application-wide state, such as user login status and language settings, using Vuex.
  * **Multi-language Support:** Implements dynamic language switching between Japanese, Chinese, and English using `vue-i18n`.
  * **Client-Side Routing:** A Single Page Application (SPA) that achieves seamless screen transitions using Vue Router.
  * **Dynamic UI Separation:**
      * **Public Portal:** Data product search and browsing functions for unauthenticated users.
      * **User Dashboard:** Registration, login, and management (CRUD) functions for personal data products, tailored for individual/enterprise users.
      * **Admin Dashboard:** A comprehensive back-office interface for employees/administrators to manage all user information, all data products, category information, and more.
  * **HTTP Client:** Encapsulates Axios, implementing request/response interceptors to handle automatic attachment of JWT tokens and global error handling.
  * **Form Validation:** Implements real-time input validation for registration, login, and data entry forms, integrated with ElementUI's validation rules.

## 📸 UI Preview

Here are some snapshots of the system in action.

### Search Page

| Search Page i18n | Search Page Focus |
| :---: | :---: |
| <img src="https://github.com/yexca/picx-images-hosting/raw/master/2026/01-data-element-readme/search-i18n.5c1gsuzj05.webp" width="100%"> | <img src="https://github.com/yexca/picx-images-hosting/raw/master/2026/01-data-element-readme/search-focus.7i0vemrf4x.webp" width="100%"> |

<details>
<summary>🖱️ Click to view Search Results</summary>
<img src="https://github.com/yexca/picx-images-hosting/raw/master/2026/01-data-element-readme/search-result.5trihg3jkb.webp" width="100%">
</details>

### Authentication & User Center

Screens for user registration, login, and profile management.

| User Login | User Registration |
| :---: | :---: |
| <img src="https://github.com/yexca/picx-images-hosting/raw/master/2026/01-data-element-readme/user-login.1sfj32416n.webp" width="100%"> | <img src="https://github.com/yexca/picx-images-hosting/raw/master/2026/01-data-element-readme/user-register.7lkhccrheu.webp" width="100%"> |

<details>
<summary>🖱️ Click to view User Dashboard</summary>
<img src="https://github.com/yexca/picx-images-hosting/raw/master/2026/01-data-element-readme/user-info.362273f36a.webp" width="100%">
</details>

### Admin Dashboard

A centralized view for system statistics and management.

![dashboard](https://github.com/yexca/picx-images-hosting/raw/master/2026/01-data-element-readme/dashboard.3uvbr4oc3f.webp)

> Note: Data shown above is for demonstration purposes

#### Dashboard i18n Demo

![Dashboard i18n GIF](https://github.com/yexca/picx-images-hosting/raw/master/2026/01-data-element-readme/dashboard-i18n.1sfj328set.gif)

<details>
<summary>🖱️ Click to view Employee Login</summary>
<img src="https://github.com/yexca/picx-images-hosting/raw/master/2026/01-data-element-readme/employee-login.5j4ooawcad.webp" width="100%">
</details>

## 🛠 Tech Stack

| Category | Technology |
| :--- | :--- |
| **Core** | Vue.js |
| **State Management** | Vuex |
| **Routing** | Vue Router |
| **UI Library** | ElementUI |
| **HTTP Client** | Axios |
| **Internationalization (i18n)** | Vue-i18n |
| **Build / Deployment** | Node.js, Nginx (via Docker) |

## Getting Started

### 🐳 Quick Deployment

If you just want to deploy and run the system, please visit the deployment repository for Docker Compose instructions: [yexca/data-element-docker](https://github.com/yexca/data-element-docker)

### 💻 Local Development

To run or modify the frontend locally:

**1. Clone the repository:**

```bash
git clone https://github.com/yexca/data-element-frontend.git
cd data-element-frontend
```

**2. Install dependencies:**

```bash
npm install
```

**3. Run the development server (HMR):**

```bash
npm run dev
```

**4. Build for production:**

```bash
npm run build
```

**Note:** This frontend assumes that the backend API server is already running. Please check the proxy settings in `vue.config.js` and adjust the backend server address if necessary.
