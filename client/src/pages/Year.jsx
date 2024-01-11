import React from 'react'
import { useState, useEffect } from 'react'
import Header from '../Header';
import SideBar from '../SideBar';
import axios from 'axios';
import PolarAreaChart from '../components/PolarArea';
import './year.css'
import LineChart from '../components/LineChart';
import { BarChart } from '../components/BarChart';
import DoughNut from '../components/DoughNut';
import { set } from 'mongoose';
import { Bar } from 'react-chartjs-2';
const Year = () => {
    const [openSideToggle, setOpenSideToggle] = useState(false);
    const [insights, setInsights] = useState([]);

    const OpenSidebar = () => {
        setOpenSideToggle(!openSideToggle)
      }

      const getMongoData = async() => {
        try{
          const res = await axios.get("http://localhost:5000/insights");
          setInsights(res.data);
          const topicsByTimeRange = res.data.reduce((acc, item) => {
            const { relevance, start_year, end_year } = item;
          
            // Check if the data has valid start and end years
            if (start_year && end_year) {
              const key = `${start_year} - ${end_year}`;
          
              // Update topic for the time range
              acc[key] = (acc[key] || 0) + relevance;
            }
          
            return acc;
          }, {});

        //   Object.entries(topicsByTimeRange).forEach(([timeRange, totalRelevance]) => {
        //     console.log(`${timeRange}: ${totalRelevance}`);
        //   });

          const intensityByTimeRange = res.data.reduce((acc, item) => {
            const { intensity, start_year, end_year } = item;
          
            // Check if the data has valid start and end years
            if (start_year && end_year) {
              const key = `${start_year} - ${end_year}`;
          
              // Update topic for the time range
              acc[key] = (acc[key] || 0) + intensity;
            }
          
            return acc;
          }, {});

          // Object.entries(intensityByTimeRange).forEach(([timeRange, totalintensity]) => {
          //   console.log(`${timeRange}: ${totalintensity}`);
          // });

          const likelihoodByTimeRange = res.data.reduce((acc, item) => {
            const { likelihood, start_year, end_year } = item;
          
            // Check if the data has valid start and end years
            if (start_year && end_year) {
              const key = `${start_year} - ${end_year}`;
          
              // Update topic for the time range
              acc[key] = (acc[key] || 0) + likelihood;
            }
          
            return acc;
          }, {});

          // Object.entries(likelihoodByTimeRange).forEach(([timerange, likelihood]) => {
          //   console.log(`${timerange}: ${likelihood}`);
          // })

          const sourcesInfo = res.data.reduce((acc, item) => {
            const { source, start_year, end_year } = item;
          
            // Check if the source property is non-empty
            if (source !== undefined && source !== null && source !== "") {
              // Trim the source string
              const trimmedSource = source.trim();
          
              // Create an object for the source if it doesn't exist
              if (!acc[trimmedSource]) {
                acc[trimmedSource] = {
                  count: 0,
                  years: new Set(),
                };
              }
          
              // Update the occurrence count and add years for the current source
              acc[trimmedSource].count += 1;
          
              if (start_year !== undefined && start_year !== null && start_year !== "") {
                acc[trimmedSource].years.add(start_year);
              }
          
              if (end_year !== undefined && end_year !== null && end_year !== "") {
                acc[trimmedSource].years.add(end_year);
              }
            }
          
            return acc;
          }, {});
          
          // Object.entries(sourcesInfo).forEach(([source, {count, years}]) => {
          //   if(count > 20){
          //     console.log(`${source}: ${Array.from(years).join(', ')}`);
          //   }
          // })

          // console.log(sourcesInfo)

          
         
        }catch (err){
          console.log("Mongo connection failed: ", err);
        }
      } 

      useEffect(() => {
        getMongoData()
      }, [])

      const yearWiseRelavance = {
        "2017 - 2018": 40,
        "2016 - 2017": 139,
        "2016 - 2019": 43,
        "2017 - 2019": 25,
        "2016 - 2026": 28,
        "2016 - 2020": 26,
      }

      const yearWiseIntensity = {
        "2017 - 2018": 160,
        "2017 - 2200": 100,
        "2016 - 2020": 136,
        "2016 - 2017": 556,
        "2016 - 2041": 145,
        "2016 - 2019": 150,
        "2016 - 2021": 100,
        "2016 - 2026": 147,
      }

      const yearWiseLikelihood = {
        "2017 - 2018": 40,
        "2017 - 2019": 24,
        "2016 - 2017": 142,
        "2016 - 2019": 51,
        "2016 - 2026": 28,
      }

      const sourcesInfo = {
        Resilience: { years: [2040, 2050, 2017, 2016, 2046, 2020, 2025] },
        'Bloomberg Business': { years: [2017, 2200, 2016, 2018, 2026, 2030, 2036, 2022, 2025] },
        'DOE EIA 2013 Energy Conference': { years: [2017, 2018, 2019, 2020, 2016, 2040] },
        CNNMoney: { years: [2016, 2017, 2022, 2020, 2018, 2028] },
        OPEC: { years: [2016, 2017] },
      };
      
      // Extract unique years across all sources
      const allYears = Array.from(
        new Set(Object.values(sourcesInfo).flatMap(({ years }) => years))
      );
      
      // Prepare the data for Chart.js
      const chartData = {
        labels: allYears.map(String),
        datasets: Object.entries(sourcesInfo).map(([source, { years }]) => ({
          label: source,
          data: allYears.map(year => years.includes(year) ? 1 : 0),
          // Adjust as needed
          borderWidth: 1,
        })),
      };
      
      

  return (
    <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar} />
        <SideBar openSideToggle={openSideToggle} OpenSidebar={OpenSidebar} />
        <div className='chartjs' style={{display: "flex"}}>
          <div className='l-side'>
            <div className='relevance'>
                <h4> Year Wise Relevance </h4>
                <PolarAreaChart data={yearWiseRelavance} titleName="Year wise relevance" />
            </div>
          </div>
          <div className='r-side'>
            <div className='l-side'>
              <div className='intensity'>
                  <h4>Year span with most amount of Intensity</h4>
                  <LineChart data1={yearWiseIntensity} title="Year wise intensity" />
              </div>
              <div className='likelihood'>
                  <h4>Year span with most amount of Likelihood</h4>
                  <DoughNut data={yearWiseLikelihood}  />
              </div>
            </div>
          </div>
          <div className='text'>
            <h4 style={{fontSize: "2.3vw", color: "black", marginLeft: "20%"}}><span style={{color: "red"}}>403</span> unique sources</h4>
          </div>

          <div className='sources' style={{width: "50vw"}}>
            <h4>Most Common Sources Over the Years</h4>
            <Bar data={chartData} title='most common sources' />
           </div>
        </div>
    </div>
  )
}

export default Year