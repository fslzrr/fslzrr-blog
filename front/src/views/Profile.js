import React from "react";
import { Typography, Button } from "@material-ui/core";

function Profile(props) {
  const logout = async () => {
    props.onLogOut();
  };

  return (
    <>
      <Typography>{props.user.name}</Typography>
      <Typography variant="caption">{props.user.email}</Typography>
      <p></p>
      <Button fullWidth disableElevation variant="contained" onClick={logout}>
        Log Out
      </Button>
    </>
  );
}

export default Profile;
