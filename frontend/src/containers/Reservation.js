import React, { useState } from "react";
import axios from 'axios';
import {
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import "./Signup.css";

export default function Signup() {

  const [fields, handleFieldChange] = useFormFields({
    fullName:"",
    email: "",
    phoneNumber: "",
    address: "",
    facility: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
      fields.fullName.length > 0 &&
      fields.email.length > 0 &&
      fields.phoneNumber.length > 0 &&
      fields.address.length > 0 &&
      fields.facility.length > 0
    );
  }


  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    // var details = {
    //   userId: fields.email,
    //   titme: fields.password,
    //   body: fields.confirmationCode
    // }
    console.log(fields);
    //console.log(details);
    // axios
		// 	.get('https://jsonplaceholder.typicode.com/posts', )
		// 	.then(response => {
    //     console.log('oo heooo');
		// 		console.log(response)
		// 	})
		// 	.catch(error => {
    //     console.log('asd look');
		// 		console.log(error)
		// 	})
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
        <FormGroup controlId="fullName" bsSize="large">
          <ControlLabel>Full Name</ControlLabel>
          <FormControl
            type="string"
            value={fields.fullName}
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
        <FormGroup controlId="phoneNumber" bsSize="large">
          <ControlLabel>Phone Number</ControlLabel>
          <FormControl
            type="string"
            value={fields.phoneNumber}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="address" bsSize="large">
          <ControlLabel>Address</ControlLabel>
          <FormControl
            type="string"
            onChange={handleFieldChange}
            value={fields.confirmPassword}
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
