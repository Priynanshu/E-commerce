import React from 'react'

const StarRating = ({ rating, size = 14 }) => {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star
        const half = !filled && rating >= star - 0.5
        return (
          <svg key={star} width={size} height={size} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
            <defs>
              <linearGradient id={`half-${star}-${size}`}>
                <stop offset="50%" stopColor="#f59e0b"/>
                <stop offset="50%" stopColor="#374151"/>
              </linearGradient>
            </defs>
            <polygon
              points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
              fill={filled ? '#f59e0b' : half ? `url(#half-${star}-${size})` : '#374151'}
              stroke="none"
            />
          </svg>
        )
      })}
    </div>
  )
}

export default StarRating
