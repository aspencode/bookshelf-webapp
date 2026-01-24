import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import StarRating from '../components/StarRating';

interface BookDetails {
  id: number;
  title: string;
  author: string;
  isbn: string;
  length: number;
  bookmarkPosition: number;
  coverUrl: string;
  rating: number;
  reviewText: string;
  addedAt: string;
  startedAt: string;
  finishedAt: string;
}

const BookDetailsPage: React.FC = () => {
  const { username, bookId } = useParams<{ username: string; bookId: string }>();
  const [book, setBook] = useState<BookDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bookId) return;

    const fetchBookDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<BookDetails>(`/books/details/${bookId}`);
        setBook(response.data);
      } catch (err) {
        console.error("Error while displaying book:", err);
        setError("Could not load book details. It might not exist.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  if (loading) return <p style={styles.centerText}>Loading book details...</p>;
  
  if (error || !book) {
    return (
      <div style={styles.container}>
        <Link to={`/bookshelf/${username}`} style={styles.backLink}>← Back to bookshelf</Link>
        <p style={styles.centerText}>{error || "Book not found."}</p>
      </div>
    );
  }

  const progressPercent = book.length > 0 
    ? Math.round((book.bookmarkPosition / book.length) * 100) 
    : 0;
  
  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Not set';
    return new Date(dateStr).toLocaleDateString('pl-PL');
  };

  return (
    <div style={styles.container}>
      <Link to={`/bookshelf/${username}`} style={styles.backLink}>
        ← Back to {username}'s bookshelf
      </Link>

      <div style={styles.contentWrapper}>
        {/* left column: cover */}
        <div style={styles.leftCol}>
          <img 
            src={book.coverUrl || 'https://placehold.co/300x450?text=No+Cover'} 
            alt={book.title} 
            style={styles.cover} 
          />
        </div>

        {/* right column: info */}
        <div style={styles.rightCol}>
          <h1 style={styles.title}>{book.title}</h1>
          <h2 style={styles.author}>by {book.author}</h2>
          
          <div style={styles.infoGrid}>
            <p><strong>ISBN:</strong> {book.isbn || 'N/A'}</p>
            <p>
              <strong>Progress:</strong> {book.bookmarkPosition} / {book.length} pages 
              <span style={styles.percent}> ({progressPercent}%)</span>
            </p>
            <p><strong>Added to library:</strong> {formatDate(book.addedAt)}</p>
            <p><strong>Started reading:</strong> {formatDate(book.startedAt)}</p>
            <p><strong>Finished reading:</strong> {formatDate(book.finishedAt)}</p>
          </div>

          <div style={styles.ratingSection}>
            <StarRating rating={book.rating} />
          </div>

          <div style={styles.reviewSection}>
            <h3 style={styles.sectionTitle}>Review</h3>
            <p style={styles.reviewText}>{book.reviewText || "No review written yet."}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '900px',
    margin: '0 auto',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
  },
  centerText: { textAlign: 'center' as const, marginTop: '3rem', fontSize: '1.2rem', color: '#666' },
  backLink: {
    display: 'inline-block',
    marginBottom: '2rem',
    color: '#61dafb',
    textDecoration: 'none',
    fontWeight: 'bold' as const,
  },
  contentWrapper: {
    display: 'flex',
    gap: '3rem',
    alignItems: 'flex-start',
    flexWrap: 'wrap' as const,
  },
  leftCol: {
    flex: '0 0 300px',
  },
  cover: {
    width: '100%',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    display: 'block',
  },
  rightCol: {
    flex: '1',
    minWidth: '300px',
  },
  title: { fontSize: '2.5rem', margin: '0 0 0.5rem 0', color: '#282c34', lineHeight: '1.1' },
  author: { fontSize: '1.3rem', color: '#555', marginBottom: '1.5rem', fontWeight: '400' as const },
  infoGrid: {
    display: 'grid',
    gap: '0.8rem',
    marginBottom: '1.5rem',
    borderBottom: '1px solid #eee',
    paddingBottom: '1.5rem',
  },
  percent: { color: '#27ae60', fontWeight: 'bold' as const },
  ratingSection: { marginBottom: '2rem' },
  sectionTitle: { fontSize: '0.9rem', marginBottom: '0.5rem', color: '#aaa', textTransform: 'uppercase' as const, letterSpacing: '1px' },
  reviewSection: {
    backgroundColor: '#fdfdfd',
    padding: '1.5rem',
    borderRadius: '12px',
    lineHeight: '1.7',
    border: '1px solid #f0f0f0',
  },
  reviewText: { margin: 0, color: '#444', fontStyle: 'italic' as const }
};

export default BookDetailsPage;