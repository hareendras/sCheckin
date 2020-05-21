import React from "react";
import { Button, Header, Icon, Modal, Image } from "semantic-ui-react";

const IdViewer = ({ showIdViewer, setShowIdViewer }) => {
  const closeMe = () => {
    setShowIdViewer(false);
  };
  return (
    <Modal open={showIdViewer} closeIcon onClose={closeMe}>
      <Header icon="archive" content="Archive Old Messages" />
      <Modal.Content>
        <p>
          Your inbox is getting full, would you like us to enable automatic
          archiving of old messages?
        </p>
        <Image
          src="https://react.semantic-ui.com/images/wireframe/image.png"
          fluid
        />
      </Modal.Content>
    </Modal>
  );
};

export default IdViewer;
