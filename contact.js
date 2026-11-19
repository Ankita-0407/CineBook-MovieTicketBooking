// =============================================
// contact.js - Contact page logic
// =============================================

document.addEventListener("DOMContentLoaded", function () {
  const msgArea = document.getElementById("cMessage");
  if (msgArea) {
    msgArea.addEventListener("input", function () {
      const count = this.value.length;
      document.getElementById("charCount").textContent = count + " / 500 characters";
      if (count > 500) this.value = this.value.substring(0, 500);
    });
  }
});

function submitContact(event) {
  event.preventDefault();
  clearErrors();

  const name    = document.getElementById("cName").value.trim();
  const email   = document.getElementById("cEmail").value.trim();
  const subject = document.getElementById("cSubject").value;
  const message = document.getElementById("cMessage").value.trim();

  let valid = true;

  if (name.length < 2) {
    showError("cNameErr", "Name must be at least 2 characters."); valid = false;
  }
  if (!validateEmail(email)) {
    showError("cEmailErr", "Please enter a valid email address."); valid = false;
  }
  if (!subject) {
    showError("cSubjectErr", "Please select a subject."); valid = false;
  }
  if (message.length < 10) {
    showError("cMsgErr", "Message must be at least 10 characters."); valid = false;
  }

  if (!valid) return;

  const submitBtn = event.target.querySelector("button");
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  // Simulate API call
  setTimeout(() => {
    // Store in localStorage
    const contacts = JSON.parse(localStorage.getItem("cinebook_contacts") || "[]");
    contacts.push({ name, email, subject, message, timestamp: new Date().toISOString() });
    localStorage.setItem("cinebook_contacts", JSON.stringify(contacts));

    document.getElementById("contactForm").reset();
    document.getElementById("charCount").textContent = "0 / 500 characters";
    document.getElementById("contactSuccess").style.display = "block";
    submitBtn.disabled = false;
    submitBtn.innerHTML = "Send Message";

    setTimeout(() => {
      document.getElementById("contactSuccess").style.display = "none";
    }, 5000);
  }, 1200);
}

function toggleFAQ(btn) {
  const answer = btn.nextElementSibling;
  const icon   = btn.querySelector("i");
  const isOpen = answer.classList.contains("open");

  document.querySelectorAll(".faq-a").forEach(a => a.classList.remove("open"));
  document.querySelectorAll(".faq-q i").forEach(i => i.style.transform = "rotate(0deg)");

  if (!isOpen) {
    answer.classList.add("open");
    icon.style.transform = "rotate(180deg)";
  }
}
