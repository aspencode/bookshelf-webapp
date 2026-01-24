import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface RouteParams {
  username: string;
  [key: string]: string | undefined;
}

const BookshelfPage: React.FC = () => {
  // useParams takes username from url (/bookshelf/:username)
  const { username } = useParams<RouteParams>();
  const [userExists, setUserExists] = useState<boolean | null>(null); // null = loading
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!username) return;

    setLoading(true);
    axios
      .get(`/users/${username}`) // call backend endpoint
      .then(() => {
        setUserExists(true); setLoading(false);
      })
      .catch(() => {
        setUserExists(false); setLoading(false);
      });
  }, [username]);

  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</p>;
  }

  if (userExists === false) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Error</h1>
        <p>User <strong>{username}</strong> does not exist.</p>
      </div>
    );
  }
  
 // userExists === true
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>{username}'s Bookshelf</h1>
      </header>
      
      <main style={styles.main}>
        <p style={styles.info}>
          You are browsing books belonging to <strong>{username}</strong>.
        </p>
        
        {/* TODO:: ADD BOOKS */}
        <div style={styles.placeholder}>
            No books to display yet.
        </div>
      </main>
    </div>
  );
};

// TODO: move to seperate css file
const styles = {
  container: {
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
  },
  header: {
    borderBottom: '3px solid #61dafb',
    marginBottom: '2rem',
    paddingBottom: '1rem',
  },
  title: {
    fontSize: '2.5rem',
    color: '#282c34',
    margin: 0,
  },
  main: {
    lineHeight: '1.6',
  },
  info: {
    fontSize: '1.1rem',
    color: '#555',
  },
  placeholder: {
    marginTop: '3rem',
    padding: '2rem',
    border: '2px dashed #ccc',
    borderRadius: '8px',
    textAlign: 'center' as const,
    color: '#999',
  }
};

export default BookshelfPage;