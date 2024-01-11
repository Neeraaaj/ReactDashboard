import React, { useEffect } from 'react'
import { useState } from 'react';
import SideBar from '../SideBar';
import Header from '../Header';
import axios from 'axios';
import { BarChart } from '../components/BarChart';
import RadarChart from '../components/RadarChart';
import LineChart from '../components/LineChart';

const Topics = () => {
    const [openSideToggle, setOpenSideToggle] = useState(false);
    const [insights, setInsights] = useState([]);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [filteredTopics, setFilteredTopics] = useState({});
    const [filteredImpact, setFilteredImpact] = useState({});
    const [filteredRelevance, setFilteredRelevance] = useState({});
    const OpenSidebar = () => {
      setOpenSideToggle(!openSideToggle)
    }

    const getMongoData = async(selectedTopics) => {
        try{
          const res = await axios.get("http://localhost:5000/insights");
          const filteredInsights = selectedTopics.length > 0
        ? res.data.filter(item => selectedTopics.includes(item.topic))
        : res.data;
        //   const topics = res.data.reduce((acc, item) => {
        //     const {topic, intensity} = item;
        //         if(acc[topic]){
        //             acc[topic] += intensity;
        //         }else{
        //             acc[topic] = intensity;
        //         }
        //         return acc;
        // }, {});

        // Object.entries(topics).forEach(([topic, intensity]) => {
        //     if(intensity >= 100){
        //         console.log(`${topic}: ${intensity}`);
        //     }
        // })

        const filteredTopics = filteredInsights.reduce((acc, item) => {
          const { topic, intensity } = item;
          if (acc[topic]) {
            acc[topic] += intensity;
          } else {
            acc[topic] = intensity;
          }
          return acc;
        }, {});

        setFilteredTopics(filteredTopics);

        const filteredImpact = filteredInsights.reduce((acc, item) => {
          const { topic, impact } = item;
          if (acc[topic]) {
            acc[topic] += Number(impact);
          } else {
            acc[topic] = Number(impact);
          }
          return acc;
        }, {});

        setFilteredImpact(filteredImpact);

        const topicWiseImpact = res.data.reduce((acc, item) => {
          const {topic, impact} = item;
              if(acc[topic]){
                  acc[topic] += Number(impact);
              }else{
                  acc[topic] = Number(impact);
              }
              return acc;
      }, {});

      // Object.entries(topicWiseImpact).forEach(([topic, impact]) => {
      //         console.log(`${topic}: ${impact}`);
      // })

      // const uniqueImpactValues = [...new Set(res.data.map(item => item.impact))];
      // console.log(uniqueImpactValues)
      const filteredRelevance = filteredInsights.reduce((acc, item) => {
        const { topic, relevance } = item;
        if (acc[topic]) {
          acc[topic] += Number(relevance);
        } else {
          acc[topic] = Number(relevance);
        }
        return acc;
      }, {});

      setFilteredRelevance(filteredRelevance);

      const topicWiseRelevance = res.data.reduce((acc, item) => {
        const {topic, relevance} = item;
            if(acc[topic]){
                acc[topic] += Number(relevance);
            }else{
                acc[topic] = Number(relevance);
            }
            return acc;
    }, {});

    Object.entries(topicWiseRelevance).forEach(([topic, relevance]) => {
      if(relevance >= 50){
        console.log(`${topic}: ${relevance}`);
      }
    })

        }catch (err){
          console.log("Mongo connection failed: ", err);
        }
      } 

      const topicsWithIntensity = {
        "gas": 701,
        "oil": 4263,
        "market": 332,
        "production": 343,
        "export": 459,
        "economy": 202,
        "growth": 510,
        "energy": 305
      }

      const topicWiseImpact = {
        "gas": 7,
        "oil": 38,
        "market": 12,
        "production": 3,
        "export": 16,
        "policy": 3,
        "robot": 3,
        "gasoline": 3,
        "car": 3,
        "revenue": 3,
        "climate change": 4,
        "debt": 4,
        "tax": 3,
      }

      const topicsWithRelevance = {
        "gas": 213,
        "oil": 1186,
        "market": 57,
        "production": 91,
        "export": 99,
        "economy": 55,
        "growth": 155,
        "energy": 100
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
        getMongoData(selectedTopics)
      }, [selectedTopics])

  return (
    <div className='grid-container'>
    <div style={{background: "white", height: "fit-content", border: "1px solid black", borderRadius: "25px", padding: "20px"}}>
      <label>Select Topics:</label>
      {Object.keys(topicsWithIntensity).map((topic) => (
        <div key={topic}>
          <input
            type="checkbox"
            id={topic}
            checked={selectedTopics.includes(topic)}
            onChange={() => handleTopicChange(topic)}
          />
          <label htmlFor={topic}>{topic}</label>
        </div>
      ))}
    </div>

        <Header OpenSidebar={OpenSidebar} />
        <SideBar openSideToggle={openSideToggle} OpenSidebar={OpenSidebar} />
        <div className='content' style={{display: "flex", flexDirection: "column"}}>
          <div className='upper' style={{display: "flex", width: "100%"}}>
              <div className='polar' style={{width: "90vw", boxShadow: "1px 1px 4px 1px grey"}}>
                  <BarChart data={filteredTopics} title="Topics with the most amount of intensity" />
              </div>
              <div className='polar' style={{width: "55vw", height: "20vh", display: "flex", justifyContent: "center", border: "none", boxShadow: "1px 1px 4px 2px grey"}}>
                  <h3 style={{fontWeight: "800"}}>Topics Unleashed: A Global Canvas of Intensity, Relevance, and Country Dynamics</h3>
              </div>
          </div>
          <div className="lower" style={{display: "flex", width: "100%"}}> 
            <div className='polar' style={{width: "20vw", boxShadow: "1px 1px 4px 2px grey", height: "40vh"}}>
              <RadarChart data={filteredImpact} />
            </div>
            <div className='polar' style={{width: "50vw", height: "40vh", boxShadow: "1px 1px 4px 2px grey"}}>
              <LineChart data1={filteredRelevance} title="Topics with relevance" />
            </div>
          </div>
        </div>
    </div>
  )
}

export default Topics