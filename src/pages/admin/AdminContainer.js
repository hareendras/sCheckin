import React, { useEffect, useState } from "react";
import Admin from "./Admin";
import { Dimmer, Loader } from "semantic-ui-react";

import { auth, db } from "./../../firebase";

const AdminContainer = () => {
  //TODO parameter newUser is passed in url
  //Read that parameter
  //If newUser is true then we check if he is a returning user
  // If returning jst show property page of admin
  // If he is a new user show user profile page

  const [currentProperty, setCurrentProperty] = useState({
    id: "",
    code: "",
    name: "",
    address: "",
    email: "",
    phone: ""
  });
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState("Property");
  const [mainError, setMainError] = useState("");
  const [mainSuccess, setMainSuccess] = useState("");  
  let user = ""
  useEffect(() => {
    try {
      let sp = new URLSearchParams(window.location.search);
      let newUser = sp.get("newUser");
      // let propertyID = sp.get("propertyID");
      let admin = sp.get("admin");

      const f = async () => {
        console.log("trying to sign in");
        return await auth.signInAnonymously();
      };

      user = f();

      auth.onAuthStateChanged(async (user) => {
        if (user) {
          // User is signed in.

          let isAnonymous = user.isAnonymous;
          let uid = user.uid;
          console.log("User signed in +", uid);
          //If the user is anonymous
          if (isAnonymous) {
            // check if he has a property for his uid

            let querySnap = await db
              .collection("Property")
              .where("admin_user", "==", uid)
              .get();

            if (!querySnap.empty) {
              // if he has, keep that in our state
              querySnap.forEach(function (doc) {
                console.log("Property" + doc.data().name);
                let property = doc.data();
                setCurrentProperty({

                  id: doc.id,
                  code: property.code,
                  name: property.name,
                  address: property.address,
                  email: property.email,
                  phone: property.phone

                });
                // and send him to register himself as a premanant user
                setActivePage("Profile");
                setLoading(false);
              });
            } else {
              // if he doesnt have property send him to property page
              setActivePage("Property");
              setLoading(false);
            }
          } else {
            //he is a permenant user. Send to booking page
            setActivePage("Bookings");
            setLoading(false);
          }

          // ...
        } else {
          // User is signed out.
          // ...
        }
      });
    } catch (error) {
      console.log("ERR " + error);
      setMainError(eror);

    }
  }, [user]);

  useEffect(() => {
    setTimeout(() => setMainSuccess(""), 10000)
  }, [mainSuccess]);

  return (
    <div>
      <Admin
        activePage={activePage}
        setActivePage={setActivePage}
        currentProperty={currentProperty}
        setCurrentProperty={setCurrentProperty}
        mainError={mainError}
        mainSuccess={mainSuccess}
        setMainError={setMainError}
        setMainSuccess={setMainSuccess}        
      />
      <Dimmer active={loading}>
        <Loader size="massive"></Loader>
      </Dimmer>
    </div>
  );
};

export default AdminContainer;
