import React from "react";
import {
  Button,
  Checkbox,
  Form,
  Container,
  Segment,
  Label,
  Message,
  Header,
} from "semantic-ui-react";
import "./css/styles.css";

const Profile = () => (
  <div className="propertyContainer">
    <div className="leftPusher">
      <Message
        compact
        info
        header="Your Profile"
        content="This is your profile page. This is where you enter your data. You can choose username and password here."
      ></Message>
    </div>
    <div className="propertyForm">
      <Header content="Your Profile" />
      <Segment>
        <Form>
          <Form.Field>
            <Label color={"yellow"}>Your Username</Label>
            <input placeholder="Your Username" />
          </Form.Field>
          <Form.Field>
            <Label color={"yellow"}>Your Password</Label>
            <input placeholder="Your password" />
          </Form.Field>
          <Form.Field>
            <label>Your Name</label>
            <input placeholder="Your Name" />
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
      </Segment>
    </div>
    <div className="rightPusher"></div>
  </div>
);

export default Profile;
