import React from "react";
import { Form, Input } from "semantic-ui-react";
import MessageHeading from "../../src/components/MessageHeading";

const LoginForm = ({ onChange, onSubmit, error }) => {
  return (
    <div>
      <MessageHeading
        main="We are super excited to have you here"
        sub="Please enter four digit number displayed in white board to continue"
      />
      <br></br>
      <Form onSubmit={onSubmit}>
        {error && <span style={{ color: "red" }}>{error}</span>}
        <Form.Field>
          <Input
            fluid
            placeholder="Enter four digit code"
            size="massive"
            onChange={e => onChange(e.target.value)}
          />
        </Form.Field>
        <Form.Button content="Continue" />
      </Form>
    </div>
  );
};

export default LoginForm;
