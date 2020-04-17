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
import { SSL_OP_SINGLE_DH_USE } from "constants";

const App = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState("login");
  const [fetchedCode, setFetchedCode] = useState();
  const [property, setProperty] = useState();
  const [admin, setAdmin] = useState(false);

  //LoginForm
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
  }; ////////////

  //UserListForm
  const userOnClick = user => {
    setCurrentPage("IdUpload");
  }; ///////////

  // idUpload
  const onclickBack = () => {
    setCurrentPage("home");
  };

  const onclickContinue = () => {
    setCurrentPage("confirmation");
  };

  /////////

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
        return (
          <IdUpload
            onclickBack={onclickBack}
            onclickContinue={onclickContinue}
          />
        );
      case "confirmation":
        return <Confirmation />;
    }
  };

  useEffect(() => {
    console.log("effect");
    let sp = new URLSearchParams(window.location.search);
    let admin = sp.get("admin");
    let property = sp.get("property");

    console.log(admin, property);

    if (!admin) {
      const f = async () => {
        // let result = await axios.get(
        //   "https://www.hpb.health.gov.lk/api/get-current-statistical"
        // );
        //console.log("new case" + Object.values(result.data)[2].global_new_cases);

        // TODO
        // Fetch four digint code
        // Fetch property name

        setFetchedCode("1234");
        setProperty("Harry Inn");
      };
      f();
    }
  }, [admin]);

  return !admin ? (
    <Container>
      <Divider />
      <Segment size="massive">
        <Header as="h1" textAlign="center">
          {property} self-checkin portal
        </Header>
        {renderUI()}

        {/*  <UserListForm/> */}
        {/* <IdUpload />  */}
        {/*<Confirmation />*/}
      </Segment>
    </Container>
  ) : (
    <div>sdsdsd</div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
