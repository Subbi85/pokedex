import React from 'react'

//Components
import StatDiagramm from './StatDiagramm'

const PokemonDetails = ({selectedPokemon, setSelectedPokemon , typeIcons}) => {

  //Replacing special Characters (Arrow up)
  const description = selectedPokemon.description
  ? selectedPokemon.description.replace(/[\n\f]/g, ' ')
  : 'Keine Beschreibung vorhanden...';

  return (
    <div className="flex flex-row">
      <div className='flex flex-col justify-center items-center'>
      <p className='text-4xl'>{selectedPokemon.germanName.toUpperCase()}</p>
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
          <StatDiagramm selectedPokemon={selectedPokemon}/>
        </ul>

        <p className='text-2xl'>{description}</p>

      </div>
        <div className='flex flex-col'>
          <span className='text-6xl'>#{selectedPokemon.id}</span>
          <div className='flex justify-center items-center'>
            <img
              src={selectedPokemon.image}
              alt={selectedPokemon.name}
              className="w-32 h-32 object-cover my-4"
            />
          </div>
        <div className='flex flex-row'>
          {selectedPokemon.evolutionChain.map((evolution, index) => (
            <div key={index} 
                  className="evolution-item flex flex-col justify-center items-center px-4 cursor-pointer"
                  onClick={() => setSelectedPokemon(poke)}
                  >
              <p><strong>{evolution.species_name}</strong></p>
              {evolution.german_name && <p>{evolution.german_name}</p>}
              {evolution.image && <img src={evolution.image} alt="" className='w-6 h-6' />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PokemonDetails