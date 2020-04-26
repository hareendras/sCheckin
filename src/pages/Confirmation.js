import React, { useEffect, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import MessageHeading from "../../src/components/MessageHeading";
import Firebase from "../firebase";
import * as firebaseApp from "firebase/app";

const Confirmation = ({ propertyID, guestID, guestName, onSubmit, error }) => {
  let db = Firebase.firestore();
  const [booking, setBooking] = useState({
    nights: 0,
    price_USD: 0,
    price_LKR: 0,
  });

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
          .where("checkin_date", "==", todayDate)
          .get();
        console.log("Confirmation qs " + querySnap);

        querySnap.forEach(function (doc) {
          console.log(doc);
          bookings.push({
            nights: doc.data().nights,
            price_USD: doc.data().price_USD,
            price_LKR: doc.data().price_LKR,
          });
        });

        bookings.map((booking) => {
          console.log("NIGHTS " + booking.nights);
          console.log("AMT USD" + booking.price_USD);
          console.log("AMT LKR" + booking.price_LKR);
          setBooking({
            nights: booking.nights,
            price_USD: booking.price_USD,
            price_LKR: booking.price_LKR,
          });
        });
      } catch (error) {
        console.error(error);
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
            <label>No of nights</label>
            <input placeholder="" disabled value={booking.nights} />
          </Form.Field>
          <Form.Field>
            <label>Amount Payable USD</label>
            <input placeholder="Last Name" disabled value={booking.price_USD} />
          </Form.Field>
          <Form.Field>
            <label>Amount Payable LKR</label>
            <input
              placeholder="First Name"
              disabled
              value={booking.price_LKR}
            />
          </Form.Field>

          <Button type="submit">Check Inn</Button>
        </Form>
      </div>
    </div>
  );
};

export default Confirmation;
