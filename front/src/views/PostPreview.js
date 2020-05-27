import React from "react";
import { Typography, Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 16,
    transition: "all 0.2s",
    "&:hover": {
      transform: "scale(1.01)",
      cursor: "pointer",
    },
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
}));

function PostPreview(props) {
  const classes = useStyles();
  const { title, content, updatedDate } = props.post;
  return (
    <Paper className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body1">
          {new Date(updatedDate).toLocaleString()}
        </Typography>
      </div>
      <Typography>{content}</Typography>
    </Paper>
  );
}

export default PostPreview;
