import React, { useState } from "react";
import { Button, Modal, Form, Dimmer, Loader } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { db, firebase } from "../firebase";

import styles from "../css/idUpload.css";

const WalkInForm = ({
  showModal,
  userListHandleClick,
  closeWorkingForm,
  propertyID,
}) => {
  const [errorName, setErrName] = useState("");
  const [errorNights, setErrNights] = useState("");
  const [name, setName] = useState("");
  const [nights, setNights] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };
  const handleNightsChange = (e) => {
    console.log(e.target.value);
    setNights(e.target.value);
  };

  const handleContinue = async () => {
    // TODO Create Guest and booking here
    setErrName("");
    setErrNights("");
    if (name == "") {
      setErrName("Can't be blank");
      return;
    }
    if (nights == "") {
      setErrNights("Can't be blank");
      return;
    }
    let guest = "";
    let booking = "";

    setLoading(true);
    try {
      let todayWithoutTime = new Date(new Date().setHours(0, 0, 0, 0));
      guest = await db
        .collection("Property")
        .doc(propertyID)
        .collection("Guest")
        .add({
          name: name,
          last_booking_date: todayWithoutTime,
          keywords: createKeyWords(name),
        });

      console.log("Guest created " + guest.id);

      booking = await db
        .collection("Property")
        .doc(propertyID)
        .collection("Guest")
        .doc(guest.id)
        .collection("Bookings")
        .add({
          nights: nights,
          checkin_date: todayWithoutTime,
          //need to handle price properly
          price_USD: 10,
          price_LKR: 2000,
        });

      console.log("Booking created" + booking.id);
      setLoading(false);
    } catch (error) {
      console.error("ERROR " + error);
    }
    userListHandleClick(guest.id, name);
  };

  const handleBack = () => {
    closeWorkingForm();
  };

  const createKeyWords = (name) => {
    let keyWordsArray = [];
    let curName = "";
    let i = 1;
    let lower = name.toLowerCase();
    for (i = 1; i <= name.length; i++) {
      keyWordsArray.push(lower.slice(0, i));
    }
    return keyWordsArray;
  };

  return (
    <Modal size="mini" open={showModal}>
      <Modal.Header>Welcome!! Please enter your details</Modal.Header>
      <Modal.Content>
        <Form>
          {errorName && <span style={{ color: "red" }}>{errorName}</span>}
          <Form.Field>
            <label>Your Name</label>
            <input onChange={handleNameChange} placeholder="Your Name" />
          </Form.Field>
          {errorNights && <span style={{ color: "red" }}>{errorNights}</span>}
          <Form.Field>
            <label>No of nights</label>
            <input onChange={handleNightsChange} placeholder="Nights" />
          </Form.Field>
          <div className="btnFlexContainer">
            <Button
              content="<<Back  "
              onClick={handleBack}
              type="submit"
            ></Button>
            <Button onClick={handleContinue} type="submit">
              Continue
            </Button>
          </div>
        </Form>
        <Dimmer active={loading}>
          <Loader size="massive"></Loader>
        </Dimmer>
      </Modal.Content>
    </Modal>
  );
};

export default WalkInForm;
