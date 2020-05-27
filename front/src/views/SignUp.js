import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { post } from "../hooks/useRequest";

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: -12,
  },
}));

function SignUp(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onValueChange = (set) => (event) => set(event.target.value.trim());

  const signup = async () => {
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password === "" ||
      confirmPassword === ""
    )
      return;
    if (password !== confirmPassword) return;
    const res = await post("/user", {}, { name, email, password });
  };

  const classes = useStyles();
  return (
    <>
      <div className={classes.titleContainer}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="back"
          onClick={props.onBack}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography>Sign Up</Typography>
      </div>
      <TextField
        autoFocus
        fullWidth
        margin="dense"
        id="name"
        label="Name"
        onChange={onValueChange(setName)}
      />
      <TextField
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
      <TextField
        fullWidth
        margin="dense"
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        onChange={onValueChange(setConfirmPassword)}
      />
      <p></p>
      <Button
        fullWidth
        disableElevation
        variant="contained"
        color="secondary"
        onClick={signup}
      >
        Create Account
      </Button>
    </>
  );
}

export default SignUp;
