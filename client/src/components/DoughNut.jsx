import React from 'react'
import {Doughnut} from 'react-chartjs-2'

const DoughNut = ({ data }) => {
    const chartData = {
        labels: Object.keys(data),
        datasets: [
          {
            data: Object.values(data),
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(255, 205, 86, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 0, 0, 0.6)',
              'rgba(0, 255, 0, 0.6)',
              'rgba(0, 0, 255, 0.6)',
            ],
          },
        ],
      };
      
      const options = {
        title: {
          display: true,
          text: 'Doughnut Chart',
        },
      };
  return (
    <Doughnut data={chartData} options={options} />
  )
}

export default DoughNut