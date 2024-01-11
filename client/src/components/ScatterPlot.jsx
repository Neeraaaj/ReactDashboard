import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ScatterPlot = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart if it exists
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      const ctx = chartRef.current.getContext('2d');

      // Create a new Chart instance
      const newChart = new Chart(ctx, {
        type: 'scatter',
        data: {
          datasets: [{
            label: 'Relevance vs. Likelihood',
            data: data.map(point => ({ x: point.relevance, y: point.likelihood })),
            backgroundColor: 'rgba(75, 192, 192, 0.5)', // Adjust color as needed
          }]
        },
        options: {
          scales: {
            x: {
              type: 'linear',
              position: 'bottom'
            },
            y: {
              type: 'linear',
              position: 'left'
            }
          }
        }
      });

      // Save the newChart instance in the ref
      chartRef.current.chart = newChart;
    }
  }, [data]);

  return (
    <div>
      <canvas ref={chartRef} width="400" height="400"></canvas>
    </div>
  );
};

export default ScatterPlot;
