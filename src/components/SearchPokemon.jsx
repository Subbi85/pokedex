import React, { useState, useCallback, useEffect } from 'react';
import { FaRegArrowAltCircleDown } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

const SearchPokemon = ({ pokemon, selectedGen, setSelectedPokemon, typeIcons }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [isExtended, setIsExtended] = useState(false);
  const [favoritePokemon, setFavoritePokemon] = useState(null);

  useEffect(() => {
    // Retrieve favorite Pokémon from localStorage when component mounts
    const savedFavorite = localStorage.getItem('favoritePokemon');
    if (savedFavorite) {
      setFavoritePokemon(JSON.parse(savedFavorite));
    }
  }, []);

  // Update localStorage when favoritePokemon changes
  useEffect(() => {
    if (favoritePokemon) {
      localStorage.setItem('favoritePokemon', JSON.stringify(favoritePokemon));
    } else {
      localStorage.removeItem('favoritePokemon');
    }
  }, [favoritePokemon]);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const toggleType = useCallback((type) => {
    setSelectedTypes((prevSelectedTypes) =>
      prevSelectedTypes.includes(type)
        ? prevSelectedTypes.filter(t => t !== type)
        : [...prevSelectedTypes, type]
    );
  }, []);

  const toggleExtended = useCallback(() => {
    setIsExtended((prevIsExtended) => !prevIsExtended);
  }, []);

  const filteredPokemon = pokemon.filter(poke => 
    poke.germanName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedTypes.length === 0 || selectedTypes.some(type => poke.types.includes(type)))
  );

  const handleFavPokemon = useCallback((poke) => {
    setFavoritePokemon(prev => (prev === poke ? null : poke));
  }, []);

  return (
    <>
      <div>
        <h1>{selectedGen.title}</h1>
        <p>Pokemon von #{selectedGen.from} bis #{selectedGen.to}</p>
        <form action="">
          <input 
            type="text" 
            className="w-1/1.5 p-2 rounded-md bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 m-4"
            placeholder="Suchbegriff"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </form>
        <div className={`relative flex flex-wrap justify-center mb-4 transform transition-transform ${isExtended ? "" : "h-12 overflow-hidden"}`}>
          {Object.keys(typeIcons).map((type, index) => (
            <div
              key={index}
              className={`m-2 p-1 cursor-pointer border-2 rounded ${selectedTypes.includes(type) ? 'border-gray-500' : 'border-transparent'}`}
              onClick={() => toggleType(type)}
            >
              <img src={typeIcons[type]} alt={type} className="w-8 h-8" />
            </div>
          ))}
          <FaRegArrowAltCircleDown 
            size={20} 
            className={`absolute bottom-5 right-5 transform transition-transform ${isExtended ? "rotate-180" : ""}`}
            onClick={toggleExtended}
          />
        </div>
      </div>
      <ul>
        {filteredPokemon.map((poke, index) => (
          <li
            key={index}
            className="p-3 cursor-pointer bg-gray-700 border-gray-300"
            onClick={() => setSelectedPokemon(poke)}
          >
            <p className='text-3xl'>{poke.germanName.toUpperCase()}</p>
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
              {favoritePokemon?.name === poke.name ? (
                <FaStar className='text-yellow-500' />
              ) : (
                <CiStar className='hover:text-yellow-500' onClick={() => handleFavPokemon(poke)} />
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SearchPokemon;
