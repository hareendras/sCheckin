import React, { useState } from "react";
import { Container, Message } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import TopNav from "./TopNav";
import PropertyContainer from "./PropertyContainer";
import Bookings from "./Bookings";
import Guests from "./Guests";
import "./css/styles.css";
import UploadBookingsContainer from "./UploadBookingContainer";
import ManagersContainer from "./ManagersContainer";
import ProfileContainer from "./ProfileContainer";
import Property from "./Property";

const Admin = ({
  activePage,
  setActivePage,
  currentProperty,
  setCurrentProperty,
  mainError,
  mainSuccess,
  setMainError,
  setMainSuccess,
  mainInfo,
  setMainInfo,
}) => {
  const renderActivePage = () => {
    console.log("Sdsds" + activePage);
    switch (activePage) {
      case "Property":
        return (
          <Property
            currentProperty={currentProperty}
            setCurrentProperty={setCurrentProperty}
            setMainError={setMainError}
            setMainSuccess={setMainSuccess}
          />
        );
      case "Bookings":
        return <Bookings currentProperty={currentProperty} />;
      case "Guests":
        return (
          <Guests
            setMainError={setMainError}
            setMainInfo={setMainInfo}
            currentProperty={currentProperty}
            setMainInfo={setMainInfo}
          />
        );
      case "UploadBookings":
        return <UploadBookingsContainer />;
      case "Managers":
        return <ManagersContainer />;
      case "Profile":
        return <ProfileContainer />;

      default:
        return <PropertyContainer />;
    }
  };

  return (
    <Container className={"MainContainer"}>
      <TopNav setActivePage={setActivePage} />
      {mainError && <Message error>{mainError}</Message>}
      {mainSuccess && <Message success>{mainSuccess}</Message>}
      {mainInfo && <Message warning>{mainInfo}</Message>}
      {renderActivePage()}
    </Container>
  );
};

export default Admin;
