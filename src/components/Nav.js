import React from "react";
import {  Breadcrumb } from "semantic-ui-react";

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

  export default Nav;