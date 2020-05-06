import React from "react";
import {
  Button,
  Checkbox,
  Form,
  Container,
  Segment,
  Table,
  Menu,
  Message,
  Icon,
  Header,
} from "semantic-ui-react";
import "./css/styles.css";

const Managers = () => (
  <div className="propertyContainer">
    <div className="leftPusher">
      <Message
        compact
        info
        header="This is Managers page"
        content="This is where you enter your Manager's details"
      ></Message>
    </div>
    <div className="propertyForm">
      <Header content="Manager Details" />
      <Segment>
        <Form>
          <Form.Field>
            <label>Manager Name</label>
            <input placeholder="Property" />
          </Form.Field>
          <Form.Field>
            <label>Adress</label>
            <input placeholder="Adress" />
          </Form.Field>
          <Form.Field>
            <label>E-mail</label>
            <input placeholder="E-mail" />
          </Form.Field>
          <Form.Field>
            <label>Phone</label>
            <input placeholder="Phone" />
          </Form.Field>
          <div className="propertyNameBtnSubmit">
            <Button type="submit">Save</Button>{" "}
          </div>
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

export default Managers;
