import React, { useEffect, useState } from "react";
import {
  Header,
  Modal,
  Image,
  Form,
  Button,
  Container,
} from "semantic-ui-react";
import useFormInput from "./useFormInput";

const GuestEditor = ({
  showGuestEditor,
  setShowGuestEditor,
  imgData,
  selectedGuest,
}) => {
  const closeMe = () => {
    setShowGuestEditor(false);
  };

  useEffect(() => {
    console.log("Editor comonent mounted");

    // returned function will be called on component unmount
    return () => {
      console.log("Editor component unmounted");
    };
  }, []);

  const validateGuestName = () => "";

  const guestName = useFormInput(selectedGuest.name, validateGuestName);
  const guestNIC = useFormInput(selectedGuest.nic, validateGuestName);
  const guestAddress = useFormInput(selectedGuest.address, validateGuestName);
  const guestEmail = useFormInput(selectedGuest.email, validateGuestName);
  const guestPhone = useFormInput(selectedGuest.phone, validateGuestName);

  const handleOpen = () => {
    console.log("Modal open");
  };

  return (
    <Modal
      open={showGuestEditor}
      closeIcon
      onClose={closeMe}
      size="large"
      onOpen={handleOpen}
    >
      <Header icon="id card" content="ID Image" />

      <Modal.Content image>
        <Image src={imgData} />{" "}
        <Modal.Description>
          {guestName.value} + {guestNIC.value}
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
                <Button type="submit">Save</Button>{" "}
              </div>
            </Form>
          </Container>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default GuestEditor;
