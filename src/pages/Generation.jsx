import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Icons
import bug from "../assets/icons/bug.svg";
import dark from "../assets/icons/dark.svg";
import dragon from "../assets/icons/dragon.svg";
import electric from "../assets/icons/electric.svg";
import fairy from "../assets/icons/fairy.svg";
import fighting from "../assets/icons/fighting.svg";
import fire from "../assets/icons/fire.svg";
import flying from "../assets/icons/flying.svg";
import ghost from "../assets/icons/ghost.svg";
import grass from "../assets/icons/grass.svg";
import ground from "../assets/icons/ground.svg";
import ice from "../assets/icons/ice.svg";
import normal from "../assets/icons/normal.svg";
import poison from "../assets/icons/poison.svg";
import psychic from "../assets/icons/psychic.svg";
import rock from "../assets/icons/rock.svg";
import steel from "../assets/icons/steel.svg";
import water from "../assets/icons/water.svg";

import PokemonDetails from '../components/PokemonDetails';

const Generation = ({ selectedGen }) => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  // Mapping Pokémon types to their corresponding icons
  const typeIcons = {
    bug,
    dark,
    dragon,
    electric,
    fairy,
    fighting,
    fire,
    flying,
    ghost,
    grass,
    ground,
    ice,
    normal,
    poison,
    psychic,
    rock,
    steel,
    water,
  };

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const offset = selectedGen.from - 1;
        const limit = selectedGen.to - selectedGen.from + 1;
        const listUrl = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
        const listResponse = await axios.get(listUrl);
        const pokemons = listResponse.data.results;

        const pokemonWithDetails = await Promise.all(
          pokemons.map(async (poke) => {
            const detailResponse = await axios.get(poke.url);
            const detailData = detailResponse.data;
            return {
              id: detailData.id,
              name: poke.name,
              image: detailData.sprites.other['official-artwork'].front_default,
              types: detailData.types.map((typeInfo) => typeInfo.type.name),
              stats: detailData.stats.map((statInfo) => ({
                name: statInfo.stat.name,
                base: statInfo.base_stat,
              })),
              height: detailData.height,
              weight: detailData.weight,
            };
          })
        );

        setPokemon(pokemonWithDetails);
        setSelectedPokemon(pokemonWithDetails[0]); // Set default selected Pokémon
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [selectedGen]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-800 overflow-y-auto border-r border-gray-700 hover:bg-gray-600 mt-16">
        <ul className="list-none p-0 m-0">
          {pokemon.map((poke, index) => (
            <li
              key={index}
              className="p-3 cursor-pointer bg-gray-700 border-gray-300 hover:bg-gray-600"
              onClick={() => setSelectedPokemon(poke)}
            >
              <p className='text-3xl'>{poke.name.toUpperCase()}</p>
              <div className='flex flex-row justify-center items-center'>
                {poke.types.map((type, index) => (
                  <div key={index} className="flex items-center">
                    <img src={typeIcons[type]} alt={type} className="w-8 h-8" />
                  </div>
                ))}
                <img
                  src={poke.image}
                  alt={poke.name}
                  className="w-32 h-32 object-cover"
                /> 
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 mt-16">
        {selectedPokemon && (
          <PokemonDetails selectedPokemon={selectedPokemon} typeIcons={typeIcons} />
        )}
      </div>
    </div>
  );
};

export default Generation;
