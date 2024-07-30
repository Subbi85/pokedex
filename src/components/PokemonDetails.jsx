import React from 'react'

const PokemonDetails = ({selectedPokemon , typeIcons}) => {
  return (
    <div className="flex flex-row">
      <div className='flex flex-col justify-center items-center'>
      <p className='text-4xl'>{selectedPokemon.name.toUpperCase()}</p>
        <div className="flex space-x-2">
          {selectedPokemon.types.map((type, index) => (
            <div key={index} className="flex items-center">
              <img src={typeIcons[type]} alt={type} className="w-8 h-8" />
            </div>
          ))}
        </div>

        <p>Größe: {selectedPokemon.height / 10} m</p>
        <p>Gewicht: {selectedPokemon.weight / 10} kg</p>
        <ul className="list-none p-0 mt-4">
          {selectedPokemon.stats.map((stat, statIndex) => (
            <li key={statIndex} className="mt-1">
              {stat.name.charAt(0).toUpperCase() + stat.name.slice(1)}: {stat.base}
            </li>
          ))}
        </ul>

      </div>
      <div className='flex flex-col'>
        <span className='text-6xl'>#{selectedPokemon.id}</span>
        <img
          src={selectedPokemon.image}
          alt={selectedPokemon.name}
          className="w-32 h-32 object-cover my-4"
        />

      </div>

    <div>

      </div>

  </div>
  )
}

export default PokemonDetails