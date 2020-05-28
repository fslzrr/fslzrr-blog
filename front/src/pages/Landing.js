import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  heroText: {
    position: "absolute",
    zIndex: -1,
    left: 0,
    top: 64,
    height: "calc(30vh - 64px)",
    width: "100vw",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    marginTop: "calc(30vh - 64px)",
  },
}));

function Landing(props) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.heroText}>
        <Typography variant="h4">Welcome!</Typography>
        <Typography>This is a community to shere our knowledge.</Typography>
        <Typography>
          I invite you to add the most experienced Software Engineer as friends!
        </Typography>
        <Typography variant="caption">
          Trust me... They'll be charmed
        </Typography>
      </div>
      <div className={classes.contentContainer}>alksmd</div>
    </>
  );
}

export default Landing;
