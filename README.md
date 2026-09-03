# React Authentication System

A complete, professional authentication system built with React, React Hook Form, Yup validation, and React Router.

## ✨ Features

- 🔐 **Login & Registration** with real-time validation
- 🎨 **Floating Labels** with smooth CSS animations
- 👁️ **Password Visibility Toggle** for better UX
- 📊 **Password Strength Indicator** with real-time feedback
- 🔑 **Forgot Password Modal** with email verification
- 🌐 **Social Login Buttons** (Google, GitHub)
- 💬 **Toast Notifications** for user feedback
- 🎯 **Form Persistence** with localStorage
- 🛡️ **Protected Routes** for authenticated pages
- 📱 **Fully Responsive** design
- 🏗️ **Professional Folder Structure** for scalability

## 🚀 Tech Stack

- React
- React Hook Form
- Yup (Validation)
- React Router
- React Toastify
- CSS3

## 📁 Project Structure

Signup-Form/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   └── PasswordInput/
│   │   │       ├── PasswordInput.css  ✅
│   │   │       └── PasswordInput.jsx  ✅
│   │   └── auth/
│   │       ├── ForgotPassword/
│   │       │   ├── ForgotPassword.css ✅
│   │       │   └── ForgotPassword.jsx ✅
│   │       └── SocialLogin/
│   │           ├── SocialLogin.css    ✅
│   │           └── SocialLogin.jsx    ✅
│   ├── pages/
│   │   ├── LoginPage/
│   │   │   ├── LoginPage.css          ✅
│   │   │   └── LoginPage.jsx          ✅
│   │   ├── RegisterPage/
│   │   │   ├── RegisterPage.css       ✅
│   │   │   └── RegisterPage.jsx       ✅
│   │   └── DashboardPage/
│   │       ├── DashboardPage.css      ✅
│   │       └── DashboardPage.jsx      ✅
│   ├── layouts/
│   │   ├── AuthLayout/
│   │   │   ├── AuthLayout.css         ✅
│   │   │   └── AuthLayout.jsx         ✅
│   │   └── DashboardLayout/
│   │       ├── DashboardLayout.css    ✅
│   │       └── DashboardLayout.jsx    ✅
│   ├── context/
│   │   └── AuthContext.jsx            ✅
│   ├── hooks/
│   │   ├── useAuth.js                 ✅
│   │   └── useFormPersistence.js      ✅
│   ├── services/
│   │   └── api.js                     ✅
│   ├── utils/
│   │   └── validation.js              ✅
│   ├── App.css                        ✅
│   ├── App.jsx                        ✅
│   ├── index.css                      ✅
│   └── main.jsx                       ✅
├── public/
│   └── vite.svg                       ✅
├── .gitignore                         ✅
├── eslint.config.js                   ✅
├── index.html                         ✅
├── package.json                       ✅
├── package-lock.json                  ✅
├── README.md                          ✅
└── vite.config.js                     ✅
