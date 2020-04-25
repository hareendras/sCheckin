import React, { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
import MessageHeading from "../../src/components/MessageHeading";
import WalkInForm from "./WalkInForm";
import Firebase from "../firebase";
import * as firebaseApp from "firebase/app";

const UserListForm = ({ userOnClick, propertyID, error }) => {
  const [guests, setGuests] = useState([]);
  const [walkInFormOpen, setWalkInFormOpen] = useState(false);
  let db = Firebase.firestore();
  useEffect(() => {
    // console.log("Property ID >>" + propertyID);

    const f = async () => {
      console.log("User list fetch");
      let today = new Date().toISOString().substring(0, 10);
      today = `${today} 00:00:00`;
      console.log(today);
      try {
        const todayDate = firebaseApp.firestore.Timestamp.fromDate(
          new Date(today)
        );
        let guestList = [];

        let querySnap = await db
          .collection("Property")
          .doc(propertyID)
          .collection("Guest")
          .where("last_booking_date", "==", todayDate)
          .get();
        querySnap.forEach(function (doc) {
          console.log(doc);
          guestList.push({ id: doc.id, name: doc.data().name });
        });

        setGuests(guestList);
      } catch (error) {
        console.log(error);
      }
    };
    f();
  }, []);

  const userListHandleClick = (guestId, name) => {
    console.log("Handle click user list " + guestId);
    userOnClick(guestId, name);
  };

  const userListHandleWalkinClick = () => {
    setWalkInFormOpen(true);
  };

  return (
    <div>
      <MessageHeading main="Please tap on your name to begin" />
      <br />
      <br />
      <Card.Group>
        {guests.map((guest) => (
          <Card
            key={guest.id}
            fluid
            color="orange"
            header={guest.name}
            onClick={() => userListHandleClick(guest.id, guest.name)}
          />
        ))}
        <Card
          key={"walk"}
          fluid
          color="orange"
          header="Walk-in"
          onClick={() => userListHandleWalkinClick("walkin")}
        />
        <WalkInForm showModal={walkInFormOpen} propertyID={propertyID} userListHandleClick={userListHandleClick} />
      </Card.Group>
    </div>
  );
};

export default UserListForm;
