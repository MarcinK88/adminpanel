import React from 'react';
import './App.css';
import User from './components/User'
import Navigation from './components/Navigation'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'

function App() {



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
