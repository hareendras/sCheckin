import React from "react";
import { Header, Container, Menu } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const TopNav = ({ setActivePage }) => {
  return (
    <Container>
      <Header as="h3" content="EasyCheckin.com Admin app" textAlign="center" />

      <Menu stackable inverted >
        <Menu.Item>
          {/*<img src="/logo.png" />(/)*/}
        </Menu.Item>
        <Menu.Item onClick={() => setActivePage("Property")}>
          Property
        </Menu.Item>
        <Menu.Item onClick={() => setActivePage("Bookings")}>
          Bookings
        </Menu.Item>
        <Menu.Item onClick={() => setActivePage("UploadBookings")} >
          Upload Bookings
        </Menu.Item>
        <Menu.Item onClick={() => setActivePage("Guests")}>Guests</Menu.Item>
        <Menu.Item onClick={() => setActivePage("Managers")}>Managers</Menu.Item>
        <Menu.Item onClick={() => setActivePage("Profile")}>Your Profile</Menu.Item>
      </Menu>
    </Container>
  );
};

export default TopNav;
