import React from "react";
import { Card } from "semantic-ui-react";
import MessageHeading from "../../src/components/MessageHeading";
import Nav from "../../src/components/Nav";

const UserListForm = ({ onChange, onSubmit, error }) => {
  return (
    <div>
      <MessageHeading main="Please tap on your name to begin" />
      <br />
      <Nav />
      <br />
      <Card.Group>
        <Card fluid color="red" header="Hareendra Seneviratne" />
        <Card fluid color="orange" header="John Smith" />
        <Card fluid color="yellow" header="Adrean" />
        <Card fluid color="yellow" header="Pulla" />
      </Card.Group>
    </div>
  );
};

export default UserListForm;
