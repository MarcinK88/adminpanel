import React, {useState} from 'react';
import './App.css';
import User from './components/User'
import Navigation from './components/Navigation'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import axios from "axios";
import LoginForm from './components/LoginForm'


function App() {

  var loginToken;

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

  if (!getCookie("loginToken") || correctToken(getCookie("loginToken")) == 'true') {

    return (

      <LoginForm handleLogin={handleLogin} />

    )
  }
  else
    return (
      <div>
        {/* <User  /> */}
        <Navigation />
        <div id="layoutSidenav">
          <Sidebar />
          <Dashboard />

        </div>

      </div>
    );
}

export default App;
