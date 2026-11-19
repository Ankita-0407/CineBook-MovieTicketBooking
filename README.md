# 🎬 CineBook - Movie Ticket Booking Simulator

> **A complete responsive web application** built as a First Semester CSE Project

---

## 📋 Project Overview

**CineBook** is a full-featured, responsive **Movie Ticket Booking** web application that simulates a real-world cinema booking system. This project integrates all core web development concepts studied in the first semester.

**Real-World Problem Solved:** Booking movie tickets is often a frustrating experience with poor UX. CineBook provides a clean, intuitive, and mobile-friendly platform for users to browse movies, select seats, and confirm bookings in just a few steps.

---

## 🎯 Features

| Feature | Description |
|---------|-------------|
| 🏠 Home Page | Hero section + featured movies carousel |
| 🎬 Movies Page | Search, filter by genre/language, view details |
| 🎟️ Booking Page | 4-step booking: Movie → Seats → Payment → Ticket |
| 📞 Contact Page | Contact form with FAQ accordion |
| 🔐 Auth System | Login/Register with localStorage + validation |
| 💺 Seat Map | Interactive seat selection (Regular + Premium) |
| 💳 Payment Sim | Card, UPI, Wallet payment forms with validation |
| 🖨️ E-Ticket | Printable ticket with booking ID |
| 📱 Responsive | Works on mobile, tablet, and desktop |

---

## 🛠️ Technologies Used

| Technology | Usage |
|------------|-------|
| **HTML5** | Semantic markup, forms, media |
| **CSS3** | Flexbox, Grid, Variables, Animations, Media Queries |
| **JavaScript (ES6+)** | DOM manipulation, Promises, localStorage, validation |
| **Font Awesome 6** | Icons throughout the UI |
| **Responsive Design** | Mobile-first with breakpoints at 480px, 768px, 1024px |
| **Git & GitHub** | Version control (see setup below) |

---

## 📁 Project Structure

```
MovieTicketBooking/
├── index.html          ← Home page
├── movies.html         ← All movies listing
├── booking.html        ← 4-step booking flow
├── contact.html        ← Contact & FAQ
├── css/
│   └── style.css       ← All styles (responsive)
├── js/
│   ├── data.js         ← Movie data + simulated REST API
│   ├── auth.js         ← Login/Register/Logout logic
│   ├── app.js          ← Home page scripts
│   ├── movies.js       ← Movies page scripts
│   ├── booking.js      ← Full booking flow logic
│   └── contact.js      ← Contact form logic
└── README.md           ← This file
```

---

## 🔐 Secure Coding Practices Implemented

1. **XSS Prevention** — `sanitize()` function escapes all user-displayed data
2. **Input Validation** — Client-side validation on all forms before submission
3. **Password Hashing** — Passwords stored with `btoa()` encoding (Base64)
4. **No eval()** — No dynamic code execution
5. **Parameterized Data** — No direct string injection into DOM innerHTML without sanitization

---

## 🌐 Simulated REST API (data.js)

The app simulates server-side REST API calls using Promises and setTimeout:

```javascript
GET  /api/movies        → apiGetMovies()       // Returns all movies
GET  /api/movies/:id    → apiGetMovieById(id)  // Returns one movie
POST /api/bookings      → apiCreateBooking()   // Creates a booking
```

---

## 🗄️ Database Simulation (localStorage)

| Key | Description |
|-----|-------------|
| `cinebook_user` | Current logged-in user session |
| `cinebook_users` | Registered users list |
| `cinebook_bookings` | Booking history |
| `cinebook_contacts` | Contact form submissions |

---

## 🚀 How to Run

### Method 1: Open Directly (Simple)
```
Just double-click index.html in any browser!
```

### Method 2: Using Live Server (VS Code)
1. Install the **Live Server** extension in VS Code
2. Right-click `index.html` → **Open with Live Server**

### Method 3: Python Simple Server
```bash
cd MovieTicketBooking
python -m http.server 8080
# Open: http://localhost:8080
```

---

## 🔧 Git & GitHub Setup

```bash
# Initialize repo
git init
git add .
git commit -m "Initial commit: CineBook Movie Ticket Booking App"

# Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/cinebook.git
git branch -M main
git push -u origin main
```

**Suggested commit messages:**
- `feat: add movie listing page with search and filter`
- `feat: implement 4-step booking flow`
- `feat: add seat selection with interactive seat map`
- `feat: add payment simulation with validation`
- `fix: responsive design for mobile screens`
- `docs: update README with project documentation`

---

## 👨‍💻 Concepts Demonstrated

| Concept | Where Used |
|---------|-----------|
| HTML5 Semantic Tags | `<nav>`, `<section>`, `<footer>`, `<main>` |
| CSS3 Custom Properties | `:root` variables for theming |
| CSS Grid & Flexbox | Movie grid, booking layout, footer |
| CSS Media Queries | 4 responsive breakpoints |
| CSS Animations | Hero, modals, toast, seat hover |
| JS DOM Manipulation | Movie cards, seat map, ticket |
| JS Form Validation | All forms with error messages |
| JS Promises & Async/Await | Simulated API calls |
| JS localStorage | Auth + booking persistence |
| REST API Simulation | `apiGetMovies()`, `apiCreateBooking()` |
| Debugging | `console.error()` for failed API calls |
| Secure Coding | `sanitize()`, input validation |

---

## 📸 Pages Overview

- **Home** → Hero + Now Showing (4 movies) + Features + Footer
- **Movies** → All 6 movies + Search/Filter + Detail Modal
- **Booking** → Step 1 (Movie/Show) → Step 2 (Seat Map) → Step 3 (Payment) → Step 4 (E-Ticket)
- **Contact** → Form + Info Cards + FAQ Accordion

---

## 🎓 Submitted By

- **Name:** [Your Name]
- **Roll No:** [Your Roll Number]
- **Branch:** Computer Science Engineering, Semester 1
- **Subject:** Web Technology / Internet Programming
- **Institution:** [Your College Name]

---

*Made with ❤️ as a First Semester CSE Project*
