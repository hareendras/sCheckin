import React, { useEffect, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import MessageHeading from "../../src/components/MessageHeading";
import Firebase from "../firebase";
import * as firebaseApp from "firebase/app";

const Confirmation = ({ propertyID, guestID, guestName, onSubmit, error }) => {
  let db = Firebase.firestore();
  const [nights, setNights] = useState(0);
  const [amount, setAmt] = useState(0);

  console.log("confirmation screen" + guestID, propertyID);
  useEffect(() => {
    const f = async () => {
      let today = new Date().toISOString().substring(0, 10);
      today = `${today} 00:00:00`;
      console.log(today);
      try {
        const todayDate = firebaseApp.firestore.Timestamp.fromDate(
          new Date(today)
        );
        console.log("propertyID " + propertyID);
        console.log("guestID " + guestID);

        let bookings = [];
        let querySnap = await db
          .collection("Property")
          .doc(propertyID)
          .collection("Guest")
          .doc(guestID)
          .collection("Bookings")
          .where("date", "==", todayDate)
          .get();

        querySnap.forEach(function (doc) {
          console.log(doc);
          bookings.push({
            amtUSD: doc.data().amtUSD,
            nights: doc.data().nights,
          });
        });

        bookings.map((doc) => {
          console.log("NIGHTS " + doc.nights);

          console.log("AMT" + doc.amtUSD);
          setNights(doc.nights);
          setAmt(doc.amtUSD);
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
        main={`Hello ${guestName}`}
        sub="You are all set! Please Check In"
      />
      <br />
      <br />
      <div>
        <Form>
          <Form.Field>
            <label>Your Name</label>
            <input placeholder="First Name" disabled value={guestName || ""} />
          </Form.Field>
          <Form.Field>
            <label>No of nights</label>
            <input placeholder="" disabled value={nights} />
          </Form.Field>
          <Form.Field>
            <label>Amount Payable USD</label>
            <input placeholder="Last Name" disabled value={amount || ""} />
          </Form.Field>

          <Button type="submit">Check Inn</Button>
        </Form>
      </div>
    </div>
  );
};

export default Confirmation;
