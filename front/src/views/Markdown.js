import React from "react";
import ReactMarkdown from "react-markdown";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  markdown: {
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily,
    "& > h1, & > h2": {
      fontWeight: 400,
    },
    "& > h3, & > h4, & > h5": {
      fontWeight: 400,
    },
    "& > h6": {
      fontWeight: 400,
    },
    "& > p": {
      fontWeight: 400,
    },
    "& > pre": {
      position: "relative",
      marginLeft: -16,
      marginRigth: -16,
      padding: 16,
      backgroundColor: theme.palette.grey[200],
    },
    "& > p > code": {
      position: "relative",
      margin: 0,
      padding: 8,
      backgroundColor: theme.palette.grey[200],
    },
  },
}));

function Markdown(props) {
  const classes = useStyles();
  return (
    <ReactMarkdown
      source={props.children}
      className={classes.markdown}
    ></ReactMarkdown>
  );
}

export default Markdown;
