import React, { useEffect } from 'react'
import Header from '../Header'
import SideBar from '../SideBar'
import { useState } from 'react'
import axios from 'axios'
import './intensity.css'
import PolarAreaChart from '../components/PolarArea'
import { BarChart } from '../components/BarChart'
import './relevance.css'
import ScatterPlot from '../components/ScatterPlot'
import PieChart from '../components/PieChart'
import LineChart from '../components/LineChart'

const Relevance = () => {
    const [openSideToggle, setOpenSideToggle] = useState(false);

    const OpenSidebar = () => {
        setOpenSideToggle(!openSideToggle)
      }

      const getMongoData = async() => {
        try{
          const res = await axios.get("http://localhost:5000/insights");
          const countries = res.data.reduce((acc, item) => {
            const { country, relevance } = item;
                if (acc[country]) {
                    acc[country] += relevance;
                } else {
                    acc[country] = relevance;
                }
                return acc;
            }, {});

            // Object.entries(countries).forEach(([country, relevance]) => {
            //         if(relevance >= 10){
            //             console.log(`${country}: ${relevance}`);
            //         }
            // });

            const likelihoods = res.data.reduce((acc, item) => {
                const { likelihood, relevance } = item;
                    if (acc[likelihood]) {
                        acc[likelihood] += relevance;
                    } else {
                        acc[likelihood] = relevance;
                    }
                    return acc;
                }, {});
    
                Object.entries(likelihoods).forEach(([likelihood, relevance]) => {
                            console.log(`${likelihood}: ${relevance}`);
                });

            const sectors = res.data.reduce((acc, item) => {
                const {sector, relevance} = item;
                    if(acc[sector]){
                        acc[sector] += relevance;
                    }else{
                        acc[sector] = relevance;
                    }
                    return acc;
            }, {});

            Object.entries(sectors).forEach(([sector, relevance]) => {
                if(relevance >= 10){
                    console.log(`${sector}: ${relevance}`);
                }
            })
        }catch (err){
          console.log("Mongo connection failed: ", err);
        }
      } 

      useEffect(() => {
        getMongoData();
      }, [])

      const countriesRelevance = {
        "United States Of America": 347,
        Russia: 69,
        "Saudi Arabia": 50,
        India: 61,
        China: 65,
        Iran: 54
      }

      const relevanceVsLikelihood = [
        {likelihood: 1, relevance: 9},
        {likelihood: 2, relevance: 563},
        {likelihood: 3, relevance: 614},
        {likelihood: 4, relevance: 1438}
      ]

      const sectorWiseRelevance = {
        Energy: 1475,
        Manufacturing: 128,
        Government: 42,
        "Aerospace & defense": 49,
        "Financial Services": 105,
        "Information Technology": 43
      }
  return (
    <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar}/>
        <SideBar openSideToggle={openSideToggle} OpenSidebar={OpenSidebar} />
        <div className='charts-intensity'>
            <div className='upper'>
              <div className='banner'>
                <div className='text'>
                    Visualizing Relevance Across Countries and Likelihoods
                </div>
                <div className='img' >
                  <img src='https://cdn.dribbble.com/users/59947/screenshots/17108611/media/921dde07080f3340eb85517a75e55159.jpg?resize=1000x750&vertical=center' style={{width: "10vw", height: "19vh", borderRadius: "100%"}}/>
                </div>
              </div>
              <div className='bar'>
                <BarChart data={countriesRelevance} title="Countires with most amount of Relevance" />
              </div>
            </div>

            {/* <div className='bottom'>
              <div className='polar'>
                  <PolarAreaChart data={pestleIntensityData} titleName="Pestle Wise Intensity" />
              </div>
              <div className='dough'>
                <DoughNut data={intensitySectorData} />
              </div>
              <div className='line'>
                <LineChart data1={intensityByYearRange} title="Intensity by certain year period" />
              </div>
            </div> */}
            <div className='lower'>
                <div className='line'>
                    <ScatterPlot data={relevanceVsLikelihood} />
                </div>
                <div className='line-chart'>
                    <LineChart data1={sectorWiseRelevance} title="Sector wise relevance" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Relevance