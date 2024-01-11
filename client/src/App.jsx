import React, {useEffect, useState} from 'react'
import axios, {Axios} from "axios"
import {Chart} from "chart.js/auto"
import { Bar } from 'react-chartjs-2';
import {BarChart} from './components/BarChart';
import PieChart from './components/PieChart';
import './App.css'
import Header from './Header';
import Home from './Home';
import SideBar from './SideBar';

const App = () => {
  const [backendData, setBackendData] = useState([]);
  const [insights, setInsights] = useState([]);
  const [intensity, setIntensity] = useState([]);
  const [label, setLabel] = useState([])

  const getData = async() => {
    try{
      const res = await axios.get("http://localhost:5000/api");
      setBackendData(res.data.users);
    }
    catch(err){
      console.log("Error: " + err)
    }
  }

  const getMongoData = async() => {
    try{
      const res = await axios.get("http://localhost:5000/insights");
      setInsights(res.data)
      const intensity = res.data.map((item) => item.intensity)
      setIntensity(intensity)
      const label = res.data.map((item) => item.pestle)
      setLabel(label)
      const uniquePestle = new Set(res.data.map((item) => item.pestle))
      const uniquePestleArray = Array.from(uniquePestle)
      //peslte
      const pestleCounts = res.data.reduce((counts, item) => {
        const pestle = item.pestle;
        counts[pestle] = (counts[pestle] || 0) + 1;
        return counts;
      }, {});
      //sector
      const uniqueSector = new Set(res.data.map((item) => item.sector))
      const uniqueSectorArray = Array.from(uniqueSector)
      const sectorCounts = res.data.reduce((counts, item) => {
        const sector = item.sector;
        counts[sector] = (counts[sector] || 0) + 1;
        return counts;
      }, {});
      // console.log(sectorCounts)
      //intensity
      const intensities = res.data.reduce((acc, item) => {
        const { pestle, intensity } = item;
        if (acc[pestle]) {
          acc[pestle] += intensity;
        } else {
          acc[pestle] = intensity;
        }
        return acc;
      }, {});

      // Object.entries(intensities).forEach(([pestle, intensity]) => {
      //   console.log(`${pestle}: ${intensity}`);
      // });

    
      // console.log(intensityCounts)
    }catch (err){
      console.log("Mongo connection failed: ", err);
    }
  } 



  useEffect(() => {
    getData()
    getMongoData()
  }, [])

  const [openSideToggle, setOpenSideToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSideToggle(!openSideToggle)
  }

  
  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <SideBar openSideToggle={openSideToggle} OpenSidebar={OpenSidebar} />
      <Home intensity={intensity} label={label} />
    </div>
  )
}

export default App