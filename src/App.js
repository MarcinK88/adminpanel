import React, { useState } from 'react';
import './App.css';
import User from './components/User'
import Navigation from './components/Navigation'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import axios from "axios";
import LoginForm from './components/LoginForm'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Charts from './components/Dashboard/Components/Charts'


function App() {

  var loggedUser;

  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  const [cookies, setCookies] = useState([]);

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:8080/hero/login?pass=${e.currentTarget.elements[1].value}&login=${e.currentTarget.elements[0].value}`,
      { headers: { 'Content-Type': 'application/json' } })
      .then(res => {
        const loginToken = res.data;

        setCookie("loginToken", res.data);
        setCookies(cookies => [...loginToken]);
      })

  }

  function getLoggedUser(token) {
    let loggedUser = '';
    axios.post(`http://localhost:8080/hero/loggedUser?token=${token}`,
      { headers: { 'Content-Type': 'application/json' } })
      .then(res => {
        console.log("ODP: ", res.data)
        loggedUser = res.data;
        return (res.data)
      })
  }

  function setCookie(name, value, time) {
    var expires = "";
    if (time) {
      var date = new Date();
      date.setTime(date.getTime() + time);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  function correctToken(token) {
    axios.post(`http://localhost:8080/hero/login/checkToken?token=${token}`,
      { headers: { 'Content-Type': 'application/json' } })
      .then(res => {
        console.log(res.data)
        return (res.data)
      })
    // return false;

  }

  if (!getCookie("loginToken") || correctToken(getCookie("loginToken")) == 'false') {

    return (

      <LoginForm handleLogin={handleLogin} />

    )
  }
  else
    return (
      <div>

        <Router>
          <Navigation />
          <div id="layoutSidenav">
            <Sidebar getLoggedUser={getLoggedUser} getCookie={getCookie} />
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/charts" component={() => <Charts users={[]} />} />
          </div>
        </Router>
      </div>
    );
}

export default App;
