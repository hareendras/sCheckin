import React, { useState } from "react";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import TopNav from "./TopNav";
import PropertyContainer from "./PropertyContainer";
import BookingsContainer from "./BookingsContainer";
import GuestsContainer from "./GuestsContainer";
import "./css/styles.css";
import UploadBookingsContainer from "./UploadBookingContainer";
import ManagersContainer from "./ManagersContainer";
import ProfileContainer from "./ProfileContainer";

export const Admin = () => {
  const [activePage, setActivePage] = useState("Property");

  const renderActivePage = () => {
    console.log("Sdsds" + activePage);
    switch (activePage) {
      case "Property":
        return <PropertyContainer />;
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
      {renderActivePage()}
    </Container>
  );
};

export default Admin;
