import React from "react";
import { Form, Button } from "semantic-ui-react";
import MessageHeading from "../../src/components/MessageHeading";
import Nav from "../../src/components/Nav";


const Confirmation = ({ onChange, onSubmit, error }) => {
  return (
    <div>
      <MessageHeading
        main="Hello Hareendra!"
        sub="You are all set! Please Check In"
      />
      <br />
      <Nav />
      <br />
      <div>
        <Form>
          <Form.Field>
            <label>Your Name</label>
            <input placeholder="First Name" disabled value="Hareendra" />
          </Form.Field>
          <Form.Field>
            <label>No of nights</label>
            <input placeholder="Last Name" disabled value="2" />
          </Form.Field>
          <Form.Field>
            <label>Amount Payable USD</label>
            <input placeholder="Last Name" disabled value="7" />
          </Form.Field>

          <Button type="submit">Check Inn</Button>
        </Form>
      </div>
    </div>
  );
};

export default Confirmation;
