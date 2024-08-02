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

// Components
import PokemonDetails from '../components/PokemonDetails';
import SearchPokemon from '../components/SearchPokemon';

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
            const speciesResponse = await axios.get(detailData.species.url);
            const speciesData = speciesResponse.data;

            const evolutionChainResponse = await axios.get(speciesData.evolution_chain.url);
            const evolutionChainData = evolutionChainResponse.data;

            const getEvolutionChain = async (chain) => {
              const chainArray = [];
              let current = chain;

              while (current) {
                const pokemonName = current.species.name;
                const pokemonDetailResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
                const pokemonDetailData = pokemonDetailResponse.data;

                const germanNameEntry = speciesData.names.find(
                  (entry) => entry.language.name === 'de'
                );
                chainArray.push({
                  species_name: pokemonName,
                  german_name: germanNameEntry ? germanNameEntry.name : pokemonName,
                  min_level: current.evolution_details[0] ? current.evolution_details[0].min_level : null,
                  trigger_name: current.evolution_details[0] ? current.evolution_details[0].trigger.name : null,
                  image: pokemonDetailData.sprites.other['official-artwork'].front_default,
                });

                current = current.evolves_to[0];
              }

              return chainArray;
            };

            const evolutionChain = await getEvolutionChain(evolutionChainData.chain);

            //German Terms
            const germanNameEntry = speciesData.names.find(
              (entry) => entry.language.name === 'de'
            );

            const descriptionEntry = speciesData.flavor_text_entries.find(
              (entry) => entry.language.name === 'de'
            );

            return {
              id: detailData.id,
              name: poke.name,
              germanName: germanNameEntry ? germanNameEntry.name : "",
              image: detailData.sprites.other['official-artwork'].front_default,
              types: detailData.types.map((typeInfo) => typeInfo.type.name),
              stats: detailData.stats.map((statInfo) => ({
                name: statInfo.stat.name,
                base: statInfo.base_stat,
              })),
              height: detailData.height,
              weight: detailData.weight,
              description: descriptionEntry ? descriptionEntry.flavor_text : 'Keine Beschreibung gefunden...',
              evolutionChain,
            };
          })
        );

        setPokemon(pokemonWithDetails);
        setSelectedPokemon(pokemonWithDetails[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [selectedGen]);

  if (loading) return <p>Daten werden abgerufen....</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-800 overflow-y-auto border-r border-gray-700 mt-16">
        <ul className="list-none p-0 m-0">
          <li key="0">
            <SearchPokemon pokemon={pokemon} selectedGen={selectedGen} setSelectedPokemon={setSelectedPokemon} typeIcons={typeIcons} />
          </li>
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
