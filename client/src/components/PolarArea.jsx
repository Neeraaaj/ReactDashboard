import React from 'react'
import {PolarArea} from 'react-chartjs-2'

const PolarAreaChart = ({ data, titleName }) => {

    const labelData = Object.keys(data)
    const ChartData = {
        labels: labelData,
        datasets: [
          {
            data: Object.values(data),
            // data: [
            //     data.Industries,
            //     data.Environment,
            //     data.Economic,
            //     data.Political,
            //     data.Technological,
            //     data.Organization,
            //     data.Healthcare,
            //     data.Social,
            //     data.Lifestyles
            // ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(255, 205, 86, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(153, 102, 255, 0.6)',
            ],
          },
        ],
      };

    const options = {
        responsive: true,
        title: {
            display: true,
            text: {titleName}
        }
     };

  return (
    <PolarArea data={ChartData} options={options}/>
  )
}

export default PolarAreaChart