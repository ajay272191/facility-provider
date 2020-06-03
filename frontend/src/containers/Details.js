import React from 'react';

import axios from 'axios';

export default class PersonList extends React.Component {
  state = {
    persons: []
  }

  componentDidMount() {
    axios.get(`http://127.0.0.1:8080/api/reserve/`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
        console.log(this.state.persons);
      })
  }

  render() {
    return (

      <div>
      {this.state.persons.map((person, index) => (
        <div>


            <p>
            <span><h1>Name: {person.name}</h1></span>
            <span>Email: {person.email}&nbsp;&nbsp;</span>
            <span>Phone: {person.phone}&nbsp;&nbsp;</span>
            <span>Address: {person.address}&nbsp;&nbsp;</span>
            <span>facility: {person.facility}</span>
            </p>


        </div>
      ))}
      </div>
    );
  }
}
