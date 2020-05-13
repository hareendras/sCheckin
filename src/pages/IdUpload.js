import React, { useState } from "react";
import { Icon, Form, Button } from "semantic-ui-react";
import MessageHeading from "../../src/components/MessageHeading";
import { ImageCompressor } from "image-compressor";
import { storage } from "./../firebase";
import styles from "../css/idUpload.css";

const IdUpload = ({
  onclickBack,
  onclickContinue,
  propertyID,
  guestID,
  guestName,

}) => {
  const [imgURL, setImgURL] = useState();
  const [error, setError] = useState();

  const handleImgUpd = async (event) => {
    try {
      const file = event.target.files[0];
      const url = await readURL(file);
      const compressedDataURL = await compressImg(url);
      setImgURL(compressedDataURL);
    }
    catch (error) {
      setError("Woops something went wrong " + error)
    }
  };

  const readURL = (file) => {
    try {
      return new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = (e) => res(e.target.result);
        reader.onerror = (e) => rej(e);
        reader.readAsDataURL(file);
      });
    } catch (error) {
      setError("Woops something went wrong " + error)
    }

  };

  const compressImg = (dataURL) => {
    return new Promise((resolve, reject) => {
      try {
        const imageCompressor = new ImageCompressor();
        const compressorSettings = {
          // toWidth : 720 ,
          toHeight: 720,
          mimeType: "image/jpeg",
          mode: "strict",
          quality: 0.6,
          grayScale: false,
          sepia: false,
          threshold: false,
          vReverse: false,
          hReverse: false,
          speed: "low",
        };
        const proceedCompressedImage = (processed) => {
          resolve(processed);
        };
        imageCompressor.run(dataURL, compressorSettings, proceedCompressedImage);
      } catch (error) {
        reject(error);
        setError("Woops something went wrong " + error)
      }

    });
  };

  const handleClickContine = async () => {
    try {
      let storageRef = storage.ref();
      let imagesRef = storageRef.child(propertyID);
      let fileName = `${guestID}.jpg`;
      let spaceRef = imagesRef.child(fileName);
      spaceRef.putString(imgURL, "data_url");
      onclickContinue();
    } catch (error) {
      setError("Woops something went wrong " + error)
    }
  };

  return (
    <div>
      {!imgURL && (
        <MessageHeading
          main={`Hello ${guestName}! Let's upload a snap of your ID/Passport`}
          sub="Tap on camera icon to launch camera"
        />
      )}

      {imgURL && (
        <MessageHeading
          main={`Hello ${guestName}. Awesome snap!`}
          sub="Let's continue"
        />
      )}
      <br />
      <br />
      <Form>
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
          <Button content="<<Back  " onClick={onclickBack} />
          <Button content="Continue" onClick={handleClickContine} />
        </div>
      </Form>
    </div>
  );
};

export default IdUpload;
