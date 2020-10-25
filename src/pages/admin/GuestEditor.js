import React, { useEffect, useState } from "react";
import {
  Header,
  Modal,
  Image,
  Form,
  Button,
  Container,
  Message,
  Icon,
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
  setMainInfo,
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
  const [info, setInfo] = useState();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
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
          name: guestName.value || "",
          nic: guestNIC.value || "",
          address: guestAddress.value || "",
          email: guestEmail.value || "",
          phone: guestPhone.value || "",
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

  const handleGuestEditPageDelete = () => {
    setShowDeleteConfirmation(true);
  };

  const deleteGuest = async () => {
    let querySnap = await db
      .collection("Property")
      .doc(currentProperty.id)
      .collection("Guest")
      .doc(selectedGuest.id)
      .collection("Bookings")
      .get();

    let gotBookings = false;
    querySnap.forEach(async function (doc) {
      gotBookings = true;
      console.log(doc.data());
      if (doc.data() !== "undefined") {
        setInfo(
          "Bookings exists for this guest. Delete the bookings first and try again."
        );
        setShowDeleteConfirmation(false);
      }
    });
    if (!gotBookings) {
      console.log("Trying to delete");
      try {
        console.log("Trying to delete");
        const guestRef = db
          .collection("Property")
          .doc(currentProperty.id)
          .collection("Guest")
          .doc(selectedGuest.id);
        console.log("guestref +" + guestRef);
        await guestRef.delete();
        console.log("Guest delete");
        setShowDeleteConfirmation(false);
        setShowGuestEditor(false);
        setMainInfo("Successfully removed guest details");
      } catch (error) {
        setShowDeleteConfirmation(false);
        setShowGuestEditor(false);
        setMainInfo("Could not delete guest" + error.Message);
        setShowDeleteConfirmation(false);
      }
    }
  };

  return (
    <div>
      <Modal open={showGuestEditor} closeIcon onClose={closeMe} size="large">
        <Header icon="id card" content="ID Image" />

        <Modal.Content image>
          <Image src={imgData} />{" "}
          <Modal.Description>
            {successMessage && <Message success>{successMessage}</Message>}
            {info && <Message info>{info}</Message>}
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
                  <Button
                    negative
                    onClick={handleGuestEditPageDelete}
                    type="button"
                  >
                    Delete
                  </Button>{" "}
                  <Button onClick={handleGuestEditPageSubmit} type="submit">
                    Save
                  </Button>{" "}
                </div>
              </Form>
            </Container>
          </Modal.Description>
        </Modal.Content>
      </Modal>
      <Modal
        basic
        onClose={() => setShowDeleteConfirmation(false)}
        open={showDeleteConfirmation}
        size="small"
      >
        <Header icon>
          <Icon name="delete" />
          Delete Guest
        </Header>
        <Modal.Content>
          <p>Are you sure you want to delet this guest?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" inverted onClick={() => deleteGuest()}>
            <Icon name="checkmark" /> Yes
          </Button>
          <Button
            basic
            color="green"
            inverted
            onClick={() => setShowDeleteConfirmation(false)}
          >
            <Icon name="remove" /> No
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default GuestEditor;
