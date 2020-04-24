import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  Divider,
  Container,
  Header,
  Message,
  Segment,
  Breadcrumb,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import LoginForm from "./pages/LoginForm";
import UserListForm from "./pages/UserListForm";
import IdUpload from "./pages/IdUpload";
import Confirmation from "./pages/Confirmation";
import Firebase from "./firebase";
import "firebase/firestore";

const App = () => {
  let db = Firebase.firestore();

  const [code, setCode] = useState();
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState("login");
  const [fetchedCode, setFetchedCode] = useState();
  const [propertyName, setPropertyName] = useState();
  const [propertyID, setPropertyID] = useState();
  const [guestID, setGuestID] = useState();
  const [guestName, setGuestName] = useState();
  const [admin, setAdmin] = useState();

  //LoginForm -- Guest
  const HandleChange = (value) => {
    setCode(value);
  };
  const HandleSubmit = () => {
    if (code === "") {
      setError("Can't be blank!!");
      return;
    }
    console.log("fetchedCode " + fetchedCode + " code " + code);
    if (fetchedCode == code) {
      setCurrentPage("home");
    } else {
      setError("Wrong code. Try again");
    }
  }; ////////////

  //UserListForm -- Guest
  const userOnClick = (guestID,name) => {
    setGuestID(guestID);
    setGuestName(name);
    console.log("Index userOnClick "+guestID,guestName);
    setCurrentPage("IdUpload");
  }; ///////////

  // idUpload -- Guest
  const onclickBack = () => {
    setCurrentPage("home");
  };

  const onclickContinue = () => {
    setCurrentPage("confirmation");
  };

  /////////

  useEffect(() => {
    console.log("effect");
    let sp = new URLSearchParams(window.location.search);
    let propertyID = sp.get("propertyID");
    setAdmin(sp.get("admin"));
    setPropertyID(propertyID);
    console.log(admin, propertyID);

    if (admin === "false") {
      const f = async () => {
        const snapshot = await db.collection("Property").doc(propertyID).get();
        const data = snapshot.data();
        console.log("NAME " + data.name);
        console.log("CODE " + data.code);
        setFetchedCode(data.code);
        setPropertyName(data.name);
      };
      f();
    }
  }, [admin]);


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
        return (
          <UserListForm userOnClick={userOnClick} propertyID={propertyID} />
        );
      case "IdUpload":
        return (
          <IdUpload
            propertyID={propertyID}
            guestID={guestID}
            guestName= {guestName}
            onclickBack={onclickBack}
            onclickContinue={onclickContinue}
          />
        );
      case "confirmation":
        return <Confirmation guestID={guestID} propertyID={propertyID} />;
    }
  };



  return admin === "true" ? (
    <div>TODO admin app</div>
  ) : (
    <Container>
      <Divider />
      <Segment size="massive">
        <Header as="h1" textAlign="center">
          {propertyName} self-checkin portal
        </Header>
        {renderUI()}

        {/*  <UserListForm/> */}
        {/* <IdUpload />  */}
        {/*<Confirmation />*/}
      </Segment>
    </Container>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
