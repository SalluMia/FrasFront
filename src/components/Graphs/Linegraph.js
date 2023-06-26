import React from 'react'
import { Line } from 'react-chartjs-2';
import { useState,useEffect } from 'react';
import axios from 'axios';

function Linegraph() {
    const [chartData, setChartData] = useState(null);
    useEffect(() => {
        axios.get('http://localhost:5000/api/auth/getData')
          .then(response => {
            // transform data to match chart data format
            const labels = response.data.map(item => item.product);
            const values = response.data.map(item => item.quantity);
            const chartData = {
              labels: labels,
              datasets: [
                {
                  label: 'Product Quantity',
                  data: values,
                  fill: false,
                  borderColor: 'rgb(75, 192, 192)',
                  tension: 0.1
                }
              ]
            };
            setChartData(chartData);
          })
          .catch(error => {
            console.error(error);
          });
      }, []);
      

  return (
    <div>
    <div className="container p-2 bg-light">
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {chartData && (
          <Line
            data={chartData}
            width={400}
            height={300}
            options={{
              maintainAspectRatio: false,
              scales: {
                yAxes: [{ ticks: { beginAtZero: true } }],
                xAxes: [{ type: 'time' }],
              },
            }}
          />
        )}
      </div>
    </div>
  </div>
  )
}

export default Linegraph
