'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { useState } from 'react'

interface ProductFiltersProps {
  onSearchChange: (search: string) => void
  onColorFilter: (colors: string[]) => void
  onSizeFilter: (sizes: string[]) => void
  onPriceSort: (sort: 'asc' | 'desc' | 'none') => void
  availableColors: string[]
  availableSizes: string[]
  isDark?: boolean
}

export function ProductFilters({
  onSearchChange,
  onColorFilter,
  onSizeFilter,
  onPriceSort,
  availableColors,
  availableSizes,
  isDark = false
}: ProductFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [priceSort, setPriceSort] = useState<'asc' | 'desc' | 'none'>('none')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    onSearchChange(value)
  }

  const toggleColor = (color: string) => {
    const newColors = selectedColors.includes(color)
      ? selectedColors.filter(c => c !== color)
      : [...selectedColors, color]
    setSelectedColors(newColors)
    onColorFilter(newColors)
  }

  const toggleSize = (size: string) => {
    const newSizes = selectedSizes.includes(size)
      ? selectedSizes.filter(s => s !== size)
      : [...selectedSizes, size]
    setSelectedSizes(newSizes)
    onSizeFilter(newSizes)
  }

  const handlePriceSort = (sort: 'asc' | 'desc' | 'none') => {
    setPriceSort(sort)
    onPriceSort(sort)
  }

  const clearAllFilters = () => {
    setSearchQuery('')
    setSelectedColors([])
    setSelectedSizes([])
    setPriceSort('none')
    onSearchChange('')
    onColorFilter([])
    onSizeFilter([])
    onPriceSort('none')
  }

  const activeFiltersCount = selectedColors.length + selectedSizes.length + (priceSort !== 'none' ? 1 : 0)

  return (
    <div className="mb-12">
      {/* Search Bar */}
      <div className="relative mb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`relative overflow-hidden rounded-premium shadow-xl ${
            isDark
              ? 'glass-card-dark bg-white/5 border border-white/10'
              : 'glass-card bg-black/5 border border-black/10'
          }`}
        >
          <div className="flex items-center gap-3 px-6 py-4">
            <Search className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search products..."
              className={`flex-1 bg-transparent outline-none text-sm tracking-wide ${
                isDark ? 'text-white placeholder-gray-500' : 'text-black placeholder-gray-400'
              }`}
            />
            {searchQuery && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={() => handleSearchChange('')}
                className={`p-1 rounded-full hover-elevate ${
                  isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'
                }`}
              >
                <X className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between mb-4">
        <motion.button
          onClick={() => setFiltersOpen(!filtersOpen)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex items-center gap-2 px-6 py-3 btn-liquid shadow-lg hover-elevate magnetic-button ${
            isDark
              ? 'bg-white/10 border border-white/20 text-white'
              : 'bg-black/10 border border-black/20 text-black'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="text-xs font-medium tracking-wider uppercase">
            Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </span>
        </motion.button>

        {activeFiltersCount > 0 && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={clearAllFilters}
            className={`text-xs tracking-wider uppercase underline hover:no-underline smooth-color ${
              isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
            }`}
          >
            Clear All
          </motion.button>
        )}
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {filtersOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className={`p-6 rounded-premium shadow-lg ${
              isDark
                ? 'glass-card-dark bg-white/5 border border-white/10'
                : 'glass-card bg-black/5 border border-black/10'
            }`}>
              {/* Colors */}
              {availableColors.length > 0 && (
                <div className="mb-6">
                  <h3 className={`text-xs font-bold tracking-wider uppercase mb-3 ${
                    isDark ? 'text-white' : 'text-black'
                  }`}>
                    Colors
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {availableColors.map((color) => (
                      <motion.button
                        key={color}
                        onClick={() => toggleColor(color)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 text-xs font-medium tracking-wider uppercase btn-liquid transition-all ${
                          selectedColors.includes(color)
                            ? isDark
                              ? 'bg-white text-black shadow-xl'
                              : 'bg-black text-white shadow-xl'
                            : isDark
                            ? 'bg-white/10 text-white hover:bg-white/20'
                            : 'bg-black/10 text-black hover:bg-black/20'
                        }`}
                      >
                        {color}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {availableSizes.length > 0 && (
                <div className="mb-6">
                  <h3 className={`text-xs font-bold tracking-wider uppercase mb-3 ${
                    isDark ? 'text-white' : 'text-black'
                  }`}>
                    Sizes
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {availableSizes.map((size) => (
                      <motion.button
                        key={size}
                        onClick={() => toggleSize(size)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 text-xs font-medium tracking-wider uppercase btn-liquid transition-all ${
                          selectedSizes.includes(size)
                            ? isDark
                              ? 'bg-white text-black shadow-xl'
                              : 'bg-black text-white shadow-xl'
                            : isDark
                            ? 'bg-white/10 text-white hover:bg-white/20'
                            : 'bg-black/10 text-black hover:bg-black/20'
                        }`}
                      >
                        {size}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Sort */}
              <div>
                <h3 className={`text-xs font-bold tracking-wider uppercase mb-3 ${
                  isDark ? 'text-white' : 'text-black'
                }`}>
                  Sort by Price
                </h3>
                <div className="flex gap-2">
                  {['Low to High', 'High to Low', 'Default'].map((label, index) => {
                    const value = ['asc', 'desc', 'none'][index] as 'asc' | 'desc' | 'none'
                    return (
                      <motion.button
                        key={value}
                        onClick={() => handlePriceSort(value)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 text-xs font-medium tracking-wider uppercase btn-liquid transition-all ${
                          priceSort === value
                            ? isDark
                              ? 'bg-white text-black shadow-xl'
                              : 'bg-black text-white shadow-xl'
                            : isDark
                            ? 'bg-white/10 text-white hover:bg-white/20'
                            : 'bg-black/10 text-black hover:bg-black/20'
                        }`}
                      >
                        {label}
                      </motion.button>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
