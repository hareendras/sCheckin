import React from "react";
import { Message } from "semantic-ui-react";

const MessageHeading = ({ main, sub, nav = false }) => {
  return (
    <div>
      <Message info size="small">
        <Message.Header>{main}</Message.Header>
        <Message.Content>{sub}</Message.Content>
      </Message>
      {nav && <Nav />}
    </div>
  );
};

export default MessageHeading;
