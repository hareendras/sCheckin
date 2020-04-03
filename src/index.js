import React from "react";
import ReactDOM from "react-dom";
import {
  Divider,
  Container,
  Form,
  Header,
  Message,
  Segment,
  Input
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

class App extends React.Component {
  render() {
    return (
      <Container>
        <Divider />
        <Segment size="massive">
          <Header as="h1" textAlign="center">
            Harry Inn self-checkin portal
          </Header>
          <Message info size="small">
            <Message.Header>Verify you are at property</Message.Header>
            <Message.Content>
              Please verify that you are at the property by entering the four
              digit code displayed
            </Message.Content>
          </Message>
          <Form>
            <Form.Field>
              <Input fluid placeholder="Enter four digit code" size="massive" />
            </Form.Field>
            <Form.Button content="Verify" />
          </Form>
        </Segment>
      </Container>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
