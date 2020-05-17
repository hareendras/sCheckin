import React, { useState } from "react";
import {
  Button,  
  Form,
  Segment,
  Label,
  Message,
  Header,
  setMainError
} from "semantic-ui-react";
import "./css/styles.css";
import useFormInput from "./useFormInput";
import { db } from "./../../firebase";

const Property = ({ currentProperty, setCurrentProperty, setMainError, setMainSuccess }) => {
  //TODO add proper validations
  const [formHasNoErrors, setFormHasNoErrors] = useState(true);
  const validatePropertyName = () => "";


  const propertyName = useFormInput(currentProperty.name, validatePropertyName);
  const propertyAddres = useFormInput(currentProperty.address, validatePropertyName);
  const propertyEmail = useFormInput(currentProperty.email, validatePropertyName);
  const propertyPhone = useFormInput(currentProperty.phone, validatePropertyName);
  const propertyCode = useFormInput(currentProperty.code, validatePropertyName);



  const handlePropertyPageSubmit = async () => {
    if (formHasNoErrors) {

      try {
        console.log("Handle propertyForm submit");
        let currPropertyRef = currentProperty.id ? db.collection("Property").doc(currentProperty.id) : db.collection("Property").doc();

        await currPropertyRef.set({
          name: propertyName.value,
          address: propertyAddres.value,
          email: propertyEmail.value,
          code: propertyCode.value,
          phone: propertyPhone.value,
          admin_user: currentProperty.admin_user
        }, { merge: true });

        setCurrentProperty({
          id: currPropertyRef.id,
          name: propertyName.value,
          address: propertyAddres.value,
          email: propertyEmail.value,
          code: propertyCode.value,
          phone: propertyPhone.value,
          admin_user: currentProperty.admin_user
        });

        setMainSuccess("Property details updated success.");

      } catch (err) {
        setMainError(err.message);
      }
    }
  };


  return (
    <div className="propertyContainer">
      <div className="leftPusher">
        <Message
          compact
          info
          header="This is property page"
          content="This is where you enter your property details. You can enter the code which you plan to display in your property entarance. You can change this code time to time"
        ></Message>
      </div>
      <div className="propertyForm">
        <Header content="Property Details" />
        <Segment>
          <Form >
            <Form.Field >
              <label>Property Name</label>
              {propertyName.error}
              <input
                placeholder="Property"
                {...propertyName}
              />
            </Form.Field>
            <Form.Field>
              <label>Adress</label>
              <input placeholder="Adress" {...propertyAddres} />
            </Form.Field>
            <Form.Field>
              <label>E-mail</label>
              <input placeholder="E-mail" {...propertyEmail} />
            </Form.Field>
            <Form.Field>
              <label>Phone</label>
              <input placeholder="Phone" {...propertyPhone} />
            </Form.Field>
            <Form.Field>
              <Label color={"yellow"}>Code</Label>
              <input
                placeholder="Code"
                {...propertyCode}
              />
            </Form.Field>
            <div className="propertyNameBtnSubmit">
              <Button type="submit" onClick={handlePropertyPageSubmit}>Save</Button>{" "}
            </div>
          </Form>
        </Segment>
      </div>
      <div className="rightPusher"></div>
    </div>
  );
};

export default Property;
