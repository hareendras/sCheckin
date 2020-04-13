import React, { useState } from "react";
import { Icon, Form, Button } from "semantic-ui-react";
import MessageHeading from "../../src/components/MessageHeading";
import styles from "../css/IdUpload.css";

const IdUpload = ({ onclickBack, onclickContinue, onSubmit, error }) => {
  const [imgURL, setImgURL] = useState();

  const handleImgUpd = async event => {
    const file = event.target.files[0];
    const url = await readURL(file);
    setImgURL(url);
  };

  const readURL = file => {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = e => res(e.target.result);
      reader.onerror = e => rej(e);
      reader.readAsDataURL(file);
    });
  };

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

        {!imgURL && (
          <label className="  button cameraButton ">
            <div className="flexContainer">
              <Icon name="camera" size="massive" />
            </div>
            <input
              type="file"
              accept="image/*;capture=camera"
              onChange={handleImgUpd}
            />
          </label>
        )}

        {imgURL && <img className="resImage" src={imgURL} />}
        <br />
        <br />

        <div className="btnFlexContainer">
          <Button content="<<Back" onClick={onclickBack} />
          <Button content="Continue" onClick={onclickContinue} />
        </div>
      </Form>
    </div>
  );
};

export default IdUpload;
