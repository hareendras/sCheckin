import React, { useEffect } from "react";
import { Form, Button } from "semantic-ui-react";
import MessageHeading from "../../src/components/MessageHeading";
import Nav from "../../src/components/Nav";
import Firebase from "../firebase";
import * as firebaseApp from "firebase/app";

const Confirmation = ({ propertyID, guestID, onChange, onSubmit, error }) => {
  let db = Firebase.firestore();

  console.log("confirmation screen" + guestID, propertyID);
  useEffect(() => {
    const f = async () => {
      //    let today = new Date().toISOString().substring(0, 10);
      //    today = `${today} 00:00:00`;
      //    console.log(today);
      try {
        //      const todayDate = firebaseApp.firestore.Timestamp.fromDate(
        //        new Date(today)
        //      );

        console.log("propertyID " + propertyID);
        console.log("guestID " + guestID);

        let bookings = [];
        let querySnap = await db
          .collection("Property")
          .doc(propertyID)
          .collection("Guest")
          .doc(guestID)
          .collection("Bookings")
          .get();

        querySnap.forEach(function (doc) {
          console.log(doc);
          bookings.push({ amtUSD: doc.data().amtUSD, nights: doc.data().nights });
        });

        bookings.map((doc) => {
          console.log("NIGHTS " + doc.nights);
          console.log("AMT" + doc.amtUSD);
        });
      } catch (error) {
        console.log(error);
      }
    };
    f();
  }, []);

  return (
    <div>
      <MessageHeading
        main="Hello Hareendra!"
        sub="You are all set! Please Check In"
      />
      <br />
      <Nav />
      <br />
      <div>
        <Form>
          <Form.Field>
            <label>Your Name</label>
            <input placeholder="First Name" disabled value="Hareendra" />
          </Form.Field>
          <Form.Field>
            <label>No of nights</label>
            <input placeholder="Last Name" disabled value="2" />
          </Form.Field>
          <Form.Field>
            <label>Amount Payable USD</label>
            <input placeholder="Last Name" disabled value="7" />
          </Form.Field>

          <Button type="submit">Check Inn</Button>
        </Form>
      </div>
    </div>
  );
};

export default Confirmation;
