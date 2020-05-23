import React, { useEffect, useState } from "react";
import { Button, Header, Icon, Modal, Image } from "semantic-ui-react";


const IdViewer = ({
  showIdViewer,
  setShowIdViewer,
  imgData

}) => {
  

  const closeMe = () => {
    setShowIdViewer(false);
  };

  return (
    <Modal open={showIdViewer} closeIcon onClose={closeMe}>
      <Header icon="id card" content="ID Image" />
      <Modal.Content>
        <p>
       ID Image
        </p>
        <Image src={imgData} />
      </Modal.Content>
    </Modal>
  );
};

export default IdViewer;
