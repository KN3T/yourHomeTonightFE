/* eslint-disable react/prop-types */
import React from 'react'
import {Bar} from 'react-chartjs-2'

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