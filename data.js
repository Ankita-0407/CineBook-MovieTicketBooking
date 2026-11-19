const MOVIES_DATA = [
  {
    id: 1,
    title: "Kalki 2898 AD",
    genre: "Sci-Fi",
    language: "Hindi",
    duration: "180 min",
    rating: 8.4,
    votes: "12K",
    certificate: "U/A",
    description: "A futuristic epic set in the year 2898 AD where ancient mythology meets science fiction. A story of destiny, love and the ultimate battle between good and evil.",
    cast: ["Prabhas", "Deepika Padukone", "Amitabh Bachchan", "Kamal Haasan"],
    director: "Nag Ashwin",
    releaseDate: "27 Jun 2026",
    poster: "https://image.tmdb.org/t/p/w500/rstcAnBeCkxNQjNp3YXrF6IP1tW.jpg",
    trailerUrl: "#",
    tags: ["Sci-Fi", "Action", "Mythological"],
    cinemas: [
      {
        name: "PVR Cinemas, Andheri",
        city: "Mumbai",
        prices: { regular: 220, premium: 350 },
        dates: ["2026-12-20", "2026-12-21", "2026-12-22"],
        shows: ["10:00 AM", "1:30 PM", "5:00 PM", "9:00 PM"],
        bookedSeats: { "10:00 AM": ["A3","B5","C2"], "1:30 PM": ["D4","E1","F7","B2"], "5:00 PM": ["A1","A2","C3"], "9:00 PM": ["G5","H3"] }
      },
      {
        name: "INOX, Lower Parel",
        city: "Mumbai",
        prices: { regular: 200, premium: 320 },
        dates: ["2026-12-20", "2026-12-21", "2026-12-22"],
        shows: ["11:00 AM", "2:30 PM", "6:30 PM", "10:00 PM"],
        bookedSeats: { "11:00 AM": ["B1","B2"], "2:30 PM": ["A5","D3"], "6:30 PM": [], "10:00 PM": ["C4","E2"] }
      }
    ]
  },
  {
    id: 2,
    title: "Stree 2",
    genre: "Horror",
    language: "Hindi",
    duration: "137 min",
    rating: 8.9,
    votes: "21K",
    certificate: "A",
    description: "The horror-comedy sequel returns! The town of Chanderi faces a new supernatural threat and Stree is back with a bigger, scarier presence than ever before.",
    cast: ["Rajkummar Rao", "Shraddha Kapoor", "Pankaj Tripathi", "Aparshakti Khurana"],
    director: "Amar Kaushik",
    releaseDate: "15 Aug 2026",
    poster: "https://image.tmdb.org/t/p/w500/2NC7sj8rheKxWqLYAbHnCa4mYBH.jpg",
    trailerUrl: "#",
    tags: ["Horror", "Comedy", "Supernatural"],
    cinemas: [
      {
        name: "Cinepolis, Thane",
        city: "Mumbai",
        prices: { regular: 180, premium: 290 },
        dates: ["2026-12-20", "2026-12-21", "2026-12-22"],
        shows: ["11:30 AM", "3:00 PM", "7:00 PM", "10:30 PM"],
        bookedSeats: { "11:30 AM": ["A1","A2","A3"], "3:00 PM": ["C1","C2"], "7:00 PM": ["D5","E3","F2"], "10:30 PM": [] }
      }
    ]
  },
  {
    id: 3,
    title: "Ramayana: Part 1",
    genre: "Mythology",
    language: "Hindi",
    duration: "195 min",
    rating: 9.0,
    votes: "48K",
    certificate: "U",
    description: "Namit Malhotra's Ramayana - Our Truth. Our History. Prince Rama's journey from childhood to his 14-year exile. Directed by Nitesh Tiwari. Part 1 of the epic two-part film. Filmed for IMAX.",
    cast: ["Ranbir Kapoor", "Sai Pallavi", "Yash", "Sunny Deol", "Ravie Dubey"],
    director: "Nitesh Tiwari",
    releaseDate: "05 Nov 2026",
    poster: "https://getmovieinfo.com/wp-content/uploads/2026/10/IMG-20261031-WA0126.jpg",
    trailerUrl: "#",
    tags: ["Mythology", "Action", "Drama"],
    cinemas: [
      {
        name: "PVR Cinemas, Andheri",
        city: "Mumbai",
        prices: { regular: 250, premium: 400 },
        dates: ["2026-12-20", "2026-12-21", "2026-12-22"],
        shows: ["10:00 AM", "1:30 PM", "5:00 PM", "9:00 PM"],
        bookedSeats: { "10:00 AM": ["B4","C3"], "1:30 PM": ["A6","D1"], "5:00 PM": [], "9:00 PM": ["E5"] }
      }
    ]
  },
  {
    id: 4,
    title: "The Buckingham Murders",
    genre: "Thriller",
    language: "English",
    duration: "116 min",
    rating: 7.6,
    votes: "5K",
    certificate: "U/A",
    description: "A gripping crime thriller where a detective investigates a series of mysterious murders near Buckingham. Dark secrets unravel one clue at a time.",
    cast: ["Kareena Kapoor Khan", "Ash Tandon", "Keith Allen"],
    director: "Hansal Mehta",
    releaseDate: "13 Sep 2026",
    poster: "https://image.tmdb.org/t/p/w500/lCLU5qZIbqduKQ3jMGWEeTrAiOV.jpg",
    trailerUrl: "#",
    tags: ["Thriller", "Crime", "Mystery"],
    cinemas: [
      {
        name: "INOX, BKC",
        city: "Mumbai",
        prices: { regular: 190, premium: 300 },
        dates: ["2026-12-20", "2026-12-21", "2026-12-22"],
        shows: ["12:00 PM", "3:30 PM", "7:30 PM"],
        bookedSeats: { "12:00 PM": ["B2","C4"], "3:30 PM": ["A3","D5"], "7:30 PM": ["F1"] }
      }
    ]
  },
  {
    id: 5,
    title: "Vettaiyan",
    genre: "Action",
    language: "Tamil",
    duration: "170 min",
    rating: 7.9,
    votes: "9K",
    certificate: "U/A",
    description: "A powerful action drama featuring Rajinikanth as a no-nonsense cop who takes justice into his own hands while battling corruption at the highest levels.",
    cast: ["Rajinikanth", "Amitabh Bachchan", "Fahadh Faasil", "Rana Daggubati"],
    director: "TJ Gnanavel",
    releaseDate: "10 Oct 2026",
    poster: "https://image.tmdb.org/t/p/w500/b3AeMIsXPm6wvGp9E7mGmRZ6528.jpg",
    trailerUrl: "#",
    tags: ["Action", "Drama", "Police"],
    cinemas: [
      {
        name: "SPI Cinemas, Chennai",
        city: "Chennai",
        prices: { regular: 160, premium: 260 },
        dates: ["2026-12-20", "2026-12-21", "2026-12-22"],
        shows: ["9:00 AM", "12:30 PM", "4:00 PM", "8:00 PM"],
        bookedSeats: { "9:00 AM": ["A1","A2","B3"], "12:30 PM": ["C5","D2"], "4:00 PM": ["E1","F3"], "8:00 PM": ["G2","H4"] }
      }
    ]
  },
  {
    id: 6,title: "Deadpool & Wolverine",
    genre: "Action",
    language: "English",
    duration: "128 min",
    rating: 8.7,
    votes: "35K",
    certificate: "A",
    description: "Wade Wilson aka Deadpool joins forces with Wolverine in the MCU for the first time. The unlikely duo must save the multiverse in the most irreverent Marvel movie yet.",
    cast: ["Ryan Reynolds", "Hugh Jackman", "Emma Corrin", "Jennifer Garner"],
    director: "Shawn Levy",
    releaseDate: "26 Jul 2026",
    poster: "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    trailerUrl: "#",
    tags: ["Action", "Comedy", "Marvel", "Superhero"],
    cinemas: [
      {
        name: "PVR Icon, Versova",
        city: "Mumbai",
        prices: { regular: 250, premium: 400 },
        dates: ["2026-12-20", "2026-12-21", "2026-12-22"],
        shows: ["10:30 AM", "2:00 PM", "5:30 PM", "9:30 PM"],
        bookedSeats: { "10:30 AM": ["A5","B3","C6"], "2:00 PM": ["D1","E4"], "5:30 PM": ["A1","B1","C1"], "9:30 PM": ["F3","G2"] }
      }
    ]
  }
];

// Seat layout config
const SEAT_LAYOUT = {
  rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
  seatsPerRow: 10,
  premiumRows: ['A', 'B'],
};

// Helper: get movie by id
function getMovieById(id) {
  return MOVIES_DATA.find(m => m.id === parseInt(id));
}

// Simulate REST API call (mimics fetch from server)
function apiGetMovies() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ status: 200, data: MOVIES_DATA }), 300);
  });
}

function apiGetMovieById(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const movie = getMovieById(id);
      if (movie) resolve({ status: 200, data: movie });
      else reject({ status: 404, message: "Movie not found" });
    }, 200);
  });
}

// Simulate booking API
function apiCreateBooking(bookingData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const bookingId = "CB" + Date.now().toString().slice(-8);
      resolve({ status: 201, data: { bookingId, ...bookingData, timestamp: new Date().toISOString() } });
    }, 1500);
  });
}

// Utility: sanitize input (XSS prevention)
function sanitize(str) {
  if (typeof str !== "string") return "";
  return str.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
}

// Utility: format currency
function formatCurrency(amount) {
  return "₹" + amount.toLocaleString("en-IN");
}

// Utility: generate star rating HTML
function getStarRating(rating) {
  const full = Math.floor(rating / 2);
  const half = (rating / 2) % 1 >= 0.5 ? 1 : 0;
  let stars = "";
  for (let i = 0; i < full; i++) stars += '<i class="fas fa-star"></i>';
  if (half) stars += '<i class="fas fa-star-half-alt"></i>';
  return stars;
}