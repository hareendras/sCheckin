import React from "react";
import { Table } from "semantic-ui-react";

export default function Booking({ Booking }) {
  return (
    <Table.Row>
      <Table.Cell>{Booking.checkin_date}</Table.Cell>
      <Table.Cell>{Booking.name}</Table.Cell>
      <Table.Cell>{Booking.phone}</Table.Cell>
    </Table.Row>
  );
}
