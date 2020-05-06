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
  Message
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
    </div>
      
      <div className="propertyForm">
        <Header content="Bookings" />
        <Segment>
          <Form>
            <Form.Group widths="equal">
              <Form.Field>
                <label>From</label>
                <DatePicker />
              </Form.Field>
              <Form.Field>
                <label>To</label>
                <DatePicker />
              </Form.Field>
            </Form.Group>
          </Form>
        </Segment>
        <Segment>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Header</Table.HeaderCell>
                <Table.HeaderCell>Header</Table.HeaderCell>
                <Table.HeaderCell>Header</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>First</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
              </Table.Row>
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="3">
                  <Menu floated="right" pagination>
                    <Menu.Item as="a" icon>
                      <Icon name="chevron left" />
                    </Menu.Item>
                    <Menu.Item as="a">1</Menu.Item>
                    <Menu.Item as="a">2</Menu.Item>
                    <Menu.Item as="a">3</Menu.Item>
                    <Menu.Item as="a">4</Menu.Item>
                    <Menu.Item as="a" icon>
                      <Icon name="chevron right" />
                    </Menu.Item>
                  </Menu>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Segment>
      </div>
      <div className="rightPusher"></div>
    </div>
  );
};

export default Bookings;
