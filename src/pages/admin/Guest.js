import React from "react";
import {List,Icon} from "semantic-ui-react"

const Guest = ({ guest, setShowIdViewer }) => {

    const bringUpIDView = () =>{
        setShowIdViewer(true);
    }
  return (
    <List.Item>
      <List.Content>
        <List.Header as="a">{guest.name}</List.Header>
        <List.Description>
          <List.Content floated="right">
            <Icon link name="eye" onClick={bringUpIDView} />
            <Icon link name="edit" />
            <Icon link name="user delete" />
          </List.Content>
        </List.Description>
      </List.Content>
    </List.Item>
  );
};

export default Guest;
