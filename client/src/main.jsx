import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Home.jsx'
import Intensity from './pages/Intensity.jsx'
import Likelihood from './pages/Likelihood.jsx'
import Relevance from './pages/Relevance.jsx'
import Year from './pages/Year.jsx'
import Country from './pages/Country.jsx'
import Topics from './pages/Topics.jsx'
import Region from './pages/Region.jsx'
import City from './pages/City.jsx'
import Logout from './pages/Logout.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path='/intensity' element={<Intensity />} />
      <Route  path='/likelihood' element={<Likelihood />} /> 
      <Route path='/relevance' element={<Relevance />}/>
      <Route path='/year' element={<Year />} />
      <Route path='/country' element={<Country />} />
      <Route path='/topics' element={<Topics />} />
      <Route path='/region' element={<Region />} />
      <Route path='/city' element={<City />} />
      <Route path='/logout' element={<Logout />} />
    </Routes>
  </Router>
)
