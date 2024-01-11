import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart2 = ({ data }) => {
  const labels = Object.keys(data);
  const datasetData = Object.values(data);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Most Frequent Topic Count',
        data: datasetData.map(item => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderWidth: 1,
        yAxisID: 'count',
      },
      {
        label: 'Most Frequent Topic',
        data: datasetData.map(item => item.mostFrequentTopic),
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
        borderWidth: 1,
        yAxisID: 'topic',
      },
    ],
  };

  const chartOptions = {
    scales: {
      count: {
        type: 'linear',
        position: 'left',
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
      topic: {
        type: 'category',
        position: 'right',
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default BarChart2;
