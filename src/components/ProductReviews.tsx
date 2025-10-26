'use client'

import { useState } from 'react'
import { Star, ThumbsUp, ThumbsDown, Flag, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export interface Review {
  id: string
  author: string
  rating: 5 | 4 | 3 | 2 | 1
  title: string
  content: string
  height?: string // e.g., "5'3\"-5'5\""
  sizeOrdered: string
  usualSize?: string
  fitRating: 'small' | 'true' | 'large' // Runs small, True to size, Runs large
  helpfulCount: number
  notHelpfulCount: number
  verified: boolean
  date: string
}

interface ProductReviewsProps {
  reviews: Review[]
  overallRating: number
  totalReviews: number
  productName: string
  averageFit: 'small' | 'true' | 'large' // Average fit across all reviews
  arc?: 'ARC_2' | 'ARC_3' // Add arc prop for styling
}

export function ProductReviews({
  reviews,
  overallRating,
  totalReviews,
  productName,
  averageFit,
  arc = 'ARC_2'
}: ProductReviewsProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<'highest' | 'lowest' | 'recent'>('highest')
  const [votedReviews, setVotedReviews] = useState<Record<string, 'helpful' | 'not-helpful' | null>>({})
  const [reviewsToShow, setReviewsToShow] = useState(5)

  // Filter tags from review content
  const commonTags = [
    'COMFORT',
    'SATISFACTION',
    'QUALITY',
    'LARGE',
    'SIZE',
    'PURCHASE',
    'MATERIAL',
    'SMALL',
    'DISAPPOINTING',
    'WEIGHT'
  ]

  // Calculate review highlights
  const reviewHighlights = `Customers love the ${productName} because it's soft, comfortable, and stylish. They say it's the perfect piece for lounging around the house or running errands. They are also satisfied with the oversized fit. However, some do note that it can pill after multiple washes.`

  // Filter reviews based on search and selected filters
  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.author.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilters = selectedFilters.length === 0 ||
      selectedFilters.some(filter =>
        review.content.toLowerCase().includes(filter.toLowerCase())
      )

    return matchesSearch && matchesFilters
  })

  // Sort reviews
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'highest') return b.rating - a.rating
    if (sortBy === 'lowest') return a.rating - b.rating
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    )
  }

  const handleVote = (reviewId: string, voteType: 'helpful' | 'not-helpful') => {
    setVotedReviews((prev) => {
      const currentVote = prev[reviewId]
      // If clicking the same vote, remove it; otherwise set new vote
      return {
        ...prev,
        [reviewId]: currentVote === voteType ? null : voteType
      }
    })
  }

  const getVoteCount = (review: Review, voteType: 'helpful' | 'not-helpful') => {
    const baseCount = voteType === 'helpful' ? review.helpfulCount : review.notHelpfulCount
    const userVote = votedReviews[review.id]

    if (userVote === voteType) {
      return baseCount + 1
    }
    return baseCount
  }

  // Calculate fit percentage for slider
  const getFitPosition = (fit: 'small' | 'true' | 'large') => {
    if (fit === 'small') return 20
    if (fit === 'true') return 50
    return 80
  }

  // Render stars
  const renderStars = (rating: number, size: 'sm' | 'lg' = 'sm') => {
    const starSize = size === 'sm' ? 'w-5 h-5' : 'w-8 h-8'
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= rating
                ? 'fill-current text-yellow-400'
                : 'fill-none text-gray-600'
            }`}
          />
        ))}
      </div>
    )
  }

  const bgColor = arc === 'ARC_2' ? 'bg-black' : 'bg-white'
  const textColor = arc === 'ARC_2' ? 'text-white' : 'text-black'
  const borderColor = arc === 'ARC_2' ? 'border-gray-800' : 'border-gray-200'
  const inputBg = arc === 'ARC_2' ? 'bg-black border-gray-700' : 'bg-white border-gray-300'
  const secondaryText = arc === 'ARC_2' ? 'text-gray-400' : 'text-gray-600'
  const hoverText = arc === 'ARC_2' ? 'hover:text-white' : 'hover:text-black'
  const activeText = arc === 'ARC_2' ? 'text-white' : 'text-black'
  const mutedText = arc === 'ARC_2' ? 'text-gray-300' : 'text-gray-700'
  const filterActiveBg = arc === 'ARC_2' ? 'bg-white text-black' : 'bg-black text-white'
  const filterInactiveBg = arc === 'ARC_2' ? 'bg-transparent border border-gray-700 text-white hover:border-white' : 'bg-transparent border border-gray-300 text-black hover:border-black'
  const sliderBg = arc === 'ARC_2' ? 'bg-gray-800' : 'bg-gray-200'
  const sliderDot = arc === 'ARC_2' ? 'bg-white' : 'bg-black'
  const reviewBorder = arc === 'ARC_2' ? 'border-gray-800' : 'border-gray-200'

  return (
    <div className={`${bgColor} ${textColor} py-16 px-4 md:px-8`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-bold mb-12 uppercase tracking-tight">
          REVIEWS
        </h2>

        {/* Overview Section */}
        <div className={`grid md:grid-cols-3 gap-8 mb-12 pb-12 border-b ${borderColor}`}>
          {/* Overall Rating */}
          <div>
            <div className="text-2xl font-bold mb-2 uppercase">{overallRating} STARS</div>
            {renderStars(Math.round(overallRating), 'lg')}
            <div className={`${secondaryText} mt-3`}>{totalReviews} Reviews</div>
          </div>

          {/* Size & Fit Average */}
          <div>
            <div className="text-2xl font-bold mb-4 uppercase">SIZE & FIT AVERAGE</div>
            <div className="relative">
              <div className={`flex justify-between text-sm ${secondaryText} mb-2`}>
                <span>Runs small</span>
                <span>True to size</span>
                <span>Runs large</span>
              </div>
              <div className={`relative h-2 ${sliderBg} rounded-full`}>
                <div
                  className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 ${sliderDot} rounded-full shadow-lg`}
                  style={{ left: `${getFitPosition(averageFit)}%`, transform: 'translate(-50%, -50%)' }}
                />
              </div>
            </div>
          </div>

          {/* Review Highlights */}
          <div>
            <div className="text-2xl font-bold mb-4 uppercase">REVIEW HIGHLIGHTS</div>
            <p className={`${mutedText} text-sm leading-relaxed`}>{reviewHighlights}</p>
          </div>
        </div>

        {/* Filter Reviews */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-6 uppercase">Filter Reviews</h3>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${secondaryText}`} />
            <input
              type="text"
              placeholder="Search Reviews"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full ${inputBg} rounded-lg py-3 pl-12 pr-4 ${textColor} placeholder-gray-500 focus:outline-none focus:border-${arc === 'ARC_2' ? 'white' : 'black'} transition-colors`}
            />
          </div>

          {/* Filter Tags */}
          <div className="flex flex-wrap gap-3 mb-6">
            {commonTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleFilter(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedFilters.includes(tag)
                    ? filterActiveBg
                    : filterInactiveBg
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Sort Controls */}
          <div className="flex items-center justify-between">
            <div className={secondaryText}>
              1-{Math.min(reviewsToShow, sortedReviews.length)} of {sortedReviews.length} Reviews
            </div>
            <div className="flex items-center gap-3">
              <span className={secondaryText}>Sort by:</span>
              <button
                onClick={() => setSortBy('highest')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  sortBy === 'highest' ? `${activeText} underline` : `${secondaryText} ${hoverText}`
                }`}
              >
                Highest to Lowest
              </button>
              <button
                onClick={() => setSortBy('lowest')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  sortBy === 'lowest' ? `${activeText} underline` : `${secondaryText} ${hoverText}`
                }`}
              >
                Lowest to Highest
              </button>
              <button
                onClick={() => setSortBy('recent')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  sortBy === 'recent' ? `${activeText} underline` : `${secondaryText} ${hoverText}`
                }`}
              >
                Most Recent
              </button>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {sortedReviews.slice(0, reviewsToShow).map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`border-b ${reviewBorder} pb-6`}
              >
                <div className="grid md:grid-cols-4 gap-6">
                  {/* Left Column - User Info */}
                  <div className="space-y-2">
                    <div className="font-bold text-lg">{review.author}</div>
                    {review.height && (
                      <div className={`text-sm ${secondaryText}`}>
                        <span className="font-medium">Height:</span> {review.height}
                      </div>
                    )}
                  </div>

                  {/* Middle Column - Review Content */}
                  <div className="md:col-span-2 space-y-4">
                    {/* Rating */}
                    {renderStars(review.rating)}

                    {/* Title */}
                    <h4 className="text-xl font-bold">{review.title}</h4>

                    {/* Content */}
                    <p className={`${mutedText} leading-relaxed`}>{review.content}</p>

                    {/* Actions */}
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <span className={secondaryText}>Helpful?</span>
                        <button
                          onClick={() => handleVote(review.id, 'helpful')}
                          className={`flex items-center gap-1 transition-colors ${
                            votedReviews[review.id] === 'helpful'
                              ? activeText
                              : `${secondaryText} ${hoverText}`
                          }`}
                        >
                          <ThumbsUp className="w-4 h-4" />
                          <span>{getVoteCount(review, 'helpful')}</span>
                        </button>
                        <button
                          onClick={() => handleVote(review.id, 'not-helpful')}
                          className={`flex items-center gap-1 transition-colors ${
                            votedReviews[review.id] === 'not-helpful'
                              ? activeText
                              : `${secondaryText} ${hoverText}`
                          }`}
                        >
                          <ThumbsDown className="w-4 h-4" />
                          <span>{getVoteCount(review, 'not-helpful')}</span>
                        </button>
                      </div>
                      <button className={`flex items-center gap-1 ${secondaryText} ${hoverText} transition-colors`}>
                        <Flag className="w-4 h-4" />
                        <span>Report</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Column - Size & Fit */}
                  <div className="space-y-4">
                    <div>
                      <div className={`text-sm ${secondaryText} mb-1`}>Size Ordered: <span className={`${activeText} font-bold`}>{review.sizeOrdered}</span></div>
                      {review.usualSize && (
                        <div className={`text-sm ${secondaryText}`}>Usual Size: <span className={`${activeText} font-bold`}>{review.usualSize}</span></div>
                      )}
                    </div>

                    {/* Individual Fit Rating */}
                    <div>
                      <div className={`flex justify-between text-xs ${secondaryText} mb-2`}>
                        <span>Runs small</span>
                        <span>True to size</span>
                        <span>Runs large</span>
                      </div>
                      <div className={`relative h-2 ${sliderBg} rounded-full`}>
                        <div
                          className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 ${sliderDot} rounded-full`}
                          style={{ left: `${getFitPosition(review.fitRating)}%`, transform: 'translate(-50%, -50%)' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More Button */}
        {reviewsToShow < sortedReviews.length && (
          <div className="text-center mt-12">
            <motion.button
              onClick={() => setReviewsToShow(prev => prev + 5)}
              className={`px-8 py-3 border-2 ${borderColor} ${textColor} font-bold rounded-lg transition-all ${
                arc === 'ARC_2' ? 'hover:bg-white hover:text-black' : 'hover:bg-black hover:text-white'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              LOAD MORE REVIEWS
            </motion.button>
          </div>
        )}
      </div>
    </div>
  )
}
