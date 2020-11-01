import React, { useEffect, useState } from "react";
import DatePicker from "./DatePicker";
import {
  Form,
  label,
  Segment,
  Icon,
  Label,
  Menu,
  Table,
  Header,
  Message,
  Button,
} from "semantic-ui-react";
import Booking from "./Booking";
import { db } from "./../../firebase";

const Bookings = ({ currentProperty }) => {
  const [RECORD_LIMIT, setRECORD_LIMIT] = useState(5);
  const [firstVisibleDoc, setFirstVisibleDoc] = useState({});
  const [lastVisibleDoc, setLastVisibleDoc] = useState({});
  const [bookingsList, setBookingsList] = useState([]);
  const [countReturnedByQuery, setCountReturnedByQuery] = useState(0);
  const [disableNext, setDisableNext] = useState(false);
  const [disablePrev, setDisablePrev] = useState(false);
  const [query, setQuery] = useState(
    db
      .collection("Property")
      .doc(currentProperty.id)
      .collection("Bookings")
      .orderBy("checkin_date","desc")  
      .limit(RECORD_LIMIT)
  );
  useEffect(() => {
    const f = async () => {
      try {
        let docSnapshots = await query.get();
        console.log("is empty" + docSnapshots.empty);

        //    if (!docSnapshots.empty) {
        let bookingsList1 = [];
        setLastVisibleDoc(docSnapshots.docs[docSnapshots.docs.length - 1]);
        setFirstVisibleDoc(docSnapshots.docs[0]);
        setCountReturnedByQuery(docSnapshots.docs.length);

        docSnapshots.forEach((doc) => {
          let data = doc.data();
          bookingsList1.push({
            id: doc.id,
            checkin_date: doc.checkin_date,
            guestId: data.guestId,
            name: data.name,
            phone: data.phone,
          });
        });
        console.log("fetched booking list " + bookingsList1);
        setBookingsList(bookingsList1);
        //   } else {
        //   setguestCountReturnedByQuery(0);
        //}
      } catch (error) {
        // setguestCountReturnedByQuery(docSnapshots.docs.length);
        console.log("Woopz +" + error.Message);
      }
    };
    f();
  }, [query]);

  const handlePrev = () => {
    setQuery(
      db
        .collection("Property")
        .doc(currentProperty.id)
        .collection("Bookings")
        .orderBy("checkin_date","desc")
        .endBefore(firstVisibleDoc)
        .limitToLast(RECORD_LIMIT)
    );
  };

  const handleNext = () => {
    if (countReturnedByQuery < RECORD_LIMIT) return;
    setQuery(
      db
        .collection("Property")
        .doc(currentProperty.id)
        .collection("Bookings")
        .orderBy("checkin_date","desc")
        .startAfter(lastVisibleDoc)
        .limit(RECORD_LIMIT)
    );
  };

  return (
    <div className="propertyContainer">
      <div className="leftPusher">
        <Message
          compact
          info
          header="This is Bookings page"
          content="Here you can view bookigs for given date range. "
        ></Message>
        <Segment>Google add</Segment>
      </div>

      <div className="propertyForm">
        <Header content="Bookings" />
        <Form>
          <Form.Group widths="equal">
            <Form.Field>
              <DatePicker />
            </Form.Field>
          </Form.Group>
        </Form>

        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Checkin Date</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Phone number</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {countReturnedByQuery > 0
              ? bookingsList.map((booking) => <Booking Booking={booking} />)
              : "No records"}
          </Table.Body>
        </Table>
        <div>
          <Button.Group basic size="mini">
            <Button
              compact
              size="mini"
              icon="left chevron"
              onClick={handlePrev}
              disabled={disablePrev}
            />

            <Button
              compact
              size="mini"
              icon="right chevron"
              onClick={handleNext}
              disabled={disableNext}
            />
          </Button.Group>
        </div>
      </div>
      <div className="rightPusher"></div>
    </div>
  );
};

export default Bookings;
