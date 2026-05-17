import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function RecipeDetails() {
  const { id } = useParams();
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = 'd708b290-d144-446d-97f2-2cf8a05d3e14';

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
        );
        const data = await response.json();
        setInfo(data);
        setLoading(false);
      } catch (error) {
        console.error('Failure reading item metadata:', error);
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) return <div className="container"><h3>Fetching culinary records...</h3></div>;
  if (!info) return <div className="container"><h3>Recipe entry profile untraceable.</h3></div>;

  return (
    <div className="container details-container">
      <Link to="/" style={{color: '#e67e22', textDecoration: 'none', fontWeight: 'bold'}}>← Back to Search</Link>
      
      <div className="details-header" style={{marginTop: '1rem'}}>
        <img src={info.image} alt={info.title} />
        <div className="details-info">
          <h2>{info.title}</h2>
          <p><strong>Ready time:</strong> {info.readyInMinutes} minutes</p>
          <p><strong>Servings:</strong> {info.servings}</p>
          <p dangerouslySetInnerHTML={{ __html: info.summary.substring(0, 250) + "..." }}></p>
        </div>
      </div>

      <h3 className="section-title">Ingredients</h3>
      <ul>
        {info.extendedIngredients?.map((ing) => (
          <li key={ing.id || Math.random()}>{ing.original}</li>
        ))}
      </ul>

      <h3 className="section-title">Instructions</h3>
      {info.analyzedInstructions && info.analyzedInstructions.length > 0 ? (
        <ol>
          {info.analyzedInstructions[0].steps.map((step) => (
            <li key={step.number}>{step.step}</li>
          ))}
        </ol>
      ) : (
        <p dangerouslySetInnerHTML={{ __html: info.instructions || 'No procedural instructions explicitly declared.' }}></p>
      )}
    </div>
  );
}