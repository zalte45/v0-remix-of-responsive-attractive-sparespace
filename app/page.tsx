"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MapPin, Package, Home, Warehouse, Building, User } from "lucide-react"

// Mock data for storage listings
const mockListings = [
  {
    id: 1,
    title: "Spacious Garage in Baner",
    type: "Garage",
    size: 200,
    price: 2500,
    description: "Clean, secure garage with easy access. Perfect for furniture storage.",
    image: "/clean-garage-storage.png",
    location: "Baner, Pune",
  },
  {
    id: 2,
    title: "Dry Basement Room",
    type: "Room",
    size: 150,
    price: 1800,
    description: "Climate-controlled basement room ideal for documents and electronics.",
    image: "/basement-storage.png",
    location: "Koregaon Park, Pune",
  },
  {
    id: 3,
    title: "Garden Shed Storage",
    type: "Shed",
    size: 80,
    price: 1200,
    description: "Small but secure shed perfect for seasonal items and tools.",
    image: "/garden-shed-storage.png",
    location: "Viman Nagar, Pune",
  },
  {
    id: 4,
    title: "Attic Space Available",
    type: "Attic",
    size: 120,
    price: 1500,
    description: "Accessible attic space with proper flooring and lighting.",
    image: "/attic-storage.png",
    location: "Hadapsar, Pune",
  },
  {
    id: 5,
    title: "Covered Parking Spot",
    type: "Parking",
    size: 100,
    price: 1000,
    description: "Secure covered parking space with 24/7 access. Perfect for cars or bikes.",
    image: "/parking-space.png",
    location: "Kothrud, Pune",
  },
]

export default function SpareSpace() {
  const [currentView, setCurrentView] = useState("home")
  const [favorites, setFavorites] = useState<number[]>([])
  const [filteredListings, setFilteredListings] = useState(mockListings)
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })
  const [typeFilter, setTypeFilter] = useState("all")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  useEffect(() => {
    const savedFavorites = localStorage.getItem("sparespace-favorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  const toggleFavorite = (listingId: number) => {
    const newFavorites = favorites.includes(listingId)
      ? favorites.filter((id) => id !== listingId)
      : [...favorites, listingId]

    setFavorites(newFavorites)
    localStorage.setItem("sparespace-favorites", JSON.stringify(newFavorites))
  }

  const applyFilters = () => {
    let filtered = mockListings

    if (typeFilter !== "all") {
      filtered = filtered.filter((listing) => listing.type.toLowerCase() === typeFilter)
    }

    if (priceRange.min) {
      filtered = filtered.filter((listing) => listing.price >= Number.parseInt(priceRange.min))
    }

    if (priceRange.max) {
      filtered = filtered.filter((listing) => listing.price <= Number.parseInt(priceRange.max))
    }

    setFilteredListings(filtered)
  }

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "garage":
        return <Warehouse className="h-4 w-4" />
      case "room":
        return <Home className="h-4 w-4" />
      case "shed":
        return <Building className="h-4 w-4" />
      case "attic":
        return <Package className="h-4 w-4" />
      case "parking":
        return <Package className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const Navigation = () => (
    <nav className="bg-primary text-primary-foreground shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Package className="h-8 w-8 mr-2" />
            <span className="text-xl font-bold">SpareSpace</span>
          </div>
          <div className="flex space-x-4">
            <Button
              variant={currentView === "home" ? "secondary" : "ghost"}
              onClick={() => setCurrentView("home")}
              className="text-primary-foreground hover:text-primary-foreground"
            >
              Home
            </Button>
            <Button
              variant={currentView === "browse" ? "secondary" : "ghost"}
              onClick={() => setCurrentView("browse")}
              className="text-primary-foreground hover:text-primary-foreground"
            >
              Browse Storage
            </Button>
            <Button
              variant={currentView === "list" ? "secondary" : "ghost"}
              onClick={() => setCurrentView("list")}
              className="text-primary-foreground hover:text-primary-foreground"
            >
              List Your Space
            </Button>
            <Button
              variant={currentView === "favorites" ? "secondary" : "ghost"}
              onClick={() => setCurrentView("favorites")}
              className="text-primary-foreground hover:text-primary-foreground"
            >
              Favorites ({favorites.length})
            </Button>
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm">Welcome, {user?.name}</span>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsLoggedIn(false)
                    setUser(null)
                  }}
                  className="text-primary-foreground hover:text-primary-foreground"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                variant={currentView === "login" ? "secondary" : "ghost"}
                onClick={() => setCurrentView("login")}
                className="text-primary-foreground hover:text-primary-foreground"
              >
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )

  const HomePage = () => (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-foreground mb-6">SpareSpace</h1>
        <p className="text-xl text-muted-foreground mb-12">Neighborhood Storage Sharing</p>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          Rent or offer spare storage space in your neighborhood. Connect with trusted neighbors for secure, affordable
          storage solutions.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button size="lg" onClick={() => setCurrentView("browse")} className="w-full sm:w-auto px-8 py-4 text-lg">
            Browse Storage
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => setCurrentView("list")}
            className="w-full sm:w-auto px-8 py-4 text-lg"
          >
            List Your Space
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <Warehouse className="h-12 w-12 mx-auto text-primary mb-4" />
              <CardTitle>Secure Storage</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Find verified storage spaces in your neighborhood with trusted hosts.</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <MapPin className="h-12 w-12 mx-auto text-primary mb-4" />
              <CardTitle>Local & Convenient</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Access your stored items easily with nearby locations and flexible access.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Heart className="h-12 w-12 mx-auto text-primary mb-4" />
              <CardTitle>Community Driven</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Support your neighbors while finding affordable storage solutions.</CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const BrowseStorage = () => (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Browse Storage Spaces</h1>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Filter Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="type-filter">Type</Label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="garage">Garage</SelectItem>
                    <SelectItem value="room">Room</SelectItem>
                    <SelectItem value="shed">Shed</SelectItem>
                    <SelectItem value="attic">Attic</SelectItem>
                    <SelectItem value="parking">Parking</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="min-price">Min Price (₹)</Label>
                <Input
                  id="min-price"
                  type="number"
                  placeholder="0"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="max-price">Max Price (₹)</Label>
                <Input
                  id="max-price"
                  type="number"
                  placeholder="10000"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={applyFilters} className="w-full">
                  Apply Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <Card key={listing.id} className="hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={listing.image || "/placeholder.svg"}
                  alt={listing.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={() => toggleFavorite(listing.id)}
                >
                  <Heart
                    className={`h-4 w-4 ${favorites.includes(listing.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                  />
                </Button>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{listing.title}</CardTitle>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {getTypeIcon(listing.type)}
                    {listing.type}
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {listing.location}
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{listing.description}</CardDescription>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-muted-foreground">{listing.size} sq ft</span>
                  <span className="text-lg font-bold text-primary">₹{listing.price}/month</span>
                </div>
                <BookingModal listing={listing} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  const BookingModal = ({ listing }: { listing: (typeof mockListings)[0] }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Book Now</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book {listing.title}</DialogTitle>
          <DialogDescription>Complete your booking for this storage space.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start-date">Start Date</Label>
              <Input id="start-date" type="date" />
            </div>
            <div>
              <Label htmlFor="end-date">End Date</Label>
              <Input id="end-date" type="date" />
            </div>
          </div>
          <div>
            <Label htmlFor="notes">Special Notes</Label>
            <Textarea id="notes" placeholder="Any special requirements or notes..." />
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span>Monthly Rate:</span>
              <span className="font-bold">₹{listing.price}</span>
            </div>
          </div>
          <Button className="w-full" onClick={() => alert("Booking confirmed! (This is a demo)")}>
            Confirm Booking
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )

  const ListYourSpace = () => {
    const [formData, setFormData] = useState({
      title: "",
      description: "",
      type: "",
      size: "",
      price: "",
      image: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      alert("Your space has been listed! (This is a demo)")
      setFormData({
        title: "",
        description: "",
        type: "",
        size: "",
        price: "",
        image: "",
      })
    }

    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-foreground mb-8">List Your Storage Space</h1>

          <Card>
            <CardHeader>
              <CardTitle>Space Details</CardTitle>
              <CardDescription>Provide information about your storage space to attract renters.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Spacious Garage in Baner"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select storage type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="garage">Garage</SelectItem>
                      <SelectItem value="room">Room</SelectItem>
                      <SelectItem value="shed">Shed</SelectItem>
                      <SelectItem value="attic">Attic</SelectItem>
                      <SelectItem value="parking">Parking</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="size">Size (sq ft)</Label>
                    <Input
                      id="size"
                      type="number"
                      placeholder="150"
                      value={formData.size}
                      onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price per month (₹)</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="2000"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your storage space, its condition, access details, etc."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="image">Image URL (optional)</Label>
                  <Input
                    id="image"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                </div>

                <Button type="submit" className="w-full">
                  List Your Space
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const FavoritesPage = () => {
    const favoriteListings = mockListings.filter((listing) => favorites.includes(listing.id))

    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-foreground mb-8">Your Favorites</h1>

          {favoriteListings.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <CardTitle className="mb-2">No favorites yet</CardTitle>
                <CardDescription className="mb-4">
                  Start browsing storage spaces and add them to your favorites!
                </CardDescription>
                <Button onClick={() => setCurrentView("browse")}>Browse Storage</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteListings.map((listing) => (
                <Card key={listing.id} className="hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={listing.image || "/placeholder.svg"}
                      alt={listing.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                      onClick={() => toggleFavorite(listing.id)}
                    >
                      <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    </Button>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{listing.title}</CardTitle>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        {getTypeIcon(listing.type)}
                        {listing.type}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {listing.location}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">{listing.description}</CardDescription>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-muted-foreground">{listing.size} sq ft</span>
                      <span className="text-lg font-bold text-primary">₹{listing.price}/month</span>
                    </div>
                    <div className="flex gap-2">
                      <BookingModal listing={listing} />
                      <Button variant="outline" onClick={() => toggleFavorite(listing.id)} className="flex-shrink-0">
                        Remove
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  const LoginPage = () => {
    const [loginData, setLoginData] = useState({
      email: "",
      password: "",
    })
    const [isSignUp, setIsSignUp] = useState(false)
    const [signUpData, setSignUpData] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    })

    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault()
      setIsLoggedIn(true)
      setUser({ name: "John Doe", email: loginData.email })
      setCurrentView("home")
      alert("Login successful! (This is a demo)")
    }

    const handleSignUp = (e: React.FormEvent) => {
      e.preventDefault()
      if (signUpData.password !== signUpData.confirmPassword) {
        alert("Passwords don't match!")
        return
      }
      setIsLoggedIn(true)
      setUser({ name: signUpData.name, email: signUpData.email })
      setCurrentView("home")
      alert("Account created successfully! (This is a demo)")
    }

    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Package className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-2xl">{isSignUp ? "Create Account" : "Welcome Back"}</CardTitle>
              <CardDescription>
                {isSignUp
                  ? "Join SpareSpace to start renting or listing storage spaces"
                  : "Sign in to your SpareSpace account"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSignUp ? (
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div>
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={signUpData.name}
                      onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signUpData.email}
                      onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password"
                      value={signUpData.password}
                      onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      value={signUpData.confirmPassword}
                      onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Create Account
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                </form>
              )}

              <div className="mt-6 text-center">
                <Button variant="link" onClick={() => setIsSignUp(!isSignUp)} className="text-sm">
                  {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return <LoginPage />
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {currentView === "home" && <HomePage />}
      {currentView === "browse" && <BrowseStorage />}
      {currentView === "list" && <ListYourSpace />}
      {currentView === "favorites" && <FavoritesPage />}
      {currentView === "login" && <LoginPage />}
    </div>
  )
}
