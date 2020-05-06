import React from "react";
import DatePicker from "./DatePicker";
import {
  Form,
  label,
  Segment,
  Icon,
  Label,
  Menu,
  Table,
  Header,
  buttonProps,
} from "semantic-ui-react";
import { InputFile } from "semantic-ui-react-input-file";

const UploadBookings = () => {
  const handleUpload = () => {};
  return (
    <div className="propertyContainer">
      <div className="leftPusher"></div>
      <div className="">
        <Header content="Upload Bookings Excel from Booking.com" />
        <Segment>
          <Form>
            <Form.Group widths="equal">
              <InputFile
                button={{ ...buttonProps }}
                input={{
                  id: "input-control-id",
                  onChange: handleUpload,
                }}
              />
            </Form.Group>
          </Form>
        </Segment>
      </div>
      <div className="rightPusher"></div>
    </div>
  );
};

export default UploadBookings;
