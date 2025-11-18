import { useState } from 'react'

function EnhancedFilters({ filters, onFilterChange, onClearFilters, products }) {
  const [isOpen, setIsOpen] = useState(false)
  
  // Get unique sizes and colors from products
  const availableSizes = [...new Set(products.map(p => p.size))].sort()
  const availableColors = [...new Set(products.map(p => p.color))].sort()
  const maxPrice = Math.max(...products.map(p => parseFloat(p.price)), 0)

  const hasActiveFilters = filters.minPrice || filters.maxPrice || filters.sizes.length > 0 || filters.colors.length > 0

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        <span>Filters</span>
        {hasActiveFilters && (
          <span className="bg-primary-600 text-white text-xs rounded-full px-2 py-0.5">
            {[filters.minPrice && 1, filters.maxPrice && 1, filters.sizes.length, filters.colors.length].filter(Boolean).reduce((a, b) => a + b, 0)}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <div className="space-y-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => onFilterChange('minPrice', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => onFilterChange('maxPrice', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* Sizes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sizes</label>
              <div className="flex flex-wrap gap-2">
                {availableSizes.map(size => (
                  <button
                    key={size}
                    onClick={() => onFilterChange('sizes', size)}
                    className={`px-3 py-1 border rounded-lg text-sm transition-colors ${
                      filters.sizes.includes(size)
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white border-gray-300 hover:border-primary-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Colors</label>
              <div className="flex flex-wrap gap-2">
                {availableColors.map(color => (
                  <button
                    key={color}
                    onClick={() => onFilterChange('colors', color)}
                    className={`px-3 py-1 border rounded-lg text-sm transition-colors flex items-center space-x-2 ${
                      filters.colors.includes(color)
                        ? 'bg-primary-50 border-primary-600'
                        : 'bg-white border-gray-300 hover:border-primary-400'
                    }`}
                  >
                    <div
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: color.toLowerCase() }}
                    />
                    <span>{color}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="mt-4 text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default EnhancedFilters

