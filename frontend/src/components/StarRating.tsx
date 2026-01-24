import React from 'react';

interface StarRatingProps {
  rating: number; // np. 1, 4, 10, 20
  maxRating?: number; // default 20
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 20 }) => {

  const starsCount = rating / 4;

  const renderPrecisionStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const fill = Math.max(0, Math.min(1, starsCount - (i - 1)));
      stars.push(
        <div key={i} style={starStyles.starContainer}>
          <span style={starStyles.empty}>★</span>
          <div style={{ ...starStyles.starFill, width: `${fill * 100}%` }}>
            <span>★</span>
          </div>
        </div>
      );
    }
    return stars;
  };

  return (
    <div style={starStyles.container} title={`Rating: ${rating}/20`}>
      {renderPrecisionStars()}
      <span style={starStyles.text}>{rating}/20</span>
    </div>
  );
};

const starStyles = {
  container: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
  },
  starContainer: {
    position: 'relative' as const,
    display: 'inline-block',
    fontSize: '1.2rem',
  },
  empty: {
    color: '#ccc', 
  },
  starFill: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    overflow: 'hidden',
    color: '#f39c12', 
    whiteSpace: 'nowrap' as const,
  },
  text: {
    marginLeft: '8px',
    fontSize: '0.85rem',
    color: '#666',
    fontWeight: 'bold' as const,
  },
};

export default StarRating;