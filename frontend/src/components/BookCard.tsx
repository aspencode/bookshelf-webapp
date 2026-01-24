import React from 'react';
import StarRating from './StarRating';

interface Book {
  id: number;
  title: string;
  author: string;
  coverUrl: string;
  rating: number;
}

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div style={cardStyles.bookCard}>
      <img 
        src={book.coverUrl || 'https://placehold.co/150x200?text=No+Cover'} 
        alt={book.title} 
        style={cardStyles.cover}
      />
      <div style={cardStyles.bookInfo}>
        <h3 style={cardStyles.bookTitle}>{book.title}</h3>
        <p style={cardStyles.bookAuthor}>{book.author}</p>
        
        <div style={{ marginTop: 'auto' }}>
          <StarRating rating={book.rating} />
        </div>
      </div>
    </div>
  );
};

const cardStyles = {
  bookCard: {
    border: '1px solid #eee',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
    display: 'flex',
    flexDirection: 'column' as const,
    backgroundColor: '#fff',
  },
  cover: { 
    width: '100%', 
    height: '280px', 
    objectFit: 'cover' as const 
  },
  bookInfo: { 
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column' as const,
    flexGrow: 1,
  },
  bookTitle: { 
    fontSize: '1.1rem', 
    margin: '0 0 0.5rem 0', 
    color: '#333',
    lineHeight: '1.2',
  },
  bookAuthor: { 
    fontSize: '0.9rem', 
    color: '#666', 
    margin: '0 0 0.5rem 0' 
  },
};

export default BookCard;