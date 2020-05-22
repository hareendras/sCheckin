import React, { useEffect, useState } from "react";
import { Button, Header, Icon, Modal, Image } from "semantic-ui-react";


const IdViewer = ({
  showIdViewer,
  setShowIdViewer,
  imgData

}) => {
  
  /*useEffect(() => {
    const f = async () => {
      console.log(
        "Trying path ",
        `${currentPropertyId}/${currentlySelectedGuestId}.jpg`
      );
      let imgRef = storage.ref(
        `${currentPropertyId}/${currentlySelectedGuestId}.jpg`
      );
      let imgData = await imgRef.getDownloadURL();
      console.log("IMAGE DATA ", imgData);
      setImgData(imgData);
    };
    f();
 
  }, []); */

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
