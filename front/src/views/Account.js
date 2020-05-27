import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import Profile from "./Profile";
import AuthContext from "../contexts/authContext";

const useStyles = makeStyles((theme) => ({
  popover: {
    padding: "8px 16px 16px 16px",
    maxWidth: 200,
  },
}));

function Account(props) {
  const [isInitial, setIsInitial] = useState(true);
  const onSingUp = () => setIsInitial(false);
  const onBack = () => setIsInitial(true);
  const classes = useStyles();
  return (
    <div className={classes.popover}>
      <AuthContext.Consumer>
        {(auth) => {
          return (
            <>
              {!auth.user && isInitial && (
                <LogIn onSignUp={onSingUp} onLoggedIn={auth.setAuth}></LogIn>
              )}
              {!auth.user && !isInitial && (
                <SignUp
                  onBack={onBack}
                  onLoggedIn={(token, user) => {
                    auth.setAuth(token, user);
                    onBack();
                  }}
                ></SignUp>
              )}
              {auth.user && (
                <Profile user={auth.user} onLogOut={auth.clearAuth}></Profile>
              )}
            </>
          );
        }}
      </AuthContext.Consumer>
    </div>
  );
}

export default Account;
