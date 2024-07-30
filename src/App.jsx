import { useState , useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

//Pages
import Home from './pages/Home'
import Generation from './pages/Generation'

//Components
import Navbar from './components/Navbar'

//Images
import generation_01 from "./assets/img/generation_01.png"
import generation_02 from "./assets/img/generation_02.png"
import generation_03 from "./assets/img/generation_03.png"
import generation_04 from "./assets/img/generation_04.png"
import generation_05 from "./assets/img/generation_05.png"
import generation_06 from "./assets/img/generation_06.png"
import generation_07 from "./assets/img/generation_07.png"
import generation_08 from "./assets/img/generation_08.png"


const generations = [
  {
      id: 1,
      from: 1,
      to: 151,
      title: "Kanto",
      name:"generation_01",
      img_path:generation_01
  },
  {
      id: 2,
      from: 152,
      to: 251,
      title: "Johto",
      name:"generation_02",
      img_path:generation_02

  },
  {
      id: 3,
      from: 252,
      to: 386,
      title: "Hoenn",
      name:"generation_03",
      img_path:generation_03

  },
  {
      id: 4,
      from: 387,
      to: 493,
      title: "Sinnoh",
      name:"generation_04",
      img_path:generation_04
  },
  {
      id: 5,
      from: 494,
      to: 649,
      title: "Unova",
      name:"generation_05",
      img_path:generation_05
  },
  {
      id: 6,
      from: 650,
      to: 721,
      title: "Kalos",
      name:"generation_06",
      img_path:generation_06
  },
  {
      id: 7,
      from: 722,
      to: 809,
      title: "Alola",
      name:"generation_07",
      img_path:generation_07
  },
  {
      id: 8,
      from: 810,
      to: 898,
      title: "Galar",
      name:"generation_08",
      img_path:generation_08
  },
  {
      id: 9,
      from: 899,
      to: 1010,
      title: "Paldea",
      name:"generation_08",
      img_path:generation_08
  }
];

function App() {

  const [selectedGen, setSelectedGen]=useState(generations[0]);
  return (
    <>
      <BrowserRouter>
        <Navbar setSelectedGen={setSelectedGen} selectedGen={selectedGen} generations={generations}/>
        <Routes>
          <Route path="/" exact element={<Home />}/>
          <Route path="/generation" element={<Generation selectedGen={selectedGen} />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
