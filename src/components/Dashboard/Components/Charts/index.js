import React, { useState, useEffect, useReducer } from 'react'
import { Bar, Pie } from 'react-chartjs-2';
import axios from "axios";


export default function (props) {

  const [users, setUsers] = useState([]);
  const [dataUsersCities, setDataUsersCities] = useState([]);


  useEffect(() => {
    axios.get(`http://localhost:8080/hero/heroes`)
      .then(res => {
        setUsers(res.data)
      })
  }, [])

  useEffect(() => {
    const newDataUserCities = users.map((user) => user.city)
    setDataUsersCities(newDataUserCities);
  }, [users])

  const uniqueCities = dataUsersCities.reduce((unique, item) =>
    unique.includes(item) ? unique : [...unique, item], []
  )


  var uniqueData = [];
  for (var i = 0; i < dataUsersCities.length; i++) {

    if (uniqueData[uniqueCities.indexOf(dataUsersCities[i])] == null) {
      uniqueData[uniqueCities.indexOf(dataUsersCities[i])] = 1;
    } else {
      uniqueData[uniqueCities.indexOf(dataUsersCities[i])]++;
    }

  }

  const options = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          stepSize: 1
        }
      }]
    },
    legend: {
      position: 'bottom'
    },
  }


  const data = React.useMemo(
    () => [
      {
        labels: uniqueCities,
        datasets: [
          {
            label: '# of users',
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#FA7432',
              '#ACD653',
              '#776534',
              '#123875',
              '#EFB7BB',
              '#CBDCBD'
            ],
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: uniqueData
          }
        ]
      }], [dataUsersCities])

  return (
    <div id="layoutSidenav_content">
      <div className="row">
        <div className="container"
          style={{
            width: '400px',
            height: '300px',
          }}
        >
          <Bar
            data={data[0]}
            width={100}
            height={50}
            options={options}
          />
        </div>
        <div className="container"
          style={{
            width: '400px',
            height: '300px',
          }}
        >
          <Pie data={data[0]}
            width={100}
            height={50}
            options={options} />
        </div>
      </div>
    </div>
  )
}