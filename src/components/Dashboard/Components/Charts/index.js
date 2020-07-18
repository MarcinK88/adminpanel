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



  },[])

  useEffect(() => {
    users.map(user => (
      dataUsers.push([user.city,1,user.name])
    ))  
    },[users])



  console.log("DATAUSERS", dataUsers)


  const data = React.useMemo(
    () => [
      {
        label: 'Users',
        data: dataUsers,
      },

    ],
    []
  )

  const series = React.useMemo(
    () => ({
      type: 'bar'
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
          height: '300px'
        }}
      >
        <Chart data={data} series={series} axes={axes} tooltip />
      </div>
    </div>
  )
}