import React, { useEffect, useState } from "react";
import { Button, Header, Icon, Modal, Image } from "semantic-ui-react";
import { storage } from "./../../firebase";

const IdViewer = ({
  showIdViewer,
  setShowIdViewer,
  currentPropertyId,
  currentlySelectedGuestId,
}) => {
  const [imgData, setImgData] = useState();
  useEffect(() => {
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
 
  }, []);

  const closeMe = () => {
    setShowIdViewer(false);
  };

  return (
    <Modal open={showIdViewer} closeIcon onClose={closeMe}>
      <Header icon="archive" content="Archive Old Messages" />
      <Modal.Content>
        <p>
          Property {currentPropertyId} Guest {currentlySelectedGuestId} imgData{" "}
          {imgData}
        </p>
        <Image src={imgData} />
      </Modal.Content>
    </Modal>
  );
};

export default IdViewer;
