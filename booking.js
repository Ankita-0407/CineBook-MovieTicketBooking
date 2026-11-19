// =============================================
// booking.js - Multi-step booking logic
// =============================================

let bookingState = {
  movie: null,
  cinema: null,
  date: null,
  showTime: null,
  selectedSeats: [],
  totalAmount: 0,
};

// ---- STEP 1 ----
document.addEventListener("DOMContentLoaded", function () {
  populateMovieSelect();
});

function populateMovieSelect() {
  const sel = document.getElementById("movieSelect");
  MOVIES_DATA.forEach(m => {
    const opt = document.createElement("option");
    opt.value = m.id;
    opt.textContent = m.title + " (" + m.language + ")";
    sel.appendChild(opt);
  });
}

function onMovieChange() {
  const id = document.getElementById("movieSelect").value;
  bookingState.movie = id ? getMovieById(id) : null;
  bookingState.cinema = null;
  bookingState.date = null;
  bookingState.showTime = null;

  const cinemaGroup  = document.getElementById("cinemaGroup");
  const dateGroup    = document.getElementById("dateGroup");
  const showCont     = document.getElementById("showTimesContainer");
  dateGroup.style.display = "none";
  showCont.style.display  = "none";
  document.getElementById("toStep2Btn").disabled = true;

  if (bookingState.movie) {
    const cinemaSel = document.getElementById("cinemaSelect");
    cinemaSel.innerHTML = '<option value="">-- Choose Cinema --</option>';
    bookingState.movie.cinemas.forEach((c, i) => {
      const opt = document.createElement("option");
      opt.value = i;
      opt.textContent = c.name + " — " + c.city;
      cinemaSel.appendChild(opt);
    });
    cinemaGroup.style.display = "block";
  } else {
    cinemaGroup.style.display = "none";
  }
}

function onCinemaChange() {
  const idx = document.getElementById("cinemaSelect").value;
  bookingState.cinema = idx !== "" ? bookingState.movie.cinemas[parseInt(idx)] : null;
  bookingState.date = null;
  bookingState.showTime = null;

  const dateGroup = document.getElementById("dateGroup");
  const showCont  = document.getElementById("showTimesContainer");
  showCont.style.display = "none";
  document.getElementById("toStep2Btn").disabled = true;

  if (bookingState.cinema) {
    const dateSel = document.getElementById("dateSelect");
    dateSel.innerHTML = '<option value="">-- Choose Date --</option>';
    bookingState.cinema.dates.forEach(d => {
      const opt = document.createElement("option");
      opt.value = d;
      const dateObj = new Date(d);
      opt.textContent = dateObj.toDateString();
      dateSel.appendChild(opt);
    });
    dateGroup.style.display = "block";
  } else {
    dateGroup.style.display = "none";
  }
}

function onDateChange() {
  bookingState.date = document.getElementById("dateSelect").value || null;
  bookingState.showTime = null;
  document.getElementById("toStep2Btn").disabled = true;

  const showCont = document.getElementById("showTimesContainer");
  if (bookingState.date && bookingState.cinema) {
    const grid = document.getElementById("showTimeGrid");
    grid.innerHTML = "";
    bookingState.cinema.shows.forEach(show => {
      const btn = document.createElement("button");
      btn.className = "showtime-btn";
      btn.textContent = show;
      btn.onclick = function () {
        document.querySelectorAll(".showtime-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        bookingState.showTime = show;
        document.getElementById("toStep2Btn").disabled = false;
      };
      grid.appendChild(btn);
    });
    showCont.style.display = "block";
  } else {
    showCont.style.display = "none";
  }
}

function goToStep2() {
  const user = getCurrentUser();
  if (!user) {
    showToast("Please login to book tickets!", "info");
    openLoginModal();
    return;
  }
  goToStep(2);
  buildSeatMap();
  updateSummaryPanel();
}

// ---- STEP 2 ----
function buildSeatMap() {
  const map = document.getElementById("seatMap");
  map.innerHTML = "";
  const booked = bookingState.cinema.bookedSeats[bookingState.showTime] || [];
  bookingState.selectedSeats = [];

  SEAT_LAYOUT.rows.forEach(row => {
    const rowDiv = document.createElement("div");
    rowDiv.className = "seat-row";

    const label = document.createElement("span");
    label.className = "row-label";
    label.textContent = row;
    rowDiv.appendChild(label);

    for (let i = 1; i <= SEAT_LAYOUT.seatsPerRow; i++) {
      const seatId = row + i;
      const seat = document.createElement("button");
      seat.className = "seat";
      seat.title = seatId;
      seat.dataset.id = seatId;

      if (SEAT_LAYOUT.premiumRows.includes(row)) seat.classList.add("premium");
      if (booked.includes(seatId)) {
        seat.classList.add("booked");
        seat.disabled = true;
      }

      seat.onclick = function () { toggleSeat(seat, row); };
      rowDiv.appendChild(seat);
    }
    map.appendChild(rowDiv);
  });
}

function toggleSeat(seatEl, row) {
  const seatId = seatEl.dataset.id;
  if (seatEl.classList.contains("booked")) return;

  if (seatEl.classList.contains("selected")) {
    seatEl.classList.remove("selected");
    bookingState.selectedSeats = bookingState.selectedSeats.filter(s => s !== seatId);
  } else {
    if (bookingState.selectedSeats.length >= 8) {
      showToast("Max 8 seats per booking!", "info");
      return;
    }
    seatEl.classList.add("selected");
    bookingState.selectedSeats.push(seatId);
  }

  updateSummaryPanel();
  document.getElementById("toStep3Btn").disabled = bookingState.selectedSeats.length === 0;
}

function updateSummaryPanel() {
  const info = document.getElementById("summaryInfo");
  const seatsEl = document.getElementById("summarySeats");
  const totalEl = document.getElementById("summaryTotal");

  if (!bookingState.movie) return;

  info.innerHTML = `
    <p><strong>Movie:</strong> ${sanitize(bookingState.movie.title)}</p>
    <p><strong>Cinema:</strong> ${sanitize(bookingState.cinema ? bookingState.cinema.name : "—")}</p>
    <p><strong>Date:</strong> ${bookingState.date ? new Date(bookingState.date).toDateString() : "—"}</p>
    <p><strong>Show:</strong> ${sanitize(bookingState.showTime || "—")}</p>
  `;

  if (bookingState.selectedSeats.length > 0) {
    const cinema = bookingState.cinema;
    let total = 0;
    const rows = bookingState.selectedSeats.map(s => {
      const row = s[0];
      const isPremium = SEAT_LAYOUT.premiumRows.includes(row);
      const price = isPremium ? cinema.prices.premium : cinema.prices.regular;
      total += price;
      return `<span class="seat-pill ${isPremium ? "premium" : ""}">${sanitize(s)} (${formatCurrency(price)})</span>`;
    });
    seatsEl.innerHTML = `<div class="seats-pill-wrap">${rows.join("")}</div>`;
    bookingState.totalAmount = total + 50; // + ₹50 convenience fee
    totalEl.innerHTML = `
      <div class="total-line"><span>Subtotal</span><span>${formatCurrency(total)}</span></div>
      <div class="total-line"><span>Convenience Fee</span><span>${formatCurrency(50)}</span></div>
      <div class="total-line total-grand"><span>Total</span><span>${formatCurrency(bookingState.totalAmount)}</span></div>
    `;
  } else {
    seatsEl.innerHTML = "<p>No seats selected yet.</p>";
    totalEl.innerHTML = "";
  }
}

function goToStep3() {
  if (bookingState.selectedSeats.length === 0) {
    showToast("Please select at least one seat!", "info");
    return;
  }
  goToStep(3);
  renderOrderSummary();
  updatePaymentBanners();
}

// ---- STEP 3 ----
function renderOrderSummary() {
  const el = document.getElementById("orderSummaryContent");
  const cinema = bookingState.cinema;
  let seatsHtml = bookingState.selectedSeats.map(s => {
    const isPremium = SEAT_LAYOUT.premiumRows.includes(s[0]);
    const price = isPremium ? cinema.prices.premium : cinema.prices.regular;
    return `<div class="order-line"><span>${sanitize(s)} (${isPremium ? "Premium" : "Regular"})</span><span>${formatCurrency(price)}</span></div>`;
  }).join("");

  el.innerHTML = `
    <div class="order-movie">${sanitize(bookingState.movie.title)}</div>
    <p>${sanitize(cinema.name)}</p>
    <p>${new Date(bookingState.date).toDateString()} | ${sanitize(bookingState.showTime)}</p>
    <hr/>
    ${seatsHtml}
    <hr/>
    <div class="order-line"><span>Convenience Fee</span><span>${formatCurrency(50)}</span></div>
    <div class="order-line order-total"><span><strong>Total</strong></span><span><strong>${formatCurrency(bookingState.totalAmount)}</strong></span></div>
  `;
}

function updatePaymentBanners() {
  const banners = ["payTotalBanner","payTotalBanner2","payTotalBanner3"];
  banners.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = `<i class="fas fa-lock"></i> Total Payable: <strong>${formatCurrency(bookingState.totalAmount)}</strong>`;
  });
}

function showPaymentForm(type) {
  document.getElementById("cardForm").style.display   = type === "card"   ? "block" : "none";
  document.getElementById("upiForm").style.display    = type === "upi"    ? "block" : "none";
  document.getElementById("walletForm").style.display = type === "wallet" ? "block" : "none";
}

// Card number formatting
function formatCard(input) {
  let v = input.value.replace(/\D/g, "").substring(0, 16);
  input.value = v.replace(/(.{4})/g, "$1 ").trim();
}

// Expiry formatting
function formatExpiry(input) {
  let v = input.value.replace(/\D/g, "").substring(0, 4);
  if (v.length >= 3) v = v.substring(0, 2) + "/" + v.substring(2);
  input.value = v;
}

// Payment validation & processing
function processPayment(event) {
  event.preventDefault();
  clearErrors();

  const method = document.querySelector('input[name="payMethod"]:checked').value;
  let valid = true;

  if (method === "card") {
    const num    = document.getElementById("cardNumber").value.replace(/\s/g, "");
    const expiry = document.getElementById("cardExpiry").value;
    const cvv    = document.getElementById("cardCVV").value;

    if (!/^\d{16}$/.test(num)) {
      showError("cardNumErr", "Enter a valid 16-digit card number."); valid = false;
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      showError("cardExpErr", "Enter expiry as MM/YY."); valid = false;
    } else {
      const [mm, yy] = expiry.split("/").map(Number);
      const now = new Date();
      const expDate = new Date(2000 + yy, mm - 1);
      if (mm < 1 || mm > 12 || expDate < now) {
        showError("cardExpErr", "Card is expired or invalid."); valid = false;
      }
    }
    if (!/^\d{3}$/.test(cvv)) {
      showError("cardCVVErr", "CVV must be 3 digits."); valid = false;
    }
  }

  if (method === "upi") {
    const upiId = document.getElementById("upiId").value.trim();
    if (!/^[\w.\-_]+@[\w]+$/.test(upiId)) {
      showError("upiIdErr", "Enter a valid UPI ID (e.g. name@bank)"); valid = false;
    }
  }

  if (!valid) return;

  // Simulate payment processing
  const submitBtn = event.target.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

  const bookingData = {
    movie: bookingState.movie.title,
    cinema: bookingState.cinema.name,
    date: bookingState.date,
    showTime: bookingState.showTime,
    seats: bookingState.selectedSeats,
    totalAmount: bookingState.totalAmount,
    paymentMethod: method,
    user: getCurrentUser(),
  };

  apiCreateBooking(bookingData).then(response => {
    if (response.status === 201) {
      // Save to localStorage (booking history)
      const history = JSON.parse(localStorage.getItem("cinebook_bookings") || "[]");
      history.push(response.data);
      localStorage.setItem("cinebook_bookings", JSON.stringify(history));

      goToStep(4);
      renderTicket(response.data);
      showToast("Booking Confirmed! 🎉", "success");
    }
  }).catch(err => {
    console.error("Booking failed:", err);
    submitBtn.disabled = false;
    submitBtn.innerHTML = "Pay Now & Confirm Booking";
    showToast("Payment failed. Please try again.", "info");
  });
}

// ---- STEP 4 ----
function renderTicket(booking) {
  const card = document.getElementById("ticketCard");
  const user = getCurrentUser();
  card.innerHTML = `
    <div class="ticket-header">
      <span><i class="fas fa-film"></i> CineBook</span>
      <span class="ticket-id">Booking ID: <strong>${sanitize(booking.bookingId)}</strong></span>
    </div>
    <div class="ticket-body">
      <div class="ticket-movie">${sanitize(booking.movie)}</div>
      <div class="ticket-details-grid">
        <div><i class="fas fa-map-marker-alt"></i><strong>Cinema</strong><br/>${sanitize(booking.cinema)}</div>
        <div><i class="fas fa-calendar"></i><strong>Date</strong><br/>${new Date(booking.date).toDateString()}</div>
        <div><i class="fas fa-clock"></i><strong>Show Time</strong><br/>${sanitize(booking.showTime)}</div>
        <div><i class="fas fa-couch"></i><strong>Seats</strong><br/>${booking.seats.map(s => sanitize(s)).join(", ")}</div>
        <div><i class="fas fa-user"></i><strong>Booked By</strong><br/>${sanitize(user ? user.name : "Guest")}</div>
        <div><i class="fas fa-rupee-sign"></i><strong>Amount Paid</strong><br/>${formatCurrency(booking.totalAmount)}</div>
      </div>
    </div>
    <div class="ticket-footer">
      <div class="ticket-barcode">||||  |||  ||||  ||  |||  ||||  ||  |||</div>
      <p>Please carry this ticket & a valid ID to the cinema.</p>
    </div>
  `;
}

function printTicket() {
  window.print();
}

function newBooking() {
  bookingState = { movie: null, cinema: null, date: null, showTime: null, selectedSeats: [], totalAmount: 0 };
  document.getElementById("movieSelect").value = "";
  onMovieChange();
  goToStep(1);
}

// ---- Step navigation ----
function goToStep(num) {
  [1, 2, 3, 4].forEach(n => {
    const el = document.getElementById("step" + n);
    if (el) el.style.display = n === num ? "block" : "none";
    const ind = document.getElementById("step" + n + "Ind");
    if (ind) {
      ind.classList.remove("active", "done");
      if (n < num)  ind.classList.add("done");
      if (n === num) ind.classList.add("active");
    }
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}
