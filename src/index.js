import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
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
import UserListForm from "./pages/UserListForm";
import IdUpload from "./pages/IdUpload";
import Confirmation from "./pages/Confirmation";
import { resolve, async } from "q";

const App = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState("login");
  const [fetchedCode, setFetchedCode] = useState();

  const HandleChange = value => {
    setCode(value);
  };

  const HandleSubmit = () => {
    if (code === "") {
      setError("Can't be blank!!");
      return;
    }
    if (fetchedCode === code) {
      setCurrentPage("home");
    } else {
      setError("Wrong code. Try again");
    }
  };

  const userOnClick = user => {
    setCurrentPage("IdUpload");
  };

  const renderUI = () => {
    console.log("render Ui" + currentPage);
    switch (currentPage) {
      case "login":
        return (
          <LoginForm
            error={error}
            onChange={HandleChange}
            onSubmit={HandleSubmit}
          />
        );
      case "home":
        return <UserListForm userOnClick={userOnClick} />;
      case "IdUpload":
        return <IdUpload />;
    }
  };

  useEffect(() => {
    console.log("effect");
    const f = async () => {
      let result = await axios.get(
        "https://www.hpb.health.gov.lk/api/get-current-statistical"
      );
      //console.log("new case" + Object.values(result.data)[2].global_new_cases);
      setFetchedCode("1234");
    };
    f();
  }, []);

  return (
    <Container>
      <Divider />
      <Segment size="massive">
        <Header as="h1" textAlign="center">
          Harry Inn self-checkin portal
        </Header>
        {renderUI()}

        {/*  <UserListForm/> */}
        {/* <IdUpload /> */}
        {/*<Confirmation />*/}
      </Segment>
    </Container>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
