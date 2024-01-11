import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart2 = ({ data, titleText }) => {
    const colorPalette = [
        '#8dd3c7',
        '#ffffb3',
        '#bebada',
        '#fb8072',
        '#80b1d3',
        '#fdb462',
        '#b3de69',
        '#fccde5',
      ];
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: colorPalette,
      }, 
    ],
  };

  const options = {
    title:{
        display: true,
        text: titleText,
    },
  };
  return <Pie data={chartData} options={options} />;
};

export default PieChart2;