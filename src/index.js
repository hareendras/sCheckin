import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  Divider,
  Container,
  Header,
  Segment,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import LoginForm from "./pages/LoginForm";
import UserListForm from "./pages/UserListForm";
import IdUpload from "./pages/IdUpload";
import Confirmation from "./pages/Confirmation";
import Done from "./pages/Done";
import { db, auth } from "./firebase";
import AdminContainer from "./pages/admin/AdminContainer";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState();
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState("login");
  const [fetchedCode, setFetchedCode] = useState();
  const [propertyName, setPropertyName] = useState();
  const [propertyID, setPropertyID] = useState();
  const [guestID, setGuestID] = useState();
  const [guestName, setGuestName] = useState();
  const [admin, setAdmin] = useState();
  const [userID, setUserID] = useState();

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
  const userOnClick = async (guestID, name) => {
    setGuestID(guestID);
    setGuestName(name);
    console.log("Index userOnClick " + guestID, guestName);
    try {
      let fetchedUserId = await db
        .collection("Property")
        .doc(propertyID)
        .collection("Guest")
        .doc(guestID)
        .get();
      console.log("fetched userid " + fetchedUserId.data().userID);
      console.log("User id  " + userID);
      // If the current user is already a guest, skip id upload page
      if (userID == fetchedUserId.data().userID) {
        setCurrentPage("confirmation");
      } else {
        setCurrentPage("IdUpload");
      }
    } catch (error) {
      console.error("index.js line 91" + error);
      setError("Woops error occured!!! Please scan the QR code and try again");
    }
  }; ///////////

  // idUpload -- Guest
  const onclickBack = () => {
    setCurrentPage("home");
  };

  const onclickContinue = () => {
    setCurrentPage("confirmation");
  };

  /////////

  // confirmation page
  const done = () => {
    setCurrentPage("done");
  };
  //////

  useEffect(() => {
    console.log("effect");
    let sp = new URLSearchParams(window.location.search);
    let propertyID = sp.get("propertyID");
    setAdmin(sp.get("admin"));
    setPropertyID(propertyID);
    console.log(admin, propertyID);

    if (admin === "false") {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          // User is signed in.
          let isAnonymous = user.isAnonymous;
          let uid = user.uid;
          setUserID(uid);
          console.log("User signed in +" + uid);
          // ...
        } else {
        }
        // ...
      });

      const f = async () => {
        try {
          console.log("trying to sign in");
          await auth.signInAnonymously();
          const snapshot = await db
            .collection("Property")
            .doc(propertyID)
            .get();
          const data = snapshot.data();
          //console.log("NAME " + data.name);
          //console.log("CODE " + data.code);
          setLoading(false);
          setFetchedCode(data.code);
          setPropertyName(data.name);
        } catch (err) {
          setLoading(false);
          console.error("index.js line 91" + err);
          setError(
            "Woops error occured!!! Please scan the QR code and try again"
          );
        }
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
          <UserListForm
            userOnClick={userOnClick}
            propertyID={propertyID}
            setLoading={setLoading}
          />
        );
      case "IdUpload":
        return (
          <IdUpload
            propertyID={propertyID}
            guestID={guestID}
            guestName={guestName}
            onclickBack={onclickBack}
            onclickContinue={onclickContinue}
          />
        );
      case "confirmation":
        return (
          <Confirmation
            guestID={guestID}
            guestName={guestName}
            propertyID={propertyID}
            setLoading={setLoading}
            userID={userID}
            done={done}
          />
        );
      case "done":
        return <Done />;
    }
  };

  return admin === "true" ? (
    <AdminContainer />
  ) : (
    <Container>
      <Divider />
      <Segment size="massive">
        <Header as="h1" textAlign="center">
          {propertyName} self-checkin portal
        </Header>
        {renderUI()}
      </Segment>
      <Dimmer active={loading}>
        <Loader size="massive"></Loader>
      </Dimmer>
    </Container>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
