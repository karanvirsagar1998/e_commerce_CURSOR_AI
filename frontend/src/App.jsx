import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import ProductCard from './components/ProductCard'
import Header from './components/Header'
import About from './components/About'
import Cart from './components/Cart'
import ProductSort from './components/ProductSort'
import ProductDetail from './components/ProductDetail'
import EnhancedFilters from './components/EnhancedFilters'
import Checkout from './components/Checkout'

const API_URL = 'http://localhost:8080/api/products'

function App() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showAbout, setShowAbout] = useState(false)
  const [cart, setCart] = useState([]) // Array of cart items { product, quantity }
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [sortBy, setSortBy] = useState('default')
  const [searchQuery, setSearchQuery] = useState('')
  const [wishlist, setWishlist] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [showWishlist, setShowWishlist] = useState(false)
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    sizes: [],
    colors: []
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  // Filter products by category and search
  const categoryFilteredProducts = useMemo(() => {
    let filtered = products
    
    // Filter by category
    if (selectedCategory !== 'ALL') {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      )
    }
    
    return filtered
  }, [selectedCategory, products, searchQuery])
  
  // Apply additional filters (price range, size, color, subcategory)
  const filteredByAdditionalFilters = useMemo(() => {
    let filtered = [...categoryFilteredProducts]
    
    // Price range filter
    if (filters.minPrice) {
      filtered = filtered.filter(p => parseFloat(p.price) >= parseFloat(filters.minPrice))
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(p => parseFloat(p.price) <= parseFloat(filters.maxPrice))
    }
    
    // Size filter
    if (filters.sizes.length > 0) {
      filtered = filtered.filter(p => filters.sizes.includes(p.size))
    }
    
    // Color filter
    if (filters.colors.length > 0) {
      filtered = filtered.filter(p => filters.colors.includes(p.color))
    }
    
    return filtered
  }, [categoryFilteredProducts, filters, selectedCategory])

  // Sort products based on selected sort option
  const sortedProducts = useMemo(() => {
    const productsToSort = [...filteredByAdditionalFilters]
    
    switch (sortBy) {
      case 'price-low':
        return productsToSort.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
      case 'price-high':
        return productsToSort.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
      default:
        return productsToSort
    }
  }, [filteredByAdditionalFilters, sortBy])
  
  // Reset sort when category changes
  useEffect(() => {
    setSortBy('default')
  }, [selectedCategory])
  
  // Load cart and wishlist from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    const savedWishlist = localStorage.getItem('wishlist')
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (e) {
        console.error('Error loading cart from localStorage', e)
      }
    }
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist))
      } catch (e) {
        console.error('Error loading wishlist from localStorage', e)
      }
    }
  }, [])
  
  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])
  
  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  }, [wishlist])
  
  const handleSearch = (query) => {
    setSearchQuery(query)
  }
  
  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(p => p.id === product.id)
      if (exists) {
        return prev.filter(p => p.id !== product.id)
      } else {
        return [...prev, product]
      }
    })
  }
  
  const isInWishlist = (productId) => {
    return wishlist.some(p => p.id === productId)
  }
  
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => {
      if (filterType === 'sizes' || filterType === 'colors') {
        const current = prev[filterType]
        const index = current.indexOf(value)
        if (index > -1) {
          return { ...prev, [filterType]: current.filter(item => item !== value) }
        } else {
          return { ...prev, [filterType]: [...current, value] }
        }
      } else {
        return { ...prev, [filterType]: value }
      }
    })
  }

  const clearFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      sizes: [],
      colors: []
    })
  }

  useEffect(() => {
    setFilteredProducts(sortedProducts)
  }, [sortedProducts])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await axios.get(API_URL)
      setProducts(response.data)
      setFilteredProducts(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to load products. Please make sure the backend is running.')
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleShowAbout = () => {
    setShowAbout(true)
    setSelectedCategory('ALL') // Reset category when going to About
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToHome = () => {
    setShowAbout(false)
    setSelectedCategory('ALL')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCategoryChange = (category) => {
    if (category !== 'ABOUT') {
      setShowAbout(false)
      setShowWishlist(false)
      setSelectedCategory(category)
    }
  }
  
  const openCheckout = () => {
    setIsCheckoutOpen(true)
    setIsCartOpen(false)
  }
  
  const closeCheckout = () => {
    setIsCheckoutOpen(false)
  }
  
  const handleOrderComplete = (orderData) => {
    alert(`Order placed successfully! Order Number: ${orderData.orderNumber}`)
    setCart([])
    localStorage.removeItem('cart')
  }

  const handleSortChange = (sortValue) => {
    setSortBy(sortValue)
  }

  const addToCart = (product) => {
    if (product.stock === 0) return
    
    setCart(prevCart => {
      // Check if product already exists in cart
      const existingItem = prevCart.find(item => item.product.id === product.id)
      
      if (existingItem) {
        // If exists, increment quantity (but don't exceed stock)
        if (existingItem.quantity < product.stock) {
          return prevCart.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
        return prevCart // Don't add if quantity would exceed stock
      } else {
        // If new, add to cart with quantity 1
        return [...prevCart, { product, quantity: 1 }]
      }
    })
    // Open cart when item is added
    setIsCartOpen(false)
  }

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
      return
    }
    
    setCart(prevCart =>
      prevCart.map(item => {
        if (item.product.id === productId) {
          // Don't allow quantity to exceed stock
          const maxQuantity = Math.min(newQuantity, item.product.stock)
          return { ...item, quantity: maxQuantity }
        }
        return item
      })
    )
  }

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId))
  }

  const openCart = () => {
    setIsCartOpen(true)
  }

  const closeCart = () => {
    setIsCartOpen(false)
  }

  // Calculate total items in cart
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 -z-10">
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated gradient orbs */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>
      
      <div className="relative z-10">
      <Header 
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        onShowAbout={handleShowAbout}
        showAbout={showAbout}
        cartItemCount={cartItemCount}
        onCartClick={openCart}
        searchQuery={searchQuery}
        onSearch={handleSearch}
        wishlistCount={wishlist.length}
        onWishlistClick={() => setShowWishlist(true)}
      />
      {showAbout ? (
        <About onBackToHome={handleBackToHome} />
      ) : showWishlist ? (
        <WishlistPage 
          wishlist={wishlist}
          onBack={() => setShowWishlist(false)}
          onAddToCart={addToCart}
          onRemoveFromWishlist={toggleWishlist}
          onViewDetails={(product) => setSelectedProduct(product)}
        />
      ) : (
        <div className="container mx-auto px-4 py-8">
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedCategory === 'ALL' 
                      ? 'All Products' 
                      : selectedCategory === 'KIDS'
                      ? 'Kids Products'
                      : `${selectedCategory} Clothing`}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'} found
                  </p>
                </div>
                <ProductSort sortBy={sortBy} onSortChange={handleSortChange} />
              </div>
              
              <EnhancedFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
                products={categoryFilteredProducts}
              />

              {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-500 text-lg">No products found in this category.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onAddToCart={addToCart}
                      onViewDetails={(product) => setSelectedProduct(product)}
                      onToggleWishlist={toggleWishlist}
                      isInWishlist={isInWishlist(product.id)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
      
      {/* Cart Sidebar */}
      <Cart
        cart={cart}
        isOpen={isCartOpen}
        onClose={closeCart}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={openCheckout}
      />
      
      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
          onToggleWishlist={toggleWishlist}
          isInWishlist={isInWishlist(selectedProduct.id)}
        />
      )}
      
      {/* Checkout Modal */}
      <Checkout
        cart={cart}
        isOpen={isCheckoutOpen}
        onClose={closeCheckout}
        onOrderComplete={handleOrderComplete}
      />
      </div>
    </div>
  )
}

// Wishlist Page Component
function WishlistPage({ wishlist, onBack, onAddToCart, onRemoveFromWishlist, onViewDetails }) {
  const getFirstImage = (product) => {
    if (product.imageUrls) {
      const urls = product.imageUrls.split(',').map(url => url.trim()).filter(url => url)
      return urls[0] || ''
    }
    return product.imageUrl || ''
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>
          <p className="text-gray-600 mt-1">{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}</p>
        </div>
        <button
          onClick={onBack}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Back to Shopping
        </button>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20">
          <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <p className="text-gray-500 text-lg mb-2">Your wishlist is empty</p>
          <p className="text-gray-400 text-sm">Add items to your wishlist to save them for later!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative" style={{ height: '300px' }}>
                <img
                  src={getFirstImage(product)}
                  alt={product.name}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => onViewDetails(product)}
                />
                <button
                  onClick={() => onRemoveFromWishlist(product)}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">{product.name}</h3>
                <p className="text-2xl font-bold text-primary-600 mb-4">${parseFloat(product.price).toFixed(2)}</p>
                <button
                  onClick={() => onAddToCart(product)}
                  disabled={product.stock === 0}
                  className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 disabled:bg-gray-300"
                >
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App

