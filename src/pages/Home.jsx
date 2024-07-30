import React from 'react'

//Images
import pikachu from "../assets/img/pikachu.png"

const Home = () => {
  return (
    <div className="grid grid-cols-2 w-100">
        <div className="flex justify-center items-end">
            <div className="flex flex-col justify-center items-center">
              <h1 className='font-bold m-4'> Willkommen beim Pokedex</h1>
              <p className='text-2xl m-2 text-gray-400'>Der aktuelle Pokedex beinhaltet die Pokemon aller aktuellen Generationen</p>
              <a href="/generation">
                <button className='text-white w-auto p-2 m-4 text-2xl outline outline-2 outline-offset-2 cursor-pointer
                hover:bg-white hover:text-gray-800'>
                  Schnapp Sie dir!
                </button>
              </a>
            </div>
        </div>
        <div className="flex">
            <img src={pikachu} alt="" />
        </div>
    </div>
  )
}

export default Home