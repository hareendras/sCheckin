import React, { useState } from "react";
import { Container, Message } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import TopNav from "./TopNav";
import PropertyContainer from "./PropertyContainer";
import BookingsContainer from "./BookingsContainer";
import GuestsContainer from "./GuestsContainer";
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
  error,
}) => {
  const renderActivePage = () => {
    console.log("Sdsds" + activePage);
    switch (activePage) {
      case "Property":
        return (
          <PropertyContainer>
            <Property
              currentProperty={currentProperty}
              setCurrentProperty={setCurrentProperty}
            />
          </PropertyContainer>
        );
      case "Bookings":
        return <BookingsContainer />;
      case "Guests":
        return <GuestsContainer />;
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
      {error && <Message error>Ooopzy</Message>}
      {renderActivePage()}
    </Container>
  );
};

export default Admin;
