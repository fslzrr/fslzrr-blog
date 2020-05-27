import React, { useState } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { post } from "../hooks/useRequest";

function LogIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onValueChange = (set) => (event) => set(event.target.value.trim());

  const login = async () => {
    if (email.trim() === "" || password === "") return;
    const res = await post("/auth/login", {}, { email, password });
    const { token, user } = res.data;
    props.onLoggedIn(token, user);
  };

  return (
    <>
      <Typography>Log In</Typography>
      <TextField
        autoFocus
        fullWidth
        margin="dense"
        id="email"
        label="Email"
        type="email"
        onChange={onValueChange(setEmail)}
      />
      <TextField
        fullWidth
        margin="dense"
        id="password"
        label="Password"
        type="password"
        onChange={onValueChange(setPassword)}
      />
      <p></p>
      <Button
        fullWidth
        disableElevation
        variant="contained"
        color="secondary"
        onClick={login}
      >
        Log In
      </Button>
      <p></p>
      <Button
        fullWidth
        disableElevation
        variant="contained"
        color="primary"
        onClick={props.onSignUp}
      >
        Sign Up
      </Button>
    </>
  );
}

export default LogIn;
