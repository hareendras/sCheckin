import React from "react";
import { List, Icon } from "semantic-ui-react";
import { storage } from "./../../firebase";

const Guest = ({ guest, currentProperty, setImgData, setShowIdViewer }) => {

  const bringUpIDView = async (guestid) => {
    let imgRef = storage.ref(
      `${currentProperty.id}/${guestid}.jpg`
    );
    let imgData = await imgRef.getDownloadURL();
    console.log("IMAGE DATA ", imgData);
    setShowIdViewer(true);
    setImgData(imgData);
    
  };
  return (
    <List.Item>
      <List.Content>
        <List.Header as="a">{guest.name}</List.Header>
        <List.Description>
          <List.Content floated="right">
            <Icon link name="eye" onClick={()=>bringUpIDView(guest.id)} />
            <Icon link name="edit" />
            <Icon link name="user delete" />
          </List.Content>
        </List.Description>
      </List.Content>
    </List.Item>
  );
};

export default Guest;
