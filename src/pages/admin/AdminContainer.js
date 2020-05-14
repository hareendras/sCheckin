import React, { useEffect } from "react";
import Admin from "./Admin";
import { auth } from "./../../firebase";

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
     // let propertyID = sp.get("propertyID");
      let admin = sp.get("admin");
      let user = f();
             
      
      
      
      auth.onAuthStateChanged((user)=>  {
        if (user) {
          // User is signed in.
          let isAnonymous = user.isAnonymous;
          let uid = user.uid;

          //If the user is anonymous           
      
      
      
      
          console.log("User signed in +" + uid);
          // ...
        } else {
          // User is signed out.
          // ...
        }
      });
      const f = async () => {
        console.log("trying to sign in");
        return (await auth.signInAnonymously());
      };      
    

    } catch (error) {
      console.log("ERR " + error);
    }
  }, []);

  return <Admin />;
};

export default AdminContainer;
