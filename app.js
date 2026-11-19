// =============================================
// app.js - Home page logic
// =============================================

document.addEventListener("DOMContentLoaded", function () {
  loadFeaturedMovies();
});

async function loadFeaturedMovies() {
  const grid = document.getElementById("movieGrid");
  if (!grid) return;

  grid.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> Loading movies...</div>';

  try {
    // Simulate REST API call
    const response = await apiGetMovies();
    if (response.status === 200) {
      grid.innerHTML = "";
      // Show first 4 movies on home
      response.data.slice(0, 4).forEach(movie => {
        grid.appendChild(createMovieCard(movie));
      });
    }
  } catch (err) {
    console.error("Failed to load movies:", err);
    grid.innerHTML = '<p class="error-text">Failed to load movies. Please refresh the page.</p>';
  }
}

function createMovieCard(movie) {
  const card = document.createElement("div");
  card.className = "movie-card";
  card.innerHTML = `
    <div class="movie-poster-wrap">
      <img src="${sanitize(movie.poster)}" alt="${sanitize(movie.title)}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x420/1a1a2e/ffffff?text=No+Image'"/>
      <div class="movie-overlay">
        <span class="cert-badge">${sanitize(movie.certificate)}</span>
        <a href="movies.html" class="btn btn-sm btn-primary">View Details</a>
      </div>
      <span class="movie-genre-tag">${sanitize(movie.genre)}</span>
    </div>
    <div class="movie-info">
      <h3>${sanitize(movie.title)}</h3>
      <div class="movie-meta">
        <span class="rating"><i class="fas fa-star" style="color:#f5a623"></i> ${movie.rating}</span>
        <span class="duration"><i class="fas fa-clock"></i> ${sanitize(movie.duration)}</span>
      </div>
      <p class="movie-lang"><i class="fas fa-language"></i> ${sanitize(movie.language)}</p>
      <a href="booking.html" class="btn btn-primary btn-sm book-btn">Book Now</a>
    </div>
  `;
  return card;
}
