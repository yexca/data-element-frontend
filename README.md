> 言語: [日本語](README.ja.md)

好的，这是前端部分的英文翻译。

-----

# Data Element Market Supply-Side Management System - Frontend

Backend repository: [data-element-backend](https://www.google.com/search?q=https://github.com/yexca/data-element-backend)

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
npm run serve
```

**4. Build for production:**

```bash
npm run build
```

**Note:** This frontend assumes that the backend API server is already running. Please check the proxy settings in `vue.config.js` and adjust the backend server address if necessary.
