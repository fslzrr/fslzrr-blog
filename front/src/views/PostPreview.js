import React from "react";
import { Typography, Paper, makeStyles } from "@material-ui/core";
import moment from "moment";

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
  dateContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  dateText: {
    lineHeight: "unset",
    fontSize: "0.5rem",
  },
  contentText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    lineClamp: 5 /* number of lines to show */,
    boxOrient: "vertical",
  },
}));

function PostPreview(props) {
  const { title, content, updatedDate } = props.post;
  const date = moment(updatedDate);

  const classes = useStyles();
  return (
    <Paper onClick={props.onClick} className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h5">{title}</Typography>
        <div className={classes.dateContainer}>
          <Typography variant="overline" className={classes.dateText}>
            {date.format("DD/MM/YYYY")}
          </Typography>
          <Typography variant="overline" className={classes.dateText}>
            {date.format("hh:mm a")}
          </Typography>
        </div>
      </div>
      <Typography className={classes.contentText}>{content}</Typography>
    </Paper>
  );
}

export default PostPreview;
