import React from 'react'
import { GiMoneyStack } from 'react-icons/gi'
import { TbTrees } from 'react-icons/tb'
import { GiHealthNormal } from "react-icons/gi";
import { FaIndustry } from "react-icons/fa";
import { FiUser } from 'react-icons/fi'
import { BarChart } from './components/BarChart'
import { FaGavel } from 'react-icons/fa'
import { FaPeopleGroup } from "react-icons/fa6";
import { FiMonitor } from 'react-icons/fi';
import axios from 'axios';
import { FcOrganization } from "react-icons/fc";
import PieChart from './components/PieChart';
import PieChart2 from './components/PieChart2';
import { Bar } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import LineChart from './components/LineChart';

const Home = ( {intensity, label} ) => {
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [insights, setInsights] = useState([]);
    const [filteredPestle, setFilteredPestle] = useState({});
    const [filteredRelevance, setFilteredRelevance] = useState({});

    const pestleData = {
        Economic: 329,
        Environmental: 72,
        Healthcare: 2,
        Industries: 344,
        Lifestyles: 4,
        Organization: 11,
        Political: 99,
        Social: 26,
        Technological: 20,
    }

    const sectorData = {
        "Aerospace & defence": 19,
        Automotive: 4,
        Construction: 9,
        Energy: 525,
        Environment: 14,
        "Financial services": 39,
        "Food & agriculture": 9,
        Government: 18,
        Healthcare: 2,
        "Information Technology": 15,
        Manufacturing: 49,
        "Media & entertainment": 2,
        Retail: 38,
        Security: 2,
        "Support services": 17,
        "Tourism & hospitality": 1,
        Transport: 5,
        Water: 3,
    }


    const pestleIntensityData = {
        Industries: 3412,
        Environmental: 589,
        Economic: 3630,
        Political: 798,
        Technological: 197,
        Organization: 104,
        Healthcare: 20,
        Social: 252,
        Lifestyles: 30
    }
    const getMongoData = async(selectedTopics) => {
        try{
          const res = await axios.get("http://localhost:5000/insights");
          setInsights(res.data);
          const filteredInsights = selectedTopics.length > 0
        ? res.data.filter(item => selectedTopics.includes(item.pestle))
        : res.data;
        

        const filteredPestle = filteredInsights.reduce((acc, item) => {
            const { pestle, intensity } = item;
            acc[pestle] = (acc[pestle] || 0) + Number(intensity);
            return acc;
        }, {});

          console.log(filteredPestle)
  
          setFilteredPestle(filteredPestle);

          const filteredRelevance = filteredInsights.reduce((acc, item) => {
            const { pestle, relevance } = item;
            acc[pestle] = (acc[pestle] || 0) + Number(relevance);
            return acc;
          }, {})

          setFilteredRelevance(filteredRelevance);

        }catch (err){
          console.log("Mongo connection failed: ", err);
        }
      } 



    const handleTopicChange = (topic) => {
        if (selectedTopics.includes(topic)) {
          setSelectedTopics(selectedTopics.filter((t) => t !== topic));
        } else {
          setSelectedTopics([...selectedTopics, topic]);
        }
      };
    
    const filteredInsights = insights.filter((item) =>
        selectedTopics.includes(item.topic)
    );

    useEffect(() => {
        console.log("Effect triggered");
        getMongoData(selectedTopics);
    }, [selectedTopics]);
          


  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>ECONOMIC</h3>
                    <GiMoneyStack
                     className='card_icon'
                     />
                </div>
                <h1>329</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>ENVIRONMENTAL</h3>
                    <TbTrees className='card_icon'/>
                </div>
                <h1>72</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>HEALTHCARE</h3>
                    <GiHealthNormal className='card_icon'/>
                </div>
                <h1>2</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>INDUSTRIES</h3>
                    <FaIndustry className='card_icon'/>
                </div>
                <h1>344</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>LIFESTYLES</h3>
                    <FiUser className='card_icon'/>
                </div>
                <h1>4</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>ORGANIZATION</h3>
                    <FcOrganization className='card_icon'/>
                </div>
                <h1>11</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>POLITICAL</h3>
                    <FaGavel className='card_icon'/>
                </div>
                <h1>99</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>SOCIAL</h3>
                    <FaPeopleGroup className='card_icon'/>
                </div>
                <h1>26</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>TECHNOLOGICAL</h3>
                    <FiMonitor className='card_icon'/>
                </div>
                <h1>20</h1>
            </div>
        </div>
        <div className='charts'>
             {/* <BarChart propslabels={label} propsdata={intensity}/> */}
                <div style={{background: "grey", padding: "10px", borderRadius: "15px"}}>
                <label style={{color: 'white', fontWeight: "800"}}>Select Topics:</label>
                {Object.keys(pestleData).map((topic) => (
                    <div key={topic}>
                    <input
                        type="checkbox"
                        id={topic}
                        checked={selectedTopics.includes(topic)}
                        onChange={() => handleTopicChange(topic)}
                    />
                    <label htmlFor={topic} style={{color: "white", fontSize: "1.2vw"}}>{topic}</label>
                    </div>
                ))}
                </div>

             <div className='pie'>
                <PieChart2 data={filteredPestle} />
             </div>
             <div className='pie'>
                <PieChart2 data={filteredRelevance} />
             </div>
             <div className='line'>
                <LineChart data1={filteredPestle} title="Pestle wise Intensity"/>
             </div>
        </div>
    </main>
  )
}

export default Home