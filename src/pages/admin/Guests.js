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
import GuestEditor from "./GuestEditor";

const Guests = ({ setMainError, currentProperty, setMainInfo }) => {
  const [RECORD_LIMIT, setRECORD_LIMIT] = useState(10);
  const [query, setQuery] = useState(
    db
      .collection("Property")
      .doc(currentProperty.id)
      .collection("Guest")
      .orderBy("last_booking_date")
      .limit(RECORD_LIMIT)
  );
  const [firstVisibleDoc, setFirstVisibleDoc] = useState({});
  const [lastVisibleDoc, setLastVisibleDoc] = useState({});
  const [guestsList, setGuestsList] = useState([]);
  const [guestCountReturnedByQuery, setguestCountReturnedByQuery] = useState(0);
  const [showIdViewer, setShowIdViewer] = useState(false);
  const [showGuestEditor, setShowGuestEditor] = useState(false);
  const [imgData, setImgData] = useState();
  const [selectedGuest, setSelectedGuest] = useState({});

  useEffect(() => {
    const f = async () => {
      try {
        let docSnapshots = await query.get();
        console.log("is empty" + docSnapshots.empty);

        //    if (!docSnapshots.empty) {
        let guestsList1 = [];
        setLastVisibleDoc(docSnapshots.docs[docSnapshots.docs.length - 1]);
        setFirstVisibleDoc(docSnapshots.docs[0]);
        setguestCountReturnedByQuery(docSnapshots.docs.length);

        docSnapshots.forEach((doc) => {
          let data = doc.data();
          guestsList1.push({
            id: doc.id,
            name: data.name,
            nic: data.nic,
            address: data.address,
            email: data.email,
            phone: data.phone,
          });
        });
        setGuestsList(guestsList1);
        //   } else {
        //   setguestCountReturnedByQuery(0);
        //}
      } catch (error) {
        setguestCountReturnedByQuery(docSnapshots.docs.length);
      }
    };
    f();
  }, [query, showGuestEditor]);

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
          .limit(RECORD_LIMIT)
      );
    } else {
      setQuery(
        db
          .collection("Property")
          .doc(currentProperty.id)
          .collection("Guest")
          .where("keywords", "array-contains", text.toLowerCase())
          .orderBy("last_booking_date")
          .limit(RECORD_LIMIT)
      );
    }
  }, 500);

  const handlePrev = () => {
    if (firstVisibleDoc) {
      console.log("Prev");
      setQuery(
        db
          .collection("Property")
          .doc(currentProperty.id)
          .collection("Guest")
          .orderBy("last_booking_date")
          .endBefore(firstVisibleDoc)
          .limitToLast(RECORD_LIMIT)
      );
    } else {
      setQuery(
        db
          .collection("Property")
          .doc(currentProperty.id)
          .collection("Guest")
          .orderBy("last_booking_date")
          .limitToLast(RECORD_LIMIT)
      );
    }
  };

  const handleNext = () => {
    console.log("Next");
    if (lastVisibleDoc) {
      setQuery(
        db
          .collection("Property")
          .doc(currentProperty.id)
          .collection("Guest")
          .orderBy("last_booking_date")
          .startAfter(lastVisibleDoc)
          .limit(RECORD_LIMIT)
      );
    } else {
      setQuery(
        db
          .collection("Property")
          .doc(currentProperty.id)
          .collection("Guest")
          .orderBy("last_booking_date")
          .limitToLast(RECORD_LIMIT)
      );
    }
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
          content="Here you can view Guests data. Guests who has most recent bookings will be listed here. Start typing in search box for searching by name."
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
                    setMainInfo={setMainInfo}
                    setShowGuestEditor={setShowGuestEditor}
                    setSelectedGuest={setSelectedGuest}
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
        {/*<IdViewer
          showIdViewer={showIdViewer}
          setShowIdViewer={setShowIdViewer}
          imgData={imgData}
        />*/}

        {showGuestEditor && (
          <GuestEditor
            showGuestEditor={showGuestEditor}
            setShowGuestEditor={setShowGuestEditor}
            imgData={imgData}
            selectedGuest={selectedGuest}
            currentProperty={currentProperty}
            setQuery={setQuery}
            setMainInfo={setMainInfo}
          />
        )}
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
