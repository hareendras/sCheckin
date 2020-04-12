import React, { useEffect } from "react";
import { Card } from "semantic-ui-react";
import MessageHeading from "../../src/components/MessageHeading";
import Nav from "../../src/components/Nav";
import axios from "axios";

const UserListForm = ({ userOnClick, error }) => {
  useEffect(() => {
    console.log("effect");
    const f = async () => {
      let result = await axios.get(
        "https://www.hpb.health.gov.lk/api/get-current-statistical"
      );
      console.log(
        "Usr list form new case" +
          Object.values(result.data)[2].global_new_cases
      );
    };
    f();
  }, []);

  return (
    <div>
      <MessageHeading main="Please tap on your name to begin" />
      <br />
     
      <br />
      <Card.Group>
        <Card
          fluid
          color="red"
          header="Hareendra Seneviratne"
          onClick={() => userOnClick("red")}
        />
        <Card fluid color="orange" header="John Smith" />
        <Card fluid color="yellow" header="Adrean" />
        <Card fluid color="yellow" header="Pulla" />
      </Card.Group>
    </div>
  );
};

export default UserListForm;
