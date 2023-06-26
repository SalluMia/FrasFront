import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
// import { Scale } from 'chart.js';
import Chart from 'chart.js/auto';
import Linegraph from './Linegraph';
import Piegraph from './Piegraph';



function Graphs() {
  const [chartData, setChartData] = useState(null);
  const [locations, setLocations] = useState([]);
  

  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/getData')
      .then(response => {
        setLocations(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const numDonors = locations.filter(loc => loc.status === 'Donor').length;
    const numRecipients = locations.filter(loc => loc.status === 'Receipt').length;
   

    setChartData({
      labels: ['Donors', 'Recipients'],
      datasets: [
        {
          label: 'Number of Locations',
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
          borderWidth: 1,
          hoverBackgroundColor: ['rgba(255, 99, 132, 0.4)', 'rgba(54, 162, 235, 0.4)'],
          hoverBorderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
          data: [numDonors, numRecipients],
        },
      ],
    });
  }, [locations]);

  return (
    <div>
      <div className="container p-2 bg-light">
      <h5 className=' px-5 py-0 mt-2'><b>Bar Graph Data</b></h5>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className=' px-5 py-3'>
          
          {chartData && (
            <Bar
              data={chartData}
              width={400}
              height={300}
              options={{
                maintainAspectRatio: false,
                scales: {
                  yAxes: [{ ticks: { beginAtZero: true } }],
                  xAxes: [{ type: 'category' }], // Use the registered category scale
                },
              }}
            />
          )}
         </div>
           <div className="row">
              <div className="col-sm-6">
              <div >
           <h5 className='mt-5 px-5 py-5'><b>Line Graph Data</b></h5>
                <Linegraph/>
           </div>
              </div>
              <div className="col-sm-6">
              <div className=''>
           <h5 className='mt-5 px-5 py-5'><b>Pie Graph Data</b></h5>
                <Piegraph/>
           </div>
              </div>
           </div>
          

          
         </div>
         </div>
  )
}

export default Graphs
