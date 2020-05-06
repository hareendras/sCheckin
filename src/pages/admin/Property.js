import React from "react";
import {
  Button,
  Checkbox,
  Form,
  Container,
  Segment,
  Label,
  Message,
  Header
} from "semantic-ui-react";
import "./css/styles.css";

const Property = () => (
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
        <Form>
          <Form.Field>
            <label>Property Name</label>
            <input placeholder="Property" />
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
          <Form.Field>
            <Label color={"yellow"}>Code</Label>
            <input placeholder="Code" />
          </Form.Field>
          <div className="propertyNameBtnSubmit">
            <Button type="submit">Save</Button>{" "}
          </div>
        </Form>
      </Segment>
    </div>
    <div className="rightPusher"></div>
  </div>
);

export default Property;
