import React, { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
import MessageHeading from "../../src/components/MessageHeading";
import Firebase from "../firebase";
import * as firebase from "firebase/app";

const UserListForm = ({ userOnClick, propertyID, error }) => {
  const [guests, setGuests] = useState();
  let db = Firebase.firestore();
  useEffect(() => {
    // console.log("Property ID >>" + propertyID);

    const f = async () => {
      console.log("User list fetch");
      let today = new Date().toISOString().substring(0, 10);
      today = `${today} 00:00:00`;
      console.log(today);
      const timestamp1 = firebase.firestore.Timestamp.fromDate(new Date(today));

      let querySnap = await db
        .collection("Property")
        .doc("IjLOmeiBE9FPRaU9qCyW")
        .collection("Guest")
        .where("last_booking_date", "==", timestamp1)
        .get();

      querySnap.forEach(function (doc) {
  
        console.log(doc.id, " => ", doc.data());
      });
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
