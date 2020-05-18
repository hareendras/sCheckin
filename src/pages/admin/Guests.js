import React from "react";
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

const Item = ({ item }) => {
  return (
    <List.Item>
      <List.Content>
        <List.Header as="a">Daniel Louise</List.Header>
        <List.Description>
          NIC: 852544520v Address: No 340 Dalupotha Negombo Phone: 0715249388
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

const Guests = () => {
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
        <Segment>
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
        </Segment>
        <Segment>
          <List>
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
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
