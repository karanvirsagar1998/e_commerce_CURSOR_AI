import { useState, useEffect } from 'react'

function ProductCard({ product, onAddToCart, onViewDetails, onToggleWishlist, isInWishlist }) {
  const [isHovered, setIsHovered] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imageError, setImageError] = useState(false)
  
  // Parse imageUrls from comma-separated string or use imageUrl for backward compatibility
  const imageUrls = product.imageUrls 
    ? product.imageUrls.split(',').map(url => url.trim()).filter(url => url)
    : (product.imageUrl ? [product.imageUrl] : [])

  useEffect(() => {
    // Reset to first image when product changes
    setCurrentImageIndex(0)
    setImageError(false)
  }, [product.id])

  const handleImageError = () => {
    // Try next image if available
    if (currentImageIndex < imageUrls.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
    } else {
      setImageError(true)
    }
  }

  const nextImage = (e) => {
    e.stopPropagation()
    if (currentImageIndex < imageUrls.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
    } else {
      setCurrentImageIndex(0)
    }
  }

  const prevImage = (e) => {
    e.stopPropagation()
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1)
    } else {
      setCurrentImageIndex(imageUrls.length - 1)
    }
  }

  return (
    <div
      className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 group cursor-pointer border border-white/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        if (onViewDetails) {
          onViewDetails(product)
        }
      }}
    >
      <div className="relative overflow-hidden bg-gray-100" style={{ height: '300px' }}>
        {imageUrls.length > 0 && !imageError ? (
          <>
            <img
              key={currentImageIndex}
              src={imageUrls[currentImageIndex]}
              alt={`${product.name} - Image ${currentImageIndex + 1}`}
              className={`w-full h-full object-cover transition-all duration-500 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
              onError={handleImageError}
            />
            
            {/* Image Navigation Arrows - Show on hover if multiple images */}
            {imageUrls.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                  aria-label="Previous image"
                >
                  <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                  aria-label="Next image"
                >
                  <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                {/* Image Indicators */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                  {imageUrls.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation()
                        setCurrentImageIndex(index)
                      }}
                      className={`h-2 rounded-full transition-all duration-200 ${
                        index === currentImageIndex 
                          ? 'w-6 bg-white' 
                          : 'w-2 bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <div className="absolute top-2 right-2 flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              if (onToggleWishlist) {
                onToggleWishlist(product)
              }
            }}
            className={`p-2 rounded-full transition-all ${
              isInWishlist
                ? 'bg-red-500 text-white'
                : 'bg-white/90 text-gray-600 hover:bg-white'
            } shadow-md hover:scale-110`}
            aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <svg className="w-4 h-4" fill={isInWishlist ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  product.category === 'MEN'
                    ? 'bg-blue-100 text-blue-800'
                    : product.category === 'WOMEN'
                    ? 'bg-pink-100 text-pink-800'
                    : product.category === 'KIDS'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {product.category}
                </span>
        </div>
        {product.stock < 10 && product.stock > 0 && (
          <div className="absolute top-2 left-2">
            <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
              Low Stock
            </span>
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-600 text-white px-4 py-2 rounded font-semibold">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">Size:</span>
            <span className="text-sm font-medium text-gray-700">{product.size}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">Color:</span>
            <div 
              className="w-4 h-4 rounded-full border border-gray-300"
              style={{ backgroundColor: product.color.toLowerCase() }}
              title={product.color}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary-600">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation()
              if (product.stock > 0 && onAddToCart) {
                onAddToCart(product)
              }
            }}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              product.stock > 0
                ? 'bg-primary-600 text-white hover:bg-primary-700 transform hover:scale-105 active:scale-95'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Sold Out'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard

