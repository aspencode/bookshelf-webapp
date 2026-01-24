import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import BookshelfPage from './pages/BookshelfPage';
import './App.css';


const HomePage = () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleGo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    if (inputValue.trim()) {
      // redirect to /bookshelf/username
      navigate(`/bookshelf/${inputValue.trim()}`);
    }
  };

  return (
    <div style={homeStyles.container as React.CSSProperties}>
      <h1>Welcome to Bookshelf App</h1>
      <p>Enter a username to see their collection:</p>
      <form onSubmit={handleGo} style={homeStyles.form}>
        <input
          type="text"
          placeholder="username"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={homeStyles.input}
        />
        <button type="submit" style={homeStyles.button}>Go</button>
      </form>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          <Route path="/bookshelf/:username" element={<BookshelfPage />} />
          
          <Route path="*" element={
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <h1>404</h1>
              <p>Page not found.</p>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

// Styles for HomePage
const homeStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh',
    fontFamily: 'sans-serif'
  },
  form: {
    marginTop: '1rem',
    display: 'flex',
    gap: '10px'
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#61dafb',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};

export default App;