import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1>🍳 Recipe Radar</h1>
      <div className="nav-links">
        <Link to="/">Home Search</Link>
      </div>
    </nav>
  );
}