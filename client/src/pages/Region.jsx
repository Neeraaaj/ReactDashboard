import React from 'react'
import { useState, useEffect } from 'react';
import Header from '../Header';
import SideBar from '../SideBar';
import axios from 'axios';
import BarChart2 from '../components/BarChart2';
import PolarAreaChart from '../components/PolarArea';
import { BarChart } from '../components/BarChart';

const Region = () => {
    const [openSideToggle, setOpenSideToggle] = useState(false);
    const [insights, setInsights] = useState([]);
    const OpenSidebar = () => {
      setOpenSideToggle(!openSideToggle)
    }

    const getMongoData = async() => {
        try{
          const res = await axios.get("http://localhost:5000/insights");
          setInsights(res.data)
          const regionWithMostFrequentTopics = res.data.reduce((acc, item) => {
            const { region, topic } = item;
          
            if (!acc[region]) {
              // If the region is not in the accumulator, add it with the current topic
              acc[region] = { mostFrequentTopic: topic, count: 1 };
            } else {
              // If the region is already in the accumulator, update the counts
              acc[region].count += 1;
          
              // Update the most frequent topic if needed
              if (acc[region].count > acc[region].mostFrequentCount) {
                acc[region].mostFrequentTopic = topic;
                acc[region].mostFrequentCount = acc[region].count;
              }
            }

            
          
            return acc;
          }, {});

          const regionIntensity = res.data.reduce((acc, item) => {
            const { region, intensity } = item;
                if (acc[region]) {
                    acc[region] += intensity;
                } else {
                    acc[region] = intensity;
                }
                return acc;
            }, {});

            // Object.entries(regionIntensity).forEach(([region, intensity]) => {
            //     if(intensity > 100){
            //         console.log(`${region}: ${intensity}`);
            //     }
            // })
          
        //   console.log(regionWithMostFrequentTopics);
        const regionRelevance = res.data.reduce((acc, item) => {
            const { region, relevance } = item;
                if (acc[region]) {
                    acc[region] += relevance;
                } else {
                    acc[region] = relevance;
                }
                return acc;
            }, {});

            Object.entries(regionRelevance).forEach(([region, relevance]) => {
                if(relevance > 100){
                    console.log(`${region}: ${relevance}`);
                }
            })

            
        }catch (err){
          console.log("Mongo connection failed: ", err);
        }
      } 

      useEffect(() => {
        getMongoData()
      }, [])


      const regionWithMostFrequentTopics = {
        "Africa": {mostFrequentTopic: 'oil', count: 13},
        "Asia": {mostFrequentTopic: 'export', count: 7},
        "Central Africa": {mostFrequentTopic: 'policy', count: 3},
        "Central America": {mostFrequentTopic: 'oil', count: 4},
        "Eastern Africa": {mostFrequentTopic: 'food', count: 2},
        "Eastern Asia": {mostFrequentTopic: 'oil', count: 34},
        "Eastern Europe": {mostFrequentTopic: 'oil', count: 32},
        "Europe": {mostFrequentTopic: 'tension', count: 10},
        "Northern Africa": {mostFrequentTopic: 'gas', count: 18},
        "Northern America": {mostFrequentTopic: 'gas', count: 132},
        "Northern Europe": {mostFrequentTopic: 'gas', count: 11},
        "Oceania": {mostFrequentTopic: 'oil', count: 5},
        "South America": {mostFrequentTopic: 'economy', count: 17},
        "South-Eastern Asia": {mostFrequentTopic: 'oil', count: 17},
        "Southern Africa": {mostFrequentTopic: 'oil', count: 2},
        "Southern Asia": {mostFrequentTopic: 'growth', count: 40},
        "Southern Europe": {mostFrequentTopic: 'economy', count: 40},
        "Western Africa": {mostFrequentTopic: 'gdp', count: 13},
        "Western Asia": {mostFrequentTopic: 'war', count: 44},
        "Western Europe": {mostFrequentTopic: 'oil', count: 4},
      }

      const regionIntensity = {
        "Northern America": 1425,
        "World": 1823,
        "Western Asia": 410,
        "Eastern Europe": 295,
        "Northern Africa": 172,
        "Southern Asia": 523,
        "Eastern Asia": 339,
        "South America": 208,
        "South-Eastern Asia": 140
      }

      const regionRelevance = {
        "Northern America": 411,
        "World": 425,
        "Western Asia": 110,
        "Southern Asia": 120
      } 
  return (
    <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar} />
        <SideBar openSideToggle={openSideToggle} OpenSidebar={OpenSidebar} />
        <div className='content' style={{display: "flex", flexDirection: "column"}}>
            <div className='upper'style={{display: "flex", width: "100%"}}>
                <div className='polar' style={{height: "40vh", width: "40vw", boxShadow: "1px 1px 2px 2px grey"}}>
                    <BarChart2 data={regionWithMostFrequentTopics} />
                </div>
                <div className='polar' style={{width: "fit-content", height: "40vh", display: 'flex', justifyContent: 'center', boxShadow: "1px 1px 4px 2px grey"}}>
                    <h4 style={{fontWeight: "800"}}>Region With Most Amount Of Intensity</h4>
                    <PolarAreaChart data={regionIntensity} titleName="Region with most amount of intensity" />
                </div>
            </div>
            <div className='lower' style={{display: 'flex', width: "100%"}}>
                <div className='polar' style={{width: "75vw", boxShadow: "1px 1px 4px 2px grey"}}>
                    <BarChart data={regionRelevance} title="Regions with most amount of relevance" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Region