import React from 'react';
import { useLocation } from 'react-router-dom';

const Kampf = () => {
  const location = useLocation();
  const { selectedPokemon } = location.state || {};

  return (
    <div>
      <h1>Kampf</h1>
      {selectedPokemon ? (
        <div>
          <p>Selected Pokémon: {selectedPokemon.germanName}</p>
          {/* Render more details or functionality for the battle */}
        </div>
      ) : (
        <p>No Pokémon selected.</p>
      )}
    </div>
  );
}

export default Kampf;
