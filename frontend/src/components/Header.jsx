import SearchBar from './SearchBar'

function Header({ selectedCategory, onCategoryChange, onShowAbout, showAbout, cartItemCount = 0, onCartClick, searchQuery, onSearch, wishlistCount = 0, onWishlistClick }) {
  const handleNavClick = (category) => {
    if (onCategoryChange) {
      onCategoryChange(category)
    }
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleAboutClick = () => {
    if (onShowAbout) {
      onShowAbout()
    }
  }

  const handleLogoClick = () => {
    if (showAbout) {
      // If on About page, go back to home by calling onCategoryChange
      // which will trigger App.jsx to hide About page
      if (onCategoryChange) {
        onCategoryChange('ALL')
      }
    } else {
      handleNavClick('ALL')
    }
  }

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-white/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <button 
              onClick={handleLogoClick}
              className="text-2xl font-bold text-gray-800 hover:text-primary-600 transition cursor-pointer"
            >
              StyleHub
            </button>
          </div>
          {!showAbout && (
            <SearchBar searchQuery={searchQuery} onSearch={onSearch} />
          )}
          <nav className="hidden md:flex space-x-6">
            {!showAbout && (
              <>
                <button 
                  onClick={() => handleNavClick('ALL')}
                  className={`text-gray-700 hover:text-primary-600 transition ${
                    selectedCategory === 'ALL' ? 'text-primary-600 font-semibold' : ''
                  }`}
                >
                  Home
                </button>
                <button 
                  onClick={() => handleNavClick('MEN')}
                  className={`text-gray-700 hover:text-primary-600 transition ${
                    selectedCategory === 'MEN' ? 'text-primary-600 font-semibold' : ''
                  }`}
                >
                  Men
                </button>
                <button 
                  onClick={() => handleNavClick('WOMEN')}
                  className={`text-gray-700 hover:text-primary-600 transition ${
                    selectedCategory === 'WOMEN' ? 'text-primary-600 font-semibold' : ''
                  }`}
                >
                  Women
                </button>
                <button 
                  onClick={() => handleNavClick('KIDS')}
                  className={`text-gray-700 hover:text-primary-600 transition ${
                    selectedCategory === 'KIDS' ? 'text-primary-600 font-semibold' : ''
                  }`}
                >
                  Kids
                </button>
              </>
            )}
            <button 
              onClick={handleAboutClick}
              className={`text-gray-700 hover:text-primary-600 transition ${
                showAbout ? 'text-primary-600 font-semibold' : ''
              }`}
            >
              About
            </button>
          </nav>
          <div className="flex items-center space-x-4">
            {!showAbout && (
              <button 
                onClick={onWishlistClick}
                className="relative hover:scale-110 transition-transform"
                aria-label="View wishlist"
              >
                <svg className="w-6 h-6 text-gray-700 hover:text-red-500 transition" fill={wishlistCount > 0 ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
                    {wishlistCount > 99 ? '99+' : wishlistCount}
                  </span>
                )}
              </button>
            )}
            <button 
              onClick={onCartClick}
              className="relative hover:scale-110 transition-transform"
              aria-label="Open shopping cart"
            >
              <svg className="w-6 h-6 text-gray-700 hover:text-primary-600 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 animate-pulse">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

