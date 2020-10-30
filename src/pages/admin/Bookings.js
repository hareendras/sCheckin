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
  Button,
} from "semantic-ui-react";


const Bookings = () => {
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
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Date Joined</Table.HeaderCell>
              <Table.HeaderCell>E-mail</Table.HeaderCell>
              <Table.HeaderCell>Called</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>John Lilki</Table.Cell>
              <Table.Cell>September 14, 2013</Table.Cell>
              <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
              <Table.Cell>No</Table.Cell>
            </Table.Row>
           
          </Table.Body>
        </Table>
        <div>
          <Button.Group basic size="mini">
            <Button
              compact
              size="mini"
              icon="left chevron"
              onClick={() => {}}
            />

            <Button
              compact
              size="mini"
              icon="right chevron"
              onClick={() => {}}
            />
          </Button.Group>
        </div>
      </div>
      <div className="rightPusher"></div>
    </div>
  );
};

export default Bookings;
