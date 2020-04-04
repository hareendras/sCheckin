import React from "react";
import { Form, Input, FormField } from "semantic-ui-react";

const LoginForm = ({ onChange }) => {
  return (
    <Form>
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
  );
};

export default LoginForm;
