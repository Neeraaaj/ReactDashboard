import React from 'react';
import { Radar } from 'react-chartjs-2';

const RadarChart = ({ data }) => {
  const ChartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Impact Analysis on Topics',
        data: Object.values(data), // Replace with your actual data
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scale: {
      ticks: { beginAtZero: true },
    },
  };

  return <Radar data={ChartData} options={options} />;
};

export default RadarChart;
