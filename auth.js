// =============================================
// auth.js - Authentication (localStorage-based)
// =============================================

// Key used in localStorage
const AUTH_KEY = "cinebook_user";
const USERS_KEY = "cinebook_users";

// Get current logged-in user
function getCurrentUser() {
  try {
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error("Auth error:", e);
    return null;
  }
}

// Get all registered users
function getAllUsers() {
  try {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

// Save user session
function saveSession(user) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

// Update navbar based on auth state
function updateNavbar() {
  const user = getCurrentUser();
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const greeting = document.getElementById("userGreeting");

  if (user) {
    if (loginBtn) loginBtn.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "inline-block";
    if (greeting) {
      greeting.textContent = "Hi, " + user.name.split(" ")[0] + "! 👋";
      greeting.style.display = "inline-block";
    }
  } else {
    if (loginBtn) loginBtn.style.display = "inline-block";
    if (logoutBtn) logoutBtn.style.display = "none";
    if (greeting) greeting.style.display = "none";
  }
}

// Handle Login
function handleLogin(event) {
  event.preventDefault();
  clearErrors();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  let valid = true;

  if (!validateEmail(email)) {
    showError("loginEmailErr", "Please enter a valid email address.");
    valid = false;
  }
  if (password.length < 6) {
    showError("loginPassErr", "Password must be at least 6 characters.");
    valid = false;
  }

  if (!valid) return;

  // Check users list
  const users = getAllUsers();
  const found = users.find(u => u.email === email && u.password === btoa(password));

  if (found) {
    // Existing user
    saveSession({ name: found.name, email: found.email });
    closeLoginModal();
    updateNavbar();
    showToast("Welcome back, " + found.name.split(" ")[0] + "! 🎉", "success");
  } else {
    // New demo user (simulate server accepting any valid credentials)
    const demoUser = { name: email.split("@")[0], email };
    saveSession(demoUser);
    closeLoginModal();
    updateNavbar();
    showToast("Logged in as " + demoUser.name + " 👋", "success");
  }
}

// Handle Register
function handleRegister(event) {
  event.preventDefault();
  clearErrors();

  const name    = document.getElementById("regName").value.trim();
  const email   = document.getElementById("regEmail").value.trim();
  const phone   = document.getElementById("regPhone").value.trim();
  const password= document.getElementById("regPassword").value;

  let valid = true;

  if (name.length < 3) {
    showError("regNameErr", "Name must be at least 3 characters.");
    valid = false;
  }
  if (!validateEmail(email)) {
    showError("regEmailErr", "Please enter a valid email.");
    valid = false;
  }
  if (!/^\d{10}$/.test(phone)) {
    showError("regPhoneErr", "Enter a valid 10-digit phone number.");
    valid = false;
  }
  if (password.length < 6) {
    showError("regPassErr", "Password must be at least 6 characters.");
    valid = false;
  }

  if (!valid) return;

  // Check if email already exists
  const users = getAllUsers();
  if (users.find(u => u.email === email)) {
    showError("regEmailErr", "This email is already registered. Please login.");
    return;
  }

  // Save new user
  const newUser = { name, email, phone, password: btoa(password) };
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  // Auto-login
  saveSession({ name, email });
  closeLoginModal();
  updateNavbar();
  showToast("Account created! Welcome, " + name.split(" ")[0] + "! 🎉", "success");
}

// Logout
function logout() {
  localStorage.removeItem(AUTH_KEY);
  updateNavbar();
  showToast("Logged out successfully. See you soon! 👋", "info");
}

// Modal controls
function openLoginModal() {
  document.getElementById("loginModal").classList.add("open");
  document.body.style.overflow = "hidden";
  switchTab("login");
}

function closeLoginModal() {
  document.getElementById("loginModal").classList.remove("open");
  document.body.style.overflow = "";
  clearErrors();
}

function switchTab(tab) {
  const loginForm    = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const loginTab     = document.getElementById("loginTabBtn");
  const regTab       = document.getElementById("registerTabBtn");
  if (tab === "login") {
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    loginTab.classList.add("active");
    regTab.classList.remove("active");
  } else {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    regTab.classList.add("active");
    loginTab.classList.remove("active");
  }
  clearErrors();
}

// Nav hamburger toggle
function toggleMenu() {
  const links = document.getElementById("navLinks");
  const hb = document.getElementById("hamburger");
  links.classList.toggle("open");
  hb.classList.toggle("active");
}

// Sticky navbar
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (navbar) {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  }
});

// Close modal on outside click
document.addEventListener("click", function (e) {
  const modal = document.getElementById("loginModal");
  if (modal && e.target === modal) closeLoginModal();
});

// ---- Utilities ----
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}

function clearErrors() {
  document.querySelectorAll(".error-msg").forEach(el => el.textContent = "");
}

function togglePwd(inputId, iconEl) {
  const input = document.getElementById(inputId);
  if (input.type === "password") {
    input.type = "text";
    iconEl.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    input.type = "password";
    iconEl.classList.replace("fa-eye-slash", "fa-eye");
  }
}

// Toast notification
function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = "toast toast-" + type;
  toast.innerHTML = '<i class="fas ' + (type === "success" ? "fa-check-circle" : "fa-info-circle") + '"></i> ' + sanitize(message);
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// Initialize navbar state on page load
document.addEventListener("DOMContentLoaded", updateNavbar);
