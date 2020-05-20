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
  Pagination,
} from "semantic-ui-react";
import { db } from "./../../firebase";

const Guest = ({ guest }) => {
  return (
    <List.Item>
      <List.Content>
        <List.Header as="a">{guest.name}</List.Header>
        <List.Description>
          <List.Content floated="right">
            <Icon link name="eye" />
            <Icon link name="edit" />
            <Icon link name="user delete" />
          </List.Content>
        </List.Description>
      </List.Content>
    </List.Item>
  );
};

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

  useEffect(() => {
    const f = async () => {
      try {
        console.log("above to fire query");
        console.log("current proeprty", currentProperty.id);
        let docSnapshots = await query.get();
        console.log("is empty" + docSnapshots.empty);

        if (!docSnapshots.empty) {
          let guestsList1 = [];
          setLastVisibleDoc(docSnapshots.docs[docSnapshots.docs.length - 1]);
          setFirstVisibleDoc(docSnapshots.docs[0]);
          docSnapshots.forEach((doc) => {
            console.log(doc);
            guestsList1.push({ id: doc.id, name: doc.data().name });
          });
          setGuestsList(guestsList1);
        }
      } catch (error) {
        setMainError(error);
      }
    };
    f();
  }, [query]);

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
              />
            </Form.Field>
          </Form.Group>
        </Form>

        <Segment>
          <List>
            {guestsList.map((guest) => (
              <Guest key={guest.id} guest={guest} />
            ))}
          </List>
          <Pagination
            defaultActivePage={1}
            firstItem={null}
            lastItem={null}
            pointing
            secondary
            totalPages={3}
          />
        </Segment>
      </div>
      <div className="rightPusher"></div>
    </div>
  );
};

export default Guests;
