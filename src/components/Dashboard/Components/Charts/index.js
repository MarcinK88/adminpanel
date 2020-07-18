import React, { useState, useEffect, useReducer } from 'react'
import { Chart } from 'react-charts'
import axios from "axios";


export default function (props) {

  const [users, setUsers] = useState([]);
  const [dataUsers, setDataUsers] = useState([]);


  useEffect(() => {
    axios.get(`http://localhost:8080/hero/heroes`)
      .then(res => {
        setUsers(res.data)
      })



  }, [])

  useEffect(() => {
    const newDataUser = users.map(user => [user.city, 1, user.name])
    setDataUsers(newDataUser);
  }, [users])



  console.log("DATAUSERS", dataUsers)

  const options = {
    legend: {
      display: true
    },
    scales: {
      yAxes: [{
        ticks: {
          max: 10,
          min: 0,
          stepSize: 1
        }
      }]
    },

  }

  const data = React.useMemo(
    () => [
      {
        label: 'Users',
        data: dataUsers,
        color: "#4D5360",
        
          yAxes: [{
              ticks: {
                  max: 5,
                  min: 0,
                  gridOffset: 1,
              }
          }]
      
        }
      

    ],
    [dataUsers]
  )

  const series = React.useMemo(
    () => ({
      type: 'bar',
      gridOffset: 1,
    }),
    []
  )

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'ordinal', position: 'bottom' },
      { position: 'left', type: 'linear', stacked: true }
    ],
    []
  )





  return (
    <div id="layoutSidenav_content">
      <div className="container"
        style={{
          width: '400px',
          height: '300px',
        }}
      >
        <Chart data={data} series={series} axes={axes} options={options} tooltip />
      </div>
    </div>
  )
}