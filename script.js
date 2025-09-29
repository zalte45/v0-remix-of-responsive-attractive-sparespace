// Import lucide icons library
import lucide from "lucide"

// Mock data for storage listings
const mockListings = [
  {
    id: 1,
    title: "Spacious Garage in Baner",
    type: "Garage",
    size: 200,
    price: 2500,
    description: "Clean, secure garage with easy access. Perfect for furniture storage.",
    image: "/placeholder.svg?height=192&width=300&text=Garage+Storage",
    location: "Baner, Pune",
  },
  {
    id: 2,
    title: "Dry Basement Room",
    type: "Room",
    size: 150,
    price: 1800,
    description: "Climate-controlled basement room ideal for documents and electronics.",
    image: "/placeholder.svg?height=192&width=300&text=Basement+Room",
    location: "Koregaon Park, Pune",
  },
  {
    id: 3,
    title: "Garden Shed Storage",
    type: "Shed",
    size: 80,
    price: 1200,
    description: "Small but secure shed perfect for seasonal items and tools.",
    image: "/placeholder.svg?height=192&width=300&text=Garden+Shed",
    location: "Viman Nagar, Pune",
  },
  {
    id: 4,
    title: "Attic Space Available",
    type: "Attic",
    size: 120,
    price: 1500,
    description: "Accessible attic space with proper flooring and lighting.",
    image: "/placeholder.svg?height=192&width=300&text=Attic+Space",
    location: "Hadapsar, Pune",
  },
  {
    id: 5,
    title: "Covered Parking Spot",
    type: "Parking",
    size: 180,
    price: 3000,
    description: "Secure covered parking space with 24/7 access. Perfect for cars or motorcycles.",
    image: "/placeholder.svg?height=192&width=300&text=Parking+Space",
    location: "Kothrud, Pune",
  },
]

// Application state
let currentView = "home"
let favorites = JSON.parse(localStorage.getItem("sparespace-favorites") || "[]")
let filteredListings = [...mockListings]
let isLoggedIn = false
let currentUser = null
let isSignUpMode = false

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons()
  updateFavoritesCount()
  setupEventListeners()
  showLoginPage()
})

// Event listeners setup
function setupEventListeners() {
  // Navigation
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const view = this.getAttribute("data-view")
      if (view) {
        showView(view)
      }
    })
  })

  // Hero buttons
  document.querySelectorAll("[data-view]").forEach((btn) => {
    btn.addEventListener("click", function () {
      const view = this.getAttribute("data-view")
      if (view) {
        showView(view)
      }
    })
  })

  // Auth forms
  document.getElementById("signin-form").addEventListener("submit", handleSignIn)
  document.getElementById("signup-form").addEventListener("submit", handleSignUp)
  document.getElementById("toggle-auth").addEventListener("click", toggleAuthMode)

  // Listing form
  document.getElementById("listing-form").addEventListener("submit", handleListingSubmit)

  // Filters
  document.getElementById("apply-filters").addEventListener("click", applyFilters)

  // Booking modal
  document.getElementById("booking-form").addEventListener("submit", handleBookingSubmit)
  document.querySelector(".modal-close").addEventListener("click", closeModal)
  document.getElementById("booking-modal").addEventListener("click", function (e) {
    if (e.target === this) {
      closeModal()
    }
  })

  // Auth button
  document.getElementById("auth-btn").addEventListener("click", () => {
    if (isLoggedIn) {
      handleLogout()
    } else {
      showView("login")
    }
  })
}

// View management
function showView(view) {
  currentView = view

  // Hide all pages
  document.querySelectorAll(".page-container").forEach((page) => {
    page.style.display = "none"
  })

  // Update navigation
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.classList.remove("active")
    if (btn.getAttribute("data-view") === view) {
      btn.classList.add("active")
    }
  })

  // Show selected page
  switch (view) {
    case "home":
      document.getElementById("home-page").style.display = "block"
      break
    case "browse":
      document.getElementById("browse-page").style.display = "block"
      renderListings()
      break
    case "list":
      document.getElementById("list-page").style.display = "block"
      break
    case "favorites":
      document.getElementById("favorites-page").style.display = "block"
      renderFavorites()
      break
    case "login":
      showLoginPage()
      break
  }
}

function showLoginPage() {
  document.querySelectorAll(".page-container").forEach((page) => {
    page.style.display = "none"
  })
  document.getElementById("login-page").style.display = "block"
}

// Authentication
function handleSignIn(e) {
  e.preventDefault()
  const email = document.getElementById("signin-email").value
  const password = document.getElementById("signin-password").value

  // Simulate login
  isLoggedIn = true
  currentUser = { name: "John Doe", email: email }
  updateAuthUI()
  showView("home")
  alert("Login successful! (This is a demo)")
}

function handleSignUp(e) {
  e.preventDefault()
  const name = document.getElementById("signup-name").value
  const email = document.getElementById("signup-email").value
  const password = document.getElementById("signup-password").value
  const confirmPassword = document.getElementById("confirm-password").value

  if (password !== confirmPassword) {
    alert("Passwords don't match!")
    return
  }

  // Simulate signup
  isLoggedIn = true
  currentUser = { name: name, email: email }
  updateAuthUI()
  showView("home")
  alert("Account created successfully! (This is a demo)")
}

function handleLogout() {
  isLoggedIn = false
  currentUser = null
  updateAuthUI()
  showLoginPage()
}

function toggleAuthMode() {
  isSignUpMode = !isSignUpMode
  const signinForm = document.getElementById("signin-form")
  const signupForm = document.getElementById("signup-form")
  const title = document.getElementById("login-title")
  const description = document.getElementById("login-description")
  const toggleBtn = document.getElementById("toggle-auth")

  if (isSignUpMode) {
    signinForm.style.display = "none"
    signupForm.style.display = "block"
    title.textContent = "Create Account"
    description.textContent = "Join SpareSpace to start renting or listing storage spaces"
    toggleBtn.textContent = "Already have an account? Sign in"
  } else {
    signinForm.style.display = "block"
    signupForm.style.display = "none"
    title.textContent = "Welcome Back"
    description.textContent = "Sign in to your SpareSpace account"
    toggleBtn.textContent = "Don't have an account? Sign up"
  }
}

function updateAuthUI() {
  const authBtn = document.getElementById("auth-btn")
  const welcomeText = document.querySelector(".welcome-text")
  const userName = document.getElementById("user-name")

  if (isLoggedIn) {
    authBtn.innerHTML = "Logout"
    authBtn.setAttribute("data-view", "")
    welcomeText.style.display = "block"
    userName.textContent = currentUser.name
  } else {
    authBtn.innerHTML = '<i data-lucide="user" class="btn-icon"></i>Login'
    authBtn.setAttribute("data-view", "login")
    welcomeText.style.display = "none"
  }

  lucide.createIcons()
}

// Listings management
function renderListings() {
  const grid = document.getElementById("listings-grid")
  grid.innerHTML = ""

  filteredListings.forEach((listing) => {
    const card = createListingCard(listing)
    grid.appendChild(card)
  })
}

function createListingCard(listing) {
  const card = document.createElement("div")
  card.className = "listing-card"

  const isFavorite = favorites.includes(listing.id)
  const typeIcon = getTypeIcon(listing.type)

  card.innerHTML = `
        <div class="listing-image-container">
            <img src="${listing.image}" alt="${listing.title}" class="listing-image" onerror="this.src='/placeholder.svg?height=192&width=300&text=Storage+Space'">
            <button class="favorite-btn ${isFavorite ? "active" : ""}" onclick="toggleFavorite(${listing.id})">
                <i data-lucide="heart" ${isFavorite ? 'fill="currentColor"' : ""}></i>
            </button>
        </div>
        <div class="listing-content">
            <div class="listing-header">
                <h3 class="listing-title">${listing.title}</h3>
                <div class="listing-badge">
                    <i data-lucide="${typeIcon}"></i>
                    ${listing.type}
                </div>
            </div>
            <div class="listing-location">
                <i data-lucide="map-pin"></i>
                ${listing.location}
            </div>
            <p class="listing-description">${listing.description}</p>
            <div class="listing-details">
                <span class="listing-size">${listing.size} sq ft</span>
                <span class="listing-price">₹${listing.price}/month</span>
            </div>
            <div class="listing-actions">
                <button class="btn btn-primary" onclick="openBookingModal(${listing.id})">Book Now</button>
            </div>
        </div>
    `

  lucide.createIcons()
  return card
}

function getTypeIcon(type) {
  switch (type.toLowerCase()) {
    case "garage":
      return "warehouse"
    case "room":
      return "home"
    case "shed":
      return "building"
    case "attic":
      return "package"
    case "parking":
      return "car"
    default:
      return "package"
  }
}

// Favorites management
function toggleFavorite(listingId) {
  if (favorites.includes(listingId)) {
    favorites = favorites.filter((id) => id !== listingId)
  } else {
    favorites.push(listingId)
  }

  localStorage.setItem("sparespace-favorites", JSON.stringify(favorites))
  updateFavoritesCount()

  // Update UI if on browse or favorites page
  if (currentView === "browse") {
    renderListings()
  } else if (currentView === "favorites") {
    renderFavorites()
  }
}

function updateFavoritesCount() {
  document.getElementById("favorites-count").textContent = favorites.length
}

function renderFavorites() {
  const content = document.getElementById("favorites-content")
  const favoriteListings = mockListings.filter((listing) => favorites.includes(listing.id))

  if (favoriteListings.length === 0) {
    content.innerHTML = `
            <div class="empty-state">
                <i data-lucide="heart" class="empty-icon"></i>
                <h3>No favorites yet</h3>
                <p>Start browsing storage spaces and add them to your favorites!</p>
                <button class="btn btn-primary" onclick="showView('browse')">Browse Storage</button>
            </div>
        `
  } else {
    const grid = document.createElement("div")
    grid.className = "listings-grid"

    favoriteListings.forEach((listing) => {
      const card = createFavoriteCard(listing)
      grid.appendChild(card)
    })

    content.innerHTML = ""
    content.appendChild(grid)
  }

  lucide.createIcons()
}

function createFavoriteCard(listing) {
  const card = document.createElement("div")
  card.className = "listing-card"

  const typeIcon = getTypeIcon(listing.type)

  card.innerHTML = `
        <div class="listing-image-container">
            <img src="${listing.image}" alt="${listing.title}" class="listing-image" onerror="this.src='/placeholder.svg?height=192&width=300&text=Storage+Space'">
            <button class="favorite-btn active" onclick="toggleFavorite(${listing.id})">
                <i data-lucide="heart" fill="currentColor"></i>
            </button>
        </div>
        <div class="listing-content">
            <div class="listing-header">
                <h3 class="listing-title">${listing.title}</h3>
                <div class="listing-badge">
                    <i data-lucide="${typeIcon}"></i>
                    ${listing.type}
                </div>
            </div>
            <div class="listing-location">
                <i data-lucide="map-pin"></i>
                ${listing.location}
            </div>
            <p class="listing-description">${listing.description}</p>
            <div class="listing-details">
                <span class="listing-size">${listing.size} sq ft</span>
                <span class="listing-price">₹${listing.price}/month</span>
            </div>
            <div class="listing-actions">
                <button class="btn btn-primary" onclick="openBookingModal(${listing.id})">Book Now</button>
                <button class="btn btn-outline" onclick="toggleFavorite(${listing.id})">Remove</button>
            </div>
        </div>
    `

  lucide.createIcons()
  return card
}

// Filters
function applyFilters() {
  const typeFilter = document.getElementById("type-filter").value
  const minPrice = document.getElementById("min-price").value
  const maxPrice = document.getElementById("max-price").value

  filteredListings = mockListings.filter((listing) => {
    if (typeFilter !== "all" && listing.type.toLowerCase() !== typeFilter) {
      return false
    }

    if (minPrice && listing.price < Number.parseInt(minPrice)) {
      return false
    }

    if (maxPrice && listing.price > Number.parseInt(maxPrice)) {
      return false
    }

    return true
  })

  renderListings()
}

// Listing form
function handleListingSubmit(e) {
  e.preventDefault()

  const formData = {
    title: document.getElementById("listing-title").value,
    type: document.getElementById("listing-type").value,
    size: document.getElementById("listing-size").value,
    price: document.getElementById("listing-price").value,
    description: document.getElementById("listing-description").value,
    image: document.getElementById("listing-image").value,
  }

  alert("Your space has been listed! (This is a demo)")

  // Reset form
  document.getElementById("listing-form").reset()
}

// Booking modal
function openBookingModal(listingId) {
  const listing = mockListings.find((l) => l.id === listingId)
  if (!listing) return

  document.getElementById("booking-title").textContent = `Book ${listing.title}`
  document.getElementById("booking-price").textContent = `₹${listing.price}`

  const modal = document.getElementById("booking-modal")
  modal.classList.add("active")
  modal.dataset.listingId = listingId
}

function closeModal() {
  document.getElementById("booking-modal").classList.remove("active")
  document.getElementById("booking-form").reset()
}

function handleBookingSubmit(e) {
  e.preventDefault()
  alert("Booking confirmed! (This is a demo)")
  closeModal()
}

// Global functions for onclick handlers
window.toggleFavorite = toggleFavorite
window.openBookingModal = openBookingModal
window.closeModal = closeModal
window.showView = showView
