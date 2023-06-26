import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

function Piegraph() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/getData')
      .then(response => {
        const dataMap = new Map();
        response.data.forEach(item => {
          if (dataMap.has(item.product)) {
            dataMap.set(item.product, dataMap.get(item.product) + item.quantity);
          } else {
            dataMap.set(item.product, item.quantity);
          }
        });

        const labels = Array.from(dataMap.keys());
        const values = Array.from(dataMap.values());
        const totalQuantity = values.reduce((a, b) => a + b, 0);
        const percentageValues = values.map(value => ((value / totalQuantity) * 100).toFixed(2));
        
        const uniqueLabels = [];
        const uniquePercentageValues = [];
        const labelMap = new Map();
        
        labels.forEach((label, index) => {
          if (!labelMap.has(label)) {
            uniqueLabels.push(label);
            uniquePercentageValues.push(percentageValues[index]);
            labelMap.set(label, true);
          } else {
            const existingIndex = uniqueLabels.indexOf(label);
            uniquePercentageValues[existingIndex] = (parseFloat(uniquePercentageValues[existingIndex]) + parseFloat(percentageValues[index])).toFixed(2);
          }
        });

        const chartData = {
          labels: uniqueLabels,
          datasets: [
            {
              label: 'Product Quantity',
              data: uniquePercentageValues,
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40',
                '#008080',
                '#DB7093',
                '#2E8B57',
                '#FF6347'
              ],
              hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40',
                '#008080',
                '#DB7093',
                '#2E8B57',
                '#FF6347'
              ]
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
        <div>
          {chartData && (
            <Pie data={chartData} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Piegraph;
