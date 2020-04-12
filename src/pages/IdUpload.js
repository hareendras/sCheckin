import React from "react";
import { Icon, Form, Button } from "semantic-ui-react";
import MessageHeading from "../../src/components/MessageHeading";
import styles from "../css/IdUpload.css";

const IdUpload = ({ onclickBack,onSubmit, error }) => {
  return (
    <div>
      <MessageHeading
        main="Hello Hareendra! Please upload your ID/Passport"
        sub="Tap on camera icon to launch camera"
      />
      <br />

      <br />

      <Form onSubmit={onSubmit}>
        {error && <span style={{ color: "red" }}>{error}</span>}

        <label className="  button cameraButton ">
          <div className="flexContainer">
            <Icon name="camera" size="massive" />
          </div>
          <input type="file" accept="image/*;capture=camera" />
        </label>
        <br />
        <br />

        <div className="btnFlexContainer">
          <Button content="<<Back" onClick={onclickBack}/>
          <Button content="Continue" />
        </div>
      </Form>
    </div>
  );
};

export default IdUpload;
