// =============================================
// movies.js - Movies listing page logic
// =============================================

let allMovies = [];

document.addEventListener("DOMContentLoaded", async function () {
  await loadAllMovies();
});

async function loadAllMovies() {
  const grid = document.getElementById("allMoviesGrid");
  grid.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> Loading movies...</div>';

  try {
    const response = await apiGetMovies();
    allMovies = response.data;
    renderMovies(allMovies);
  } catch (err) {
    grid.innerHTML = '<p class="error-text">Failed to load movies.</p>';
  }
}

function renderMovies(movies) {
  const grid = document.getElementById("allMoviesGrid");
  const noResults = document.getElementById("noResults");

  if (movies.length === 0) {
    grid.innerHTML = "";
    noResults.style.display = "block";
    return;
  }

  noResults.style.display = "none";
  grid.innerHTML = "";

  movies.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
      <div class="movie-poster-wrap">
        <img src="${sanitize(movie.poster)}" alt="${sanitize(movie.title)}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x420/1a1a2e/ffffff?text=No+Image'"/>
        <div class="movie-overlay">
          <span class="cert-badge">${sanitize(movie.certificate)}</span>
          <button class="btn btn-sm btn-primary" onclick="showMovieDetail(${movie.id})">View Details</button>
        </div>
        <span class="movie-genre-tag">${sanitize(movie.genre)}</span>
      </div>
      <div class="movie-info">
        <h3>${sanitize(movie.title)}</h3>
        <div class="movie-meta">
          <span class="rating"><i class="fas fa-star" style="color:#f5a623"></i> ${movie.rating}/10</span>
          <span class="duration"><i class="fas fa-clock"></i> ${sanitize(movie.duration)}</span>
        </div>
        <p class="movie-lang"><i class="fas fa-language"></i> ${sanitize(movie.language)}</p>
        <div class="movie-tags">${movie.tags.map(t => `<span class="tag">${sanitize(t)}</span>`).join("")}</div>
        <a href="booking.html" class="btn btn-primary btn-sm book-btn" style="margin-top:0.5rem">Book Tickets</a>
      </div>
    `;
    grid.appendChild(card);
  });
}

function filterMovies() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const genre  = document.getElementById("genreFilter").value;
  const lang   = document.getElementById("langFilter").value;

  const filtered = allMovies.filter(movie => {
    const matchSearch = movie.title.toLowerCase().includes(search) ||
                        movie.director.toLowerCase().includes(search) ||
                        movie.cast.some(c => c.toLowerCase().includes(search));
    const matchGenre  = genre ? movie.genre === genre : true;
    const matchLang   = lang  ? movie.language === lang : true;
    return matchSearch && matchGenre && matchLang;
  });

  renderMovies(filtered);
}

async function showMovieDetail(id) {
  const modal   = document.getElementById("movieModal");
  const content = document.getElementById("movieModalContent");
  content.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i></div>';
  modal.classList.add("open");
  document.body.style.overflow = "hidden";

  try {
    const response = await apiGetMovieById(id);
    const m = response.data;
    content.innerHTML = `
      <div class="movie-detail-layout">
        <div class="movie-detail-poster">
          <img src="${sanitize(m.poster)}" alt="${sanitize(m.title)}" onerror="this.src='https://via.placeholder.com/300x420/1a1a2e/ffffff?text=No+Image'"/>
        </div>
        <div class="movie-detail-info">
          <span class="cert-badge">${sanitize(m.certificate)}</span>
          <h2>${sanitize(m.title)}</h2>
          <div class="detail-meta">
            <span><i class="fas fa-star" style="color:#f5a623"></i> ${m.rating}/10 (${m.votes} votes)</span>
            <span><i class="fas fa-clock"></i> ${sanitize(m.duration)}</span>
            <span><i class="fas fa-calendar"></i> ${sanitize(m.releaseDate)}</span>
            <span><i class="fas fa-language"></i> ${sanitize(m.language)}</span>
          </div>
          <div class="movie-tags" style="margin:0.5rem 0">${m.tags.map(t => `<span class="tag">${sanitize(t)}</span>`).join("")}</div>
          <p class="movie-description">${sanitize(m.description)}</p>
          <div class="detail-section">
            <h4><i class="fas fa-user-tie"></i> Director</h4>
            <p>${sanitize(m.director)}</p>
          </div>
          <div class="detail-section">
            <h4><i class="fas fa-users"></i> Cast</h4>
            <p>${m.cast.map(c => sanitize(c)).join(", ")}</p>
          </div>
          <div class="detail-section">
            <h4><i class="fas fa-ticket-alt"></i> Available At</h4>
            ${m.cinemas.map(c => `<p><i class="fas fa-map-marker-alt" style="color:#e94560"></i> ${sanitize(c.name)} — From ${formatCurrency(c.prices.regular)}</p>`).join("")}
          </div>
          <a href="booking.html" class="btn btn-primary" style="margin-top:1rem;display:inline-block">
            <i class="fas fa-ticket-alt"></i> Book Tickets
          </a>
        </div>
      </div>
    `;
  } catch (err) {
    content.innerHTML = '<p class="error-text">Could not load movie details. Please try again.</p>';
  }
}

function closeMovieModal() {
  document.getElementById("movieModal").classList.remove("open");
  document.body.style.overflow = "";
}

document.addEventListener("click", function (e) {
  const modal = document.getElementById("movieModal");
  if (modal && e.target === modal) closeMovieModal();
});
