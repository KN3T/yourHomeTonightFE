import React from 'react'
import {Bar} from 'react-chartjs-2'
import Chart from 'chart.js/auto';

const BarChart = ({datasets}) => {

  const options = {
    responsive: true,
    backgroundColor: '#E6F7FF' ,
  };
  
  return (
    
    <Bar  data={datasets}  options={options}  />
  )
}

export default BarChart