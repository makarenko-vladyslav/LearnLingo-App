<div align="center">
  <div>
    <img src="https://img.shields.io/badge/-Next.js-black?style=for-the-badge&logo=next.js&logoColor=white&color=000000" alt="Next.js" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logo=typescript&logoColor=white&color=3178C6" alt="TypeScript" />
    <img src="https://img.shields.io/badge/-Firebase-black?style=for-the-badge&logo=firebase&logoColor=white&color=FFCA28" alt="Firebase" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logo=tailwindcss&logoColor=white&color=06B6D4" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/-Redux-black?style=for-the-badge&logo=redux&logoColor=white&color=764ABC" alt="Redux" />
  </div>

<h2 align="center">LearnLingo - Find Your Language Tutor</h2>
</div>

## 📋 Table of Contents

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🚀 [Performance](#performance)
5. 🤸 [Quick Start](#quick-start)
6. 🗂 [Project Structure](#project-structure)

## <a name="introduction">🤖 Introduction</a>

LearnLingo is an educational platform designed to connect language learners with tutors from around the world. With filtering options by language, level, and hourly price, users can easily find the ideal tutor. Authorized users can add tutors to their favorites list for easy access. LearnLingo also provides functionality for password resets and includes a trial lesson booking feature. Built with a clean, modern UI, the application offers seamless navigation, responsive design, and robust state management.

**[Live Page](https://learn-lingo-app-nine.vercel.app/)** - Check out the working version of the project.

## <a name="tech-stack">⚙️ Tech Stack</a>

-   **Next.js** - Full-stack React framework with built-in SSR and SSG capabilities.
-   **TypeScript** - Typed JavaScript for enhanced development.
-   **Firebase** - User authentication, real-time database, and secure storage.
-   **Redux Toolkit** - Efficient and organized state management.
-   **Tailwind CSS** - Utility-first CSS for rapid styling and responsive design.

## <a name="features">🔋 Features</a>

-   **User Authentication**: Sign up, log in, session management, and password reset using Firebase Authentication.
-   **Language Tutor Search and Filters**: Browse tutors by language, level, and hourly price.
-   **Favorites**: Authorized users can add their preferred tutors to a favorites list.
-   **Responsive Design**: Fully optimized for mobile, tablet, and desktop views.
-   **Trial Lesson Booking**: Book a trial lesson with a tutor directly from the app.
-   **Secure User Data**: Sensitive data stored safely using Firebase's real-time database.

## <a name="performance">🚀 Performance</a>

LearnLingo is optimized for high performance, accessibility, best practices, and SEO. Below are the performance metrics from [PageSpeed Insights](https://pagespeed.web.dev/analysis/https-learn-lingo-app-nine-vercel-app/oubkfggr2h?hl=uk&form_factor=desktop):

-   **Efficiency**: 100
-   **Accessibility**: 100
-   **Best Practices**: 100
-   **SEO**: 100

These scores reflect the app's efficient rendering, accessibility, and adherence to modern web standards.

## <a name="quick-start">🤸 Quick Start</a>

### Prerequisites

Ensure you have the following installed:

-   [Node.js](https://nodejs.org/)
-   [Git](https://git-scm.com/)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/makarenko-vladyslav/LearnLingo-App.git
    cd learn-lingo-app
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env.local` file in the root directory with your Firebase configuration:

    ```bash
    This file is essential for configuring Firebase Authentication and Realtime Database services within the app.
    Make sure to keep it secure and out of version control.

    NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
    NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
    NEXT_PUBLIC_FIREBASE_DATABASE_URL=your-database-url
    ```

4. Run the development server:

    ```bash
    npm run dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## <a name="project-structure">🗂 Project Structure</a>

```
└── 📁src
    └── 📁app
        └── 📁favorites
            └── page.tsx
        └── 📁teachers
            └── page.tsx
        └── .DS_Store
        └── favicon.ico
        └── globals.css
        └── layout.tsx
        └── not-found.tsx
        └── page.tsx
    └── 📁components
        └── 📁Filters
            └── Filter.tsx
            └── LanguageFilter.tsx
            └── LevelFilter.tsx
            └── PriceFilter.tsx
        └── 📁Forms
            └── InputField.tsx
            └── LoginAndRegisterForm.tsx
            └── PasswordReset.tsx
            └── RadioButton.tsx
            └── TrialLessonForm.tsx
        └── 📁Header
            └── AuthButtons.tsx
            └── Burger.tsx
            └── Header.tsx
            └── Logo.tsx
            └── NavLinks.tsx
        └── 📁Modal
            └── AuthModal.tsx
            └── UniversalModal.tsx
        └── ClientProvider.tsx
        └── FavoriteBtn.tsx
        └── Spinner.tsx
        └── TeacherCard.tsx
        └── TeacherList.tsx
    └── 📁redux
        └── authSlice.ts
        └── filtersSlice.ts
        └── store.ts
        └── teachersSlice.ts
    └── 📁services
        └── authService.ts
        └── AuthStatusChecker.tsx
        └── favoritesService.ts
        └── filterService.ts
    └── 📁validation
        └── authSchema.ts
    └── .DS_Store
    └── middleware.ts
```