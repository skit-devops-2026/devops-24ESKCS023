// ===== Dummy Book Data (temporary, until backend is connected in Phase 7) =====
const dummyBooks = [
  {
    id: 1,
    title: "Python Programming",
    author: "John Smith",
    category: "Programming",
    description: "A beginner-friendly introduction to Python programming, covering syntax, data structures, and simple projects.",
    coverUrl: "https://placehold.co/200x260?text=Python",
    bookUrl: "#"
  },
  {
    id: 2,
    title: "The Silent Ocean",
    author: "Maria Lane",
    category: "Fiction",
    description: "A gripping story of a lone sailor crossing the Pacific, and the secrets she uncovers along the way.",
    coverUrl: "https://placehold.co/200x260?text=Silent+Ocean",
    bookUrl: "#"
  },
  {
    id: 3,
    title: "World History Basics",
    author: "David Cole",
    category: "History",
    description: "A concise walkthrough of major world events, from ancient civilizations to the modern era.",
    coverUrl: "https://placehold.co/200x260?text=History",
    bookUrl: "#"
  },
  {
    id: 4,
    title: "Modern Physics",
    author: "Anita Rao",
    category: "Science",
    description: "An accessible guide to modern physics concepts including relativity, quantum mechanics, and more.",
    coverUrl: "https://placehold.co/200x260?text=Physics",
    bookUrl: "#"
  },
  {
    id: 5,
    title: "The Long Road Home",
    author: "Marcus Webb",
    category: "Fiction",
    description: "A moving tale of a soldier's journey back to his family after years away from home.",
    coverUrl: "https://placehold.co/200x260?text=Long+Road",
    bookUrl: "#"
  },
  {
    id: 6,
    title: "JavaScript Essentials",
    author: "Priya Nair",
    category: "Programming",
    description: "Everything a beginner needs to start building with JavaScript, explained in plain language.",
    coverUrl: "https://placehold.co/200x260?text=JavaScript",
    bookUrl: "#"
  },
  {
    id: 7,
    title: "Life of Marie Curie",
    author: "Elena Farrow",
    category: "Biography",
    description: "The inspiring life story of Marie Curie, pioneering scientist and two-time Nobel laureate.",
    coverUrl: "https://placehold.co/200x260?text=Marie+Curie",
    bookUrl: "#"
  },
  {
    id: 8,
    title: "Space and Beyond",
    author: "Anita Rao",
    category: "Science",
    description: "An exploration of our solar system, the stars, and humanity's journey into space.",
    coverUrl: "https://placehold.co/200x260?text=Space",
    bookUrl: "#"
  }
];

// ===== Favorites (persisted in localStorage until backend + login exist) =====
// In later phases this will be replaced by the logged-in user's favorites
// stored in MongoDB, managed via POST/DELETE /api/favorites/:id.
const FAVORITES_KEY = "digitalLibraryFavorites";

function getFavoriteIds() {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (err) {
    return [];
  }
}

function isFavorite(bookId) {
  return getFavoriteIds().includes(bookId);
}

function toggleFavorite(bookId) {
  let ids = getFavoriteIds();
  if (ids.includes(bookId)) {
    ids = ids.filter((id) => id !== bookId);
  } else {
    ids.push(bookId);
  }
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
}

// ===== Render Featured Books on Home Page =====
function renderFeaturedBooks() {
  const container = document.getElementById("featured-books");
  if (!container) return;

  container.innerHTML = dummyBooks
    .map(
      (book) => `
      <div class="book-card">
        <img src="${book.coverUrl}" alt="${book.title}">
        <div class="book-info">
          <h3>${book.title}</h3>
          <p>${book.author}</p>
          <button
            class="fav-toggle-btn ${isFavorite(book.id) ? "active" : ""}"
            onclick="onFavToggleClick(${book.id}, this)"
          >
            ${isFavorite(book.id) ? "♥ Favorited" : "♡ Add to Favorites"}
          </button>
        </div>
      </div>
    `
    )
    .join("");
}

// ===== Render Favorites Page =====
function renderFavoritesPage() {
  const container = document.getElementById("favorites-list");
  const emptyState = document.getElementById("favorites-empty");
  if (!container) return;

  const favoriteBooks = dummyBooks.filter((book) => isFavorite(book.id));

  if (favoriteBooks.length === 0) {
    container.innerHTML = "";
    if (emptyState) emptyState.style.display = "block";
    return;
  }

  if (emptyState) emptyState.style.display = "none";

  container.innerHTML = favoriteBooks
    .map(
      (book) => `
      <div class="book-card">
        <img src="${book.coverUrl}" alt="${book.title}">
        <div class="book-info">
          <h3>${book.title}</h3>
          <p>${book.author} • ${book.category}</p>
          <button class="fav-toggle-btn active" onclick="onFavToggleClick(${book.id}, this, true)">
            ♥ Remove from Favorites
          </button>
        </div>
      </div>
    `
    )
    .join("");
}

// ===== Shared Favorite Button Click Handler =====
function onFavToggleClick(bookId, buttonEl, isFavoritesPage) {
  toggleFavorite(bookId);

  if (isFavoritesPage) {
    // Removing from the Favorites page should re-render the whole list
    renderFavoritesPage();
    return;
  }

  const nowFavorited = isFavorite(bookId);
  buttonEl.classList.toggle("active", nowFavorited);
  buttonEl.textContent = nowFavorited ? "♥ Favorited" : "♡ Add to Favorites";
}

// ===== Simple Search Redirect (Home page search bar) =====
function handleHomeSearch(event) {
  event.preventDefault();
  const query = document.getElementById("home-search-input").value.trim();
  // Later this will navigate to /books?search=... once routing/backend exists
  alert("Search feature will be connected in Phase 5. You searched for: " + query);
}

// ===== Login Form Validation (front-end only for now) =====
function handleLoginSubmit(event) {
  event.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();
  let valid = true;

  if (!email) {
    showError("login-email-error", "Email is required.");
    valid = false;
  } else {
    hideError("login-email-error");
  }

  if (!password) {
    showError("login-password-error", "Password is required.");
    valid = false;
  } else {
    hideError("login-password-error");
  }

  if (valid) {
    // Backend connection (POST /api/login) will be added in Phase 4
    alert("Login form is valid. Backend connection will be added in Phase 4.");
  }
}

// ===== Register Form Validation (front-end only for now) =====
function handleRegisterSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("register-name").value.trim();
  const email = document.getElementById("register-email").value.trim();
  const password = document.getElementById("register-password").value.trim();
  const confirmPassword = document
    .getElementById("register-confirm-password")
    .value.trim();
  let valid = true;

  if (!name) {
    showError("register-name-error", "Name is required.");
    valid = false;
  } else {
    hideError("register-name-error");
  }

  if (!email) {
    showError("register-email-error", "Email is required.");
    valid = false;
  } else {
    hideError("register-email-error");
  }

  if (!password || password.length < 6) {
    showError("register-password-error", "Password must be at least 6 characters.");
    valid = false;
  } else {
    hideError("register-password-error");
  }

  if (confirmPassword !== password) {
    showError("register-confirm-password-error", "Passwords do not match.");
    valid = false;
  } else {
    hideError("register-confirm-password-error");
  }

  if (valid) {
    // Backend connection (POST /api/register) will be added in Phase 4
    alert("Registration form is valid. Backend connection will be added in Phase 4.");
  }
}

// ===== Contact Form Validation (front-end only for now) =====
function handleContactSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("contact-name").value.trim();
  const email = document.getElementById("contact-email").value.trim();
  const message = document.getElementById("contact-message").value.trim();
  let valid = true;

  if (!name) {
    showError("contact-name-error", "Name is required.");
    valid = false;
  } else {
    hideError("contact-name-error");
  }

  if (!email) {
    showError("contact-email-error", "Email is required.");
    valid = false;
  } else {
    hideError("contact-email-error");
  }

  if (!message) {
    showError("contact-message-error", "Please write a short message.");
    valid = false;
  } else {
    hideError("contact-message-error");
  }

  if (valid) {
    // Sending this to the backend is optional and not part of the core mini
    // project scope, but could be added later as a simple POST /api/contact route.
    alert("Thanks for reaching out! (This form isn't connected to a backend yet.)");
    document.getElementById("contact-form").reset();
  }
}

function showError(id, message) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = message;
    el.style.display = "block";
  }
}

function hideError(id) {
  const el = document.getElementById(id);
  if (el) {
    el.style.display = "none";
  }
}

// ===== Run on page load =====
document.addEventListener("DOMContentLoaded", () => {
  renderFeaturedBooks();
  renderFavoritesPage();
});
