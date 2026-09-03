// ===== Dummy Book Data (temporary, until backend is connected in Phase 7) =====
const dummyBooks = [
  {
    id: 1,
    title: "Python Programming",
    author: "John Smith",
    category: "Programming",
    coverUrl: "https://placehold.co/200x260?text=Python"
  },
  {
    id: 2,
    title: "The Silent Ocean",
    author: "Maria Lane",
    category: "Fiction",
    coverUrl: "https://placehold.co/200x260?text=Silent+Ocean"
  },
  {
    id: 3,
    title: "World History Basics",
    author: "David Cole",
    category: "History",
    coverUrl: "https://placehold.co/200x260?text=History"
  },
  {
    id: 4,
    title: "Modern Physics",
    author: "Anita Rao",
    category: "Science",
    coverUrl: "https://placehold.co/200x260?text=Physics"
  }
];

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
        </div>
      </div>
    `
    )
    .join("");
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
});
