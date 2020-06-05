import React, { useEffect, useState } from "react";
import {
  Header,
  Modal,
  Image,
  Form,
  Button,
  Container,
  Message,
} from "semantic-ui-react";
import useFormInput from "./useFormInput";
import { db } from "./../../firebase";

const GuestEditor = ({
  showGuestEditor,
  setShowGuestEditor,
  imgData,
  selectedGuest,
  currentProperty,
  setQuery,
}) => {
  const closeMe = () => {
    setShowGuestEditor(false);
  };

  const validateGuestName = () => "";

  const guestName = useFormInput(selectedGuest.name, validateGuestName);
  const guestNIC = useFormInput(selectedGuest.nic, validateGuestName);
  const guestAddress = useFormInput(selectedGuest.address, validateGuestName);
  const guestEmail = useFormInput(selectedGuest.email, validateGuestName);
  const guestPhone = useFormInput(selectedGuest.phone, validateGuestName);
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, seterrorMessage] = useState("");

  const handleGuestEditPageSubmit = async () => {
    const guestRef = db
      .collection("Property")
      .doc(currentProperty.id)
      .collection("Guest")
      .doc(selectedGuest.id);
    try {
      await guestRef.set(
        {
          name: guestName.value,
          nic: guestNIC.value,
          address: guestAddress.value,
          email: guestEmail.value,
          phone: guestPhone.value,
        },
        { merge: true }
      );

      setSuccessMessage("Guest details updated");
      // setting query here because we need a re-render once the guest detail is updated
      setQuery(
        db
          .collection("Property")
          .doc(currentProperty.id)
          .collection("Guest")
          .orderBy("last_booking_date")
          .limit(5)
      );
    } catch (error) {
      console.log("Guest upate fail " + error);
    }
  };

  return (
    <Modal open={showGuestEditor} closeIcon onClose={closeMe} size="large">
      <Header icon="id card" content="ID Image" />

      <Modal.Content image>
        <Image src={imgData} />{" "}
        <Modal.Description>
          {successMessage && <Message success>{successMessage}</Message>}
          <Container>
            <Form>
              {guestName.error}
              <Form.Field>
                <label>Guest Name</label>
                <input placeholder="Guest Name" {...guestName} />
              </Form.Field>
              <Form.Field>
                <label>NIC / Passport No</label>
                <input placeholder="NIC / Passport" {...guestNIC} />
              </Form.Field>
              <Form.Field>
                <label>Adress</label>
                <input placeholder="Adress" {...guestAddress} />
              </Form.Field>
              <Form.Field>
                <label>E-mail</label>
                <input placeholder="E-mail" {...guestEmail} />
              </Form.Field>
              <Form.Field>
                <label>Phone</label>
                <input placeholder="Phone" {...guestPhone} />
              </Form.Field>
              <div className="propertyNameBtnSubmit">
                <Button onClick={handleGuestEditPageSubmit} type="submit">
                  Save
                </Button>{" "}
              </div>
            </Form>
          </Container>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default GuestEditor;
