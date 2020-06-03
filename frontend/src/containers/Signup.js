import React, { useState } from "react";
import { Link} from "react-router-dom";
import { Redirect } from "react-router-dom"
import axios from 'axios';
import {
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import "./Signup.css";


export default function Signup(){

  const [fields, handleFieldChange] = useFormFields({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    facility: "",
    address: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
      fields.name.length > 0 &&
      fields.phone.length > 0 &&
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.facility.length > 0 &&
      fields.address.length > 0
    );
  }


  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      name: fields.name.length,
      phone: fields.phone.length,
      email: fields.email.length,
      password: fields.password.length,
      facility:fields.facility.length,
      address: fields.address.length
    }
    setIsLoading(true);
    console.log(data);
    console.log('hellooooooooo');
    //console.log(details);
    axios.post(`http://127.0.0.1:8080/api/provider/`,data)
      .then(res => {
        return (<Redirect to = {'http://127.0.0.1:3000/'} />)
        console.log(res);
      })

    // axios
		// 	.post('https://jsonplaceholder.typicode.com/posts', details)
		// 	.then(response => {
    //     console.log('oo heooo');
		// 		console.log(response)
		// 	})
		// 	.catch(error => {
    //     console.log('asd look');
		// 		console.log(error)
		// 	})
  }
  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="name" bsSize="large">
          <ControlLabel>Name</ControlLabel>
          <FormControl
            autoFocus
            type="string"
            value={fields.name}
            onChange={handleFieldChange}
            />
        </FormGroup>
        <FormGroup controlId="phone" bsSize="large">
          <ControlLabel>Phone Number</ControlLabel>
          <FormControl
            autoFocus
            type="string"
            value={fields.phone}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
            />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="facility" bsSize="large">
          <ControlLabel>Facility</ControlLabel>
          <FormControl
            type="string"
            onChange={handleFieldChange}
            value={fields.facility}
          />
        </FormGroup>
        <FormGroup controlId="address" bsSize="large">
          <ControlLabel>address</ControlLabel>
          <FormControl
            type="string"
            onChange={handleFieldChange}
            value={fields.address}
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Signup
        </LoaderButton>
      </form>
    );
  }

  return (
    <div className="Signup">
      {renderForm()}
    </div>
  );
}
