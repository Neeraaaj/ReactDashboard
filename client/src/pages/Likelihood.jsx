import React, { useEffect } from 'react'
import { useState } from 'react';
import Header from '../Header';
import SideBar from '../SideBar';
import axios from 'axios';
import './likelihood.css'
import PolarAreaChart from '../components/PolarArea';
import PieChart2 from '../components/PieChart2';
import LineChart from '../components/LineChart';

const Likelihood = () => {
    const [openSideToggle, setOpenSideToggle] = useState(false);
    const [insights, setInsights] = useState([]);

      const OpenSidebar = () => {
        setOpenSideToggle(!openSideToggle)
      }

        const regionData = {
            "Nothern America": 406,
            World: 434,
            "Western Asia": 128,
            "Southern Asia": 127,
            "Eastern Asia": 100,
        }


        const relevanceData = {
            1: 403,
            2: 842,
            3: 837,
            4: 760,
            5: 129,
            6: 72,
            7: 2
        }
      const getMongoData = async() => {
        try{
          const res = await axios.get("http://localhost:5000/insights");
          setInsights(res.data)
          const countries = res.data.reduce((acc, item) => {
            const { country, likelihood } = item;
                if (acc[country]) {
                    acc[country] += likelihood;
                } else {
                    acc[country] = likelihood;
                }
                return acc;
            }, {});
            // Object.entries(countries).forEach(([country, likelihood]) => {
            //     if(likelihood >= 10){
            //         console.log(`${country}: ${likelihood}`);
            //     }
            // });
            const regions = res.data.reduce((acc, item) => {
                const { region, likelihood } = item;
                    if (acc[region]) {
                        acc[region] += likelihood;
                    } else {
                        acc[region] = likelihood;
                    }
                    return acc;
                }, {});
            
                // Object.entries(regions).forEach(([region, likelihood]) => {
                //     if(likelihood >= 100 && region){
                //         regionData[region] = likelihood
                //     }
                // })

                // console.log(regionData)

                const relevances = res.data.reduce((acc, item) => {
                    const { relevance, likelihood } = item;
                        if (acc[relevance]) {
                            acc[relevance] += likelihood;
                        } else {
                            acc[relevance] = likelihood;
                        }
                        return acc;
                    }, {});

                // Object.entries(relevances).forEach(([relevance, likelihood]) => {
                //     if(relevance && likelihood){
                //         console.log(`${relevance}:${likelihood}`)
                //     }
                // })
            
        }catch (err){
          console.log("Mongo connection failed: ", err);
        }
      } 

      const countriesLikelihood = {
        "United States Of America": 348,
        Nigeria: 18,
        Russia: 78,
        "Saudi Arabia": 56,
        Egypt: 17,
        "South Africa": 10,
        India: 64,
        China: 70,
        Libya: 31,
        Brazil: 18,
        Indonesia: 25,
        Iraq: 33,
        Venezuela: 15,
        Germany: 10,
        "United Kingdom": 15,
        Canada: 20,
        Japan: 20,
        Australia: 13 
    }


      useEffect(() => {
        getMongoData()
      }, [])
  return (
    <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar}/>
        <SideBar openSideToggle={openSideToggle} OpenSidebar={OpenSidebar} />
        <div className='left-side'>
            {/* <PolarAreaChart data={countriesLikelihood} /> */}
            <div className='polar'>
                <h1>Countries with most amount of likelihood</h1>
                <PieChart2 data={countriesLikelihood} titleText="Countries with most likelihood" />
            </div>
        </div>
        <div className='right-side'>
            <div className='upper-box'>
                <h1>Regions with most amount of likelihood</h1>
                <PolarAreaChart data={regionData} titleName="Regions with most likelihood" />
            </div>
            <div className='lower-box'>
                <LineChart data1={relevanceData} title="Likelihood Proportional to Relevance" />
            </div>
        </div>
    </div>
  )
}

export default Likelihood