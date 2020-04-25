import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Button, Modal, Checkbox, Form } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const WalkInForm = ({ showModal,  userListHandleClick, propertyID }) => {
  const [err, setErr] = useState("");
  const [name, setName] = useState("");
  const [nights, setNights] = useState("");

  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };
  const handleNightsChange = (e) => {
    console.log(e.target.value);
    setNights(e.target.value);
  };

  const handleContinue = () => {
    // TODO Create Guest and booking here
        

    userListHandleClick(1234,"newewe");
   
  };

  return (
    <Modal size="mini" open={showModal}>
      <Modal.Header>Welcome!! Please enter your details</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Your Name</label>
            <input onChange={handleNameChange} placeholder="Your Name" />
          </Form.Field>
          <Form.Field>
            <label>No of nights</label>
            <input onChange={handleNightsChange} placeholder="Nights" />
          </Form.Field>
          <Button onClick={handleContinue} type="submit">
            Continue
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default WalkInForm;
