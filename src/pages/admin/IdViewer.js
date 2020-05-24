import React from "react";
import { Header, Modal, Image } from "semantic-ui-react";

const IdViewer = ({ showIdViewer, setShowIdViewer, imgData }) => {
  const closeMe = () => {
    setShowIdViewer(false);
  };

  return (
    <Modal open={showIdViewer} closeIcon onClose={closeMe} size="mini">
      <Header icon="id card" content="ID Image" />
      <Modal.Content image>
        <Image wrapped size="medium" src={imgData} />
      </Modal.Content>
    </Modal>
  );
};

export default IdViewer;
