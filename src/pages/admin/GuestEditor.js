import React from "react";
import {
  Header,
  Modal,
  Image,
  Form,
  Button,
  Container,
} from "semantic-ui-react";

const GuestEditor = ({ showGuestEditor, setShowGuestEditor, imgData }) => {
  const closeMe = () => {
    setShowGuestEditor(false);
  };

  return (
    <Modal open={showGuestEditor} closeIcon onClose={closeMe} size="large">
      <Header icon="id card" content="ID Image" />

      <Modal.Content image>
        <Image  src={imgData} />{" "}
        <Modal.Description>
          <Container>
            <Form>
              <Form.Field>
                <label>Guest Name</label>

                <input placeholder="Guest Name" />
              </Form.Field>
              <Form.Field>
                <label>NIC / Passport</label>
                <input placeholder="NIC / PAssport" />
              </Form.Field>
              <Form.Field>
                <label>Adress</label>
                <input placeholder="Adress" />
              </Form.Field>
              <Form.Field>
                <label>E-mail</label>
                <input placeholder="E-mail" />
              </Form.Field>
              <Form.Field>
                <label>Phone</label>
                <input placeholder="Phone" />
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
