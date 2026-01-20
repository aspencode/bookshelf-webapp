import React from 'react';
import { useParams } from 'react-router-dom';


interface RouteParams {
  username: string;
  [key: string]: string | undefined;
}

const BookshelfPage: React.FC = () => {
  // useParams takes username from url (/bookshelf/:username)
  const { username } = useParams<RouteParams>();

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