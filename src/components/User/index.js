import React from 'react'
import axios from "axios";


export default class User extends React.Component  {

    state = {
        heroes: []
      }


      
      componentDidMount() {
        axios.get(`http://localhost:8080/hero/heroes`)
          .then(res => {
            const heroes = res.data;
            this.setState({ heroes });
            console.log("res", res);
          })
      }

      render() {

        this.componentDidMount();
        return (
          <ul>
            { this.state.heroes.map(hero => <li>name: {hero.name}</li>)}
            
          </ul>
        )
      }
}