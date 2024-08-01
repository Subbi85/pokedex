import React, { useState } from 'react';
import { TbPokeball } from 'react-icons/tb';
import { CiMenuBurger } from 'react-icons/ci';

const OffCanvasWithNavbar = ( {selectedGen, setSelectedGen, generations}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOffCanvas = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  function handleNav(gen){
    setSelectedGen(gen)
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <nav className="fixed top-0 left-0 w-full bg-gray-800 shadow-md flex justify-between items-center p-4 z-50">
        <a href="/" className="flex items-center">
          <TbPokeball size={30} className="text-white cursor-pointer" />
          <span className="text-xl font-bold text-white ml-2">Pokédex</span>
        </a>
        <button 
          className="flex items-center px-4 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-600 focus:outline-none"
          onClick={toggleOffCanvas}
        >
          <CiMenuBurger size={24} className="mr-2" />
        </button>
      </nav>

      <div 
        className={`fixed top-0 right-0 h-full bg-gradient-to-br from-[#0c0c0c] to-transparent transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } w-full md:w-1/2 lg:w-1/2 z-40`}
      >
        <button 
          className="text-white absolute top-5 right-5" 
          onClick={toggleOffCanvas}
          aria-label="Close"
        >
          <i className="fa-solid fa-xmark fa-2x"></i>
        </button>

        <div className="flex justify-center py-4 mt-12">
        </div>

        <div className="p-4">
          <div className="flex flex-wrap justify-center overflow-y-scroll">

            {generations.map((gen)=>(
              <div href="/generation" id={gen.name} className="bg-gray-700 text-white p-4 m-2 rounded-lg w-[350px] h-[220px] hover:bg-red-500 flex justify-center items-center"
                  onClick={() => handleNav(gen)}>
                    {gen.title}
                  <img src={gen.img_path} alt="" title={gen.title} className='w-1/2'/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


export default OffCanvasWithNavbar;
