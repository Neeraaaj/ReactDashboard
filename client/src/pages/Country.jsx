import React, { useEffect } from 'react'
import { useState } from 'react';
import Header from '../Header';
import SideBar from '../SideBar';
import axios from 'axios';
import Card from '../components/Card';
import { BarChart } from '../components/BarChart';
import './country.css'
import PolarAreaChart from '../components/PolarArea';
import LineChart from '../components/LineChart';

const Country = () => {
    const [openSideToggle, setOpenSideToggle] = useState(false);
    const [insights, setInsights] = useState([]);
    const OpenSidebar = () => {
      setOpenSideToggle(!openSideToggle)
    }


    const getMongoData = async() => {
        try{
          const res = await axios.get("http://localhost:5000/insights");
          setInsights(res.data)
          const countryIntensity = res.data.reduce((acc, item) => {
            const { country, intensity } = item;
                if (acc[country]) {
                    acc[country] += intensity;
                } else {
                    acc[country] = intensity;
                }
                return acc;
            }, {});

            Object.entries(countryIntensity).forEach(([country, intensity]) => {
                if(intensity > 100){
                    console.log(`${country}: ${intensity}`);
                }
            })

            const countryRelevance = res.data.reduce((acc, item) => {
                const { country, relevance } = item;
                    if (acc[country]) {
                        acc[country] += relevance;
                    } else {
                        acc[country] = relevance;
                    }
                    return acc;
                }, {});
    
                Object.entries(countryRelevance).forEach(([country, relevance]) => {
                    if(relevance > 50){
                        console.log(`${country}: ${relevance}`);
                    }
                })
            
        }catch (err){
          console.log("Mongo connection failed: ", err);
        }
      } 

      useEffect(() => {
        getMongoData()
      }, []);


      const contriesWithIntensity = {
        "United State Of America": 1176,
        "Iran": 267,
        "India": 244,
        "Saudi Arabia": 210,
        "China": 197,
        "Russia": 244,
      }

      const countriesRelevance = {
        "United States Of America": 347,
        "Russia": 69,
        "India": 61,
        "China": 65,
        "Iran": 54
      }

  return (
    <div className='grid-container' >
        <Header OpenSidebar={OpenSidebar} />
        <SideBar openSideToggle={openSideToggle} OpenSidebar={OpenSidebar} />

        <div className='card-count'>
            <h4>USA Ranks first with 1176 amount of Intensity</h4>
            <h4>Iran Ranks second with 276 amount of Intensity</h4>
            <h4>India Ranks Third with 244 amount of Intensity</h4>
            <img src='https://store-images.s-microsoft.com/image/apps.62308.14552211939807429.4a53f07a-1397-4c45-a53d-ea0ebca33252.596debe0-de88-4833-9fdc-9f82ca4620be?h=464' className='globe' />
        </div>
        <div className='count-inten' style={{marginLeft: "20vw"}}>
            <PolarAreaChart data={contriesWithIntensity} titleName="HELLO" />
        </div>
        <div className='count-rele'>
            <LineChart data1={countriesRelevance} title="Countries with most relevance" />
        </div>
    </div>
  )
}

export default Country