import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

const useStyles = makeStyles((theme) => ({
  popover: {
    padding: "8px 16px 16px 16px",
    maxWidth: 200,
  },
}));

function Profile(props) {
  const [isInitial, setIsInitial] = useState(true);
  const onSingUp = () => setIsInitial(false);
  const onBack = () => setIsInitial(true);
  const classes = useStyles();
  return (
    <div className={classes.popover}>
      {isInitial && <LogIn onSignUp={onSingUp}></LogIn>}
      {!isInitial && <SignUp onBack={onBack}></SignUp>}
    </div>
  );
}

export default Profile;
