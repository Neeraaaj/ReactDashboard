import React from 'react'
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data, title}) => {

  const labels = Object.keys(data);
  const ChartData = {
    labels: labels,
    datasets: [{
      label: title,
      data: Object.values(data),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }]
  };

  const options = {
    scales: {
      x: {
        stacked: true,
        ticks: {
          autoSkip: false, // Prevent x-axis labels from being auto-skipped
        },
      },
      y: { stacked: true },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Bar data={ChartData} options={options} />;
}

export  {BarChart}