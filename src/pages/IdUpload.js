import React from "react";
import { Icon } from "semantic-ui-react";
import MessageHeading from "../../src/components/MessageHeading";
import Nav from "../../src/components/Nav";
import styles from "../css/IdUpload.css";

const IdUpload = ({ onChange, onSubmit, error }) => {
  return (
    <div>
      <MessageHeading
        main="Hello Hareendra! Please upload your ID/Passport"
        sub="Tap on camera icon to launch camera"
      />
      <br />
      <Nav />
      <br />
      <div>
        <label className="  button cameraButton">
          <Icon name="camera" size="massive" />
          <input type="file" accept="image/*;capture=camera" />
        </label>

        <div>
          Preview should go here
        </div>


      </div>
    </div>
  );
};

export default IdUpload;
