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
  Input,
  List,
  Button,
} from "semantic-ui-react";
import { db } from "./../../firebase";
import IdViewer from "./IdViewer";
import Guest from "./Guest";

const Guests = ({ setMainError, currentProperty }) => {
  const [query, setQuery] = useState(
    db
      .collection("Property")
      .doc(currentProperty.id)
      .collection("Guest")
      .orderBy("last_booking_date")
      .limit(5)
  );
  const [firstVisibleDoc, setFirstVisibleDoc] = useState({});
  const [lastVisibleDoc, setLastVisibleDoc] = useState({});
  const [guestsList, setGuestsList] = useState([]);
  const [guestCountReturnedByQuery, setguestCountReturnedByQuery] = useState(0);
  const [showIdViewer, setShowIdViewer] = useState(false);  
  const [imgData, setImgData] = useState();

  useEffect(() => {
    const f = async () => {
      try {
        let docSnapshots = await query.get();
        console.log("is empty" + docSnapshots.empty);

        if (!docSnapshots.empty) {
          let guestsList1 = [];
          setLastVisibleDoc(docSnapshots.docs[docSnapshots.docs.length - 1]);
          setFirstVisibleDoc(docSnapshots.docs[0]);
          setguestCountReturnedByQuery(docSnapshots.docs.length);

          docSnapshots.forEach((doc) => {
            guestsList1.push({ id: doc.id, name: doc.data().name });
          });
          setGuestsList(guestsList1);
        } else {
          setguestCountReturnedByQuery(0);
        }
      } catch (error) {
        setMainError(error);
      }
    };
    f();
  }, [query]);

  const setSearchQueryDelayed = debounce((text) => {
    console.log(
      "search string , property query fired ",
      text,
      currentProperty.id
    );
    if (text == "") {
      setQuery(
        db
          .collection("Property")
          .doc(currentProperty.id)
          .collection("Guest")
          .orderBy("last_booking_date")
          .limit(5)
      );
    } else {
      setQuery(
        db
          .collection("Property")
          .doc(currentProperty.id)
          .collection("Guest")
          .where("keywords", "array-contains", text)
          .orderBy("last_booking_date")
          .limit(5)
      );
    }
  }, 500);

  const handlePrev = () => {
    console.log("Prev");
    setQuery(
      db
        .collection("Property")
        .doc(currentProperty.id)
        .collection("Guest")
        .orderBy("last_booking_date")
        .endBefore(firstVisibleDoc)
        .limitToLast(5)
    );
  };

  const handleNext = () => {
    console.log("Next");
    setQuery(
      db
        .collection("Property")
        .doc(currentProperty.id)
        .collection("Guest")
        .orderBy("last_booking_date")
        .startAfter(lastVisibleDoc)
        .limit(5)
    );
  };
  const handleBlur = () => {
    console.log("Blur");
  };

  return (
    <div className="propertyContainer">
      <div className="leftPusher">
        <Message
          compact
          info
          header="This is Guests page"
          content="Here you can view Guests data. Guests who has most recent bookings will be listed here. Start typing in search box for searching by name, NIC or passport number."
        ></Message>
      </div>

      <div className="propertyForm">
        <Header content="Guests" />

        <Form>
          <Form.Group widths="equal">
            <Form.Field>
              <Input
                icon={<Icon name="search" inverted circular link />}
                placeholder="Search..."
                onBlur={handleBlur}
                onChange={(e) => {
                  setSearchQueryDelayed(e.target.value);
                }}
              />
            </Form.Field>
          </Form.Group>
        </Form>

        <Segment>
          <List>
            {guestCountReturnedByQuery > 0
              ? guestsList.map((guest) => (
                  <Guest
                    key={guest.id}
                    guest={guest}
                    setShowIdViewer={setShowIdViewer}               
                    setImgData={setImgData}
                    currentProperty={currentProperty}
              
                  />
                ))
              : "No records found!"}
          </List>
          <div>
            <Button.Group basic size="mini">
              <Button
                compact
                size="mini"
                icon="left chevron"
                onClick={handlePrev}
              />

              <Button
                compact
                size="mini"
                icon="right chevron"
                onClick={handleNext}
              />
            </Button.Group>
          </div>
        </Segment>
        <IdViewer
          showIdViewer={showIdViewer}
          setShowIdViewer={setShowIdViewer}
          imgData={imgData}         
        />
      </div>
      <div className="rightPusher"></div>
    </div>
  );
};

const debounce = (func, wait, immediate) => {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};
export default Guests;
[];
