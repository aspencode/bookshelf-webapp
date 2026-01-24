import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookCard from '../components/BookCard';

interface RouteParams {
  username: string;
  [key: string]: string | undefined;
}

interface Book {
  id: number;
  title: string;
  author: string;
  coverUrl: string;
  rating: number;
  // możesz dodać resztę pól jeśli będą potrzebne
}

interface PaginationMeta {
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

interface BooksResponse {
  data: Book[];
  meta: PaginationMeta;
}

const BookshelfPage: React.FC = () => {
  // useParams takes username from url (/bookshelf/:username)
  const { username } = useParams<RouteParams>();

  const [loading, setLoading] = useState(true);
  const [userExists, setUserExists] = useState<boolean | null>(null); // null = loading
  const [books, setBooks] = useState<Book[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [page, setPage] = useState(1);
  
  useEffect(() => {
    if (!username) return;

    const fetchUserDataAndBooks = async () => {
      setLoading(true);
      try {
        // get uesrId by username
        const userRes = await axios.get(`/users/${username}`);
        const userData = userRes.data as { id: number };
        const userId = userData.id;
        setUserExists(true);

        // get user's books with pagination
        const booksRes = await axios.get<BooksResponse>(`/books/${userId}?page=${page}&limit=9`);
        setBooks(booksRes.data.data);
        setMeta(booksRes.data.meta);
      } catch (err) {
        console.error("Błąd ładowania danych:", err);
        setUserExists(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDataAndBooks();
  }, [username, page]); // refetch when username or page changes

  if (loading) return <p style={styles.centerText}>Loading...</p>;

  if (userExists === false) {
    return (
      <div style={styles.container}>
        <h1>Error</h1>
        <p>User <strong>{username}</strong> does not exist.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>{username}'s Bookshelf</h1>
      </header>
      
      <main>
        <div style={styles.grid}>
          {books.length > 0 ? (
            books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))
          ) : (
            <div style={styles.placeholder}>This user hasn't added any books yet.</div>
          )}
        </div>

        {meta && meta.totalPages > 1 && (
          <div style={styles.pagination}>
            <button 
              disabled={page === 1} 
              onClick={() => setPage(p => p - 1)}
              style={styles.pageButton}
            >
              Previous
            </button>
            <span style={styles.pageInfo}>Page {meta.currentPage} of {meta.totalPages}</span>
            <button 
              disabled={page === meta.totalPages} 
              onClick={() => setPage(p => p + 1)}
              style={styles.pageButton}
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1000px',
    margin: '0 auto',
    fontFamily: 'Segoe UI, sans-serif',
  },
  centerText: { textAlign: 'center' as const, marginTop: '2rem' },
  header: { borderBottom: '3px solid #61dafb', marginBottom: '2rem', paddingBottom: '1rem' },
  title: { fontSize: '2rem', color: '#282c34', margin: 0 },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '2rem',
  },
  bookCard: {
    border: '1px solid #eee',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  cover: { width: '100%', height: '280px', objectFit: 'cover' as const },
  bookInfo: { padding: '1rem' },
  bookTitle: { fontSize: '1.1rem', margin: '0 0 0.5rem 0', color: '#333' },
  bookAuthor: { fontSize: '0.9rem', color: '#666', margin: '0 0 0.5rem 0' },
  rating: { fontSize: '0.85rem', fontWeight: 'bold' as const, color: '#f39c12' },
  placeholder: { gridColumn: '1 / -1', textAlign: 'center' as const, padding: '3rem', color: '#999' },
  pagination: {
    marginTop: '3rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem'
  },
  pageButton: {
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    backgroundColor: '#61dafb',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold' as const
  },
  pageInfo: {
    fontSize: '0.9rem',
    color: '#333'
  }
};

export default BookshelfPage;