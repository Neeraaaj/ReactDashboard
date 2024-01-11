import React, { useEffect, useState} from 'react'
import SideBar from '../SideBar'
import '../App.css'
import Header from '../Header'
import axios from 'axios'
import LineChart from '../components/LineChart'
import './intensity.css'
import PolarAreaChart from '../components/PolarArea'
import DoughNut from '../components/DoughNut'
import { BarChart } from '../components/BarChart'

const Intensity = () => {
    const [insights, setInsights] = useState([]);
    const intensitySectorData = {
        Energy: 5192,
        Environment: 73,
        Government: 163,
        "Aerospace & defence": 157,
        Manufacturing: 481,
        Retail: 341,
        "Financial services": 433,
        "Support services": 172,
        "Information Technology": 212,
        Healthcare: 20,
        "Food & agriculture": 107,
        Automotive: 22,
        "Tourism & hospitality": 12,
        Construction: 66,
        Security: 28,
        Transport: 42,
        Water: 13,
        "Media & entertainment": 19
    }

    const pestleIntensityData = {
      Industries: 3412,
      Environment: 589,
      Economic: 3630,
      Political: 798,
      Technological: 197,
      Organization: 104,
      Healthcare: 20,
      Social: 252,
      Lifestyles: 30
    }
    // const countryIntensity = {}

    const countryIntensity = {
      Australia: 42,
      Brazil: 88,
      Canada: 68,
      China: 197,
      Egypt: 72,
      India: 244,
      Indonesia: 81,
      Iran: 267,
      Iraq: 84,
      Japan: 92,
      Libya: 84,
      Nigeria: 42,
      Russia: 244,
      "Saudi Arabia": 210,
      "South Africa": 32,
      Ukraine: 24,
      "United Kingdom": 36,
      "United States of America": 1176,
      Venezuela: 40,
    }

    const intensityByYearRange = {
      "2017 - 2018": 160,
      "2017 - 2200": 24,
      "2017 - 2019": 100,
      "2017 - 2020": 16,
      "2017 - 2022": 22,
      "2018 - 2020": 12,
      "2017 - 2021": 24,
      "2018 - 2021": 12,
      "2016 - 2046": 21,
      "2016 - 2126": 9,
      "2016 - 2020": 136,
      "2016 - 2017": 556,
      "2016 - 2019": 150,
      "2016 - 2041": 145,
      "2016 - 2018": 52,
      "2016 - 2021": 100,
      "2016 - 2026": 147,
      "2016 - 2036": 39,
      "2021 - 2025": 12,
      "2016 - 2051": 12,
      "2016 - 2050": 40,
      "2025 - 2030": 8,
    }
    
    const getMongoData = async() => {
        try{
          const res = await axios.get("http://localhost:5000/insights");
          setInsights(res.data)
          const sectors = res.data.reduce((acc, item) => {
            const { sector, intensity } = item;
                if (acc[sector]) {
                    acc[sector] += intensity;
                } else {
                    acc[sector] = intensity;
                }
                return acc;
            }, {});
            // Object.entries(sectors).forEach(([sector, intensity]) => {
            //     console.log(`${sector}: ${intensity}`);
            // });

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

            const countries = res.data.reduce((acc, item) => {
              const { country, intensity } = item;
              if(intensity >= 100){
                if (acc[country]) {
                  acc[country] += intensity;
                } else {
                  acc[country] = intensity;
                }
              }
              return acc;
            }, {});

            // console.log(countryIntensity)

            const intensityByTimeRange = res.data.reduce((acc, item) => {
              const { intensity, start_year, end_year } = item;
            
              // Check if the data has valid start and end years
              if (start_year && end_year) {
                const key = `${start_year} - ${end_year}`;
            
                // Update intensity for the time range
                acc[key] = (acc[key] || 0) + intensity;
              }
            
              return acc;
            }, {});
            
            // Object.entries(intensityByTimeRange).forEach(([timeRange, totalIntensity]) => {
            //   console.log(`${timeRange}: ${totalIntensity}`);
            // });
        }catch (err){
          console.log("Mongo connection failed: ", err);
        }
      } 

      useEffect(() => {
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
        <div className='charts-intensity'>
            <div className='upper'>
              <div className='banner'>
                <div className='text'>
                  INTENSITY ANALYTICS
                </div>
                <div className='img'>
                  <img src='https://cdn.dribbble.com/users/24078/screenshots/1675568/media/5b2f84b7778d19c6d5f535ffc71db725.jpg?resize=800x600&vertical=center'/>
                </div>
              </div>
                <div className='bar'>
                  <BarChart data={countryIntensity} title="Countries with most amount of intensities"/>
                </div>
            </div>
            <div className='bottom'>
              <div className='polar'>
                  <PolarAreaChart data={pestleIntensityData} titleName="Pestle Wise Intensity" />
              </div>
              <div className='dough'>
                <DoughNut data={intensitySectorData} />
              </div>
              <div className='line'>
                <LineChart data1={intensityByYearRange} title="Intensity by certain year period" />
              </div>
            </div>
        </div>
    </div>
  )
}

export default Intensity