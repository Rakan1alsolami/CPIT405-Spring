import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');
  const API_KEY = 'd708b290-d144-446d-97f2-2cf8a05d3e14';

  // Component On-Load: Pre-populates default list using useEffect
  useEffect(() => {
    fetchRecipes('healthy');
  }, []);

  const fetchRecipes = async (searchQuery) => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${searchQuery}`
      );
      const data = await response.json();
      setRecipes(data.results || []);
    } catch (error) {
      console.error('Error handling data transaction:', error);
    }
  };

  // Explicit User Event Hook: Search trigger action
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchRecipes(query.trim());
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSearchSubmit} className="search-box">
        <input
          type="text"
          placeholder="Search recipes (e.g., pasta, chicken, dessert)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img src={recipe.image} alt={recipe.title} />
            <h3>{recipe.title}</h3>
            <Link to={`/recipe/${recipe.id}`} className="view-btn">
              View Instructions
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}