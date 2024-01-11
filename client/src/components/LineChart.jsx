import React from 'react'
import {Line} from 'react-chartjs-2'

const LineChart = ({ data1, title}) => {
    const labels = Object.keys(data1);
    const data = {
    labels: labels,
    datasets: [{
        label: `${title}`,
        data: Object.values(data1),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
      };

    return <Line data={data} title={title} options={options} />
}

export default LineChart