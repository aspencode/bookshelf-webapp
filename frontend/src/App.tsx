import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BookshelfPage from './pages/BookshelfPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>

          <Route path="/bookshelf/:username" element={<BookshelfPage />} />
          
          {/* Redirect from root to Guest's bookshelf 
          TODO: remove this as frontend expands*/}
          <Route path="/" element={<Navigate to="/bookshelf/Guest" replace />} />
          
          {/* Handle invalid routes */}
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

export default App;