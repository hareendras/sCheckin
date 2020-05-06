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
} from "semantic-ui-react";

const Guests = () => {
  return (
    <div className="propertyContainer">
      <div className="leftPusher">
        <Message
          compact
          info
          header="This is Guests page"
          content="Here you can view Guests data. "
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

export default Guests;
