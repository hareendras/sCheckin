import React, { useEffect } from "react";
import Admin from "./Admin";

export const AdminContainer = () => {

  //TODO parameter newUser is passed in url
  //Read that parameter
  //If newUser is true then we check if he is a returning user
  // If returning jst show property page of admin
  // If he is a new user show user profile page

  useEffect(() => {
    try {
      let sp = new URLSearchParams(window.location.search);
      let newUser = sp.get("newUser");

      auth.onAuthStateChanged(function (user) {
        if (user) {
          // User is signed in.
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          console.log("User signed in +" + uid);
          // ...
        } else {          // User is signed out.
          // ...      

        }
      });
      const f = async () => {
        console.log("trying to sign in");
        await auth.signInAnonymously();
      };
      f();
    } catch (error) {


    }


  }, []);

  return <Admin />;


};

export default AdminContainer;
