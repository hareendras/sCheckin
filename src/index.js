import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  Divider,
  Container,
  Form,
  Header,
  Message,
  Segment,
  Input,
  Breadcrumb
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import LoginForm from "./pages/LoginForm";

const App = () => {
  const [code, setCode] = useState();

  const HandleChange = value => {
    setCode(value);
  };

  const HandleSubmit = () => {
    console.log("submit" + code);
    //handle submit
  };

  return (
    <Container>
      <Divider />
      <Segment size="massive">
        <Header as="h1" textAlign="center">
          Harry Inn self-checkin portal
        </Header>

        <MsgHeading
          main="We are super excited to have you here"
          sub="Please enter four digit number displayed in white board to continue"
        />
        <br></br>
        <LoginForm onChange={HandleChange} onSubmit={HandleSubmit} />
      </Segment>
    </Container>
  );
};

const Nav = () => (
  <div>
    <Breadcrumb size="large">
      <Breadcrumb.Section link>Home</Breadcrumb.Section>
      <Breadcrumb.Divider />
      <Breadcrumb.Section link>Store</Breadcrumb.Section>
      <Breadcrumb.Divider />
      <Breadcrumb.Section active>T-Shirt</Breadcrumb.Section>
    </Breadcrumb>{" "}
    <br />
  </div>
);

const MsgHeading = ({ main, sub, nav = false }) => {
  return (
    <div>
      <Message info size="small">
        <Message.Header>{main}</Message.Header>
        <Message.Content>{sub}</Message.Content>
      </Message>
      {nav && <Nav />}
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
