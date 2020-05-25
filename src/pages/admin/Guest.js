import React from "react";
import { List, Icon } from "semantic-ui-react";
import { storage } from "./../../firebase";

const Guest = ({
  guest,
  currentProperty,
  setImgData,
  setShowIdViewer,
  setMainInfo,
  setShowGuestEditor,
  setSelectedGuest,
}) => {
  const bringUpIDView = async (guestid) => {
    try {
      setImgData(null);
      let imgRef = storage.ref(`${currentProperty.id}/${guestid}.jpg`);
      let imgData = await imgRef.getDownloadURL();
      console.log("IMAGE DATA ", imgData);
      setShowIdViewer(true);
      setImgData(imgData);
    } catch (error) {
      setMainInfo("No id image available for that guest");
    }
  };

  const bringUpEditView = async (guest) => {
    try {
      setImgData(null);
      let imgRef = storage.ref(`${currentProperty.id}/${guest.id}.jpg`);
      let imgData = await imgRef.getDownloadURL();
      console.log("IMAGE DATA ", imgData);
      setImgData(imgData);
      setSelectedGuest(guest);
      setShowGuestEditor(true);
    } catch (error) {
      setMainInfo("No id image available for that guest");
    }
  };
  return (
    <List.Item>
      <List.Content>
        <List.Header as="a">{guest.name}</List.Header>
        <List.Description>
          <List.Content floated="right">
            <Icon link name="eye" onClick={() => bringUpIDView(guest.id)} />
            <Icon link name="edit" onClick={() => bringUpEditView(guest)} />
            <Icon link name="user delete" />
          </List.Content>
        </List.Description>
      </List.Content>
    </List.Item>
  );
};

export default Guest;
