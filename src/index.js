import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  Divider,
  Container,
  Header,
  Message,
  Segment,
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

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
