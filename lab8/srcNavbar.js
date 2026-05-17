import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1>✂️ SnapLink</h1>
      <div className="nav-links">
        <NavLink to="/" end style={({ isActive }) => ({ color: isActive ? '#38bdf8' : '' })}>
          Home
        </NavLink>
        <NavLink to="/about" style={({ isActive }) => ({ color: isActive ? '#38bdf8' : '' })}>
          About Us
        </NavLink>
      </div>
    </nav>
  );
}