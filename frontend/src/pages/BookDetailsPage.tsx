import React from 'react';
import { useParams, Link } from 'react-router-dom';

const BookDetailsPage: React.FC = () => {
  const { username, bookId } = useParams<{ username: string; bookId: string }>();

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <Link to={`/bookshelf/${username}`}>← Back to {username}'s bookshelf</Link>
      
      <div style={{ marginTop: '2rem' }}>
        <h1>Book Details</h1>
        <p><strong>ID:</strong> {bookId}</p>
        <p><strong>Username:</strong> {username}</p>
        
        <div style={{ padding: '1rem', background: '#f4f4f4', borderRadius: '8px' }}>
            <p>This is a placeholder for detailed information about the book with ID <strong>{bookId}</strong> in <strong>{username}</strong>'s bookshelf.</p>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;