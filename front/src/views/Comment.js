import React from "react";
import moment from "moment";
import { Typography, makeStyles, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "8px 16px 16px 16px",
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

function Comment(props) {
  const { author, content, createdDate } = props.comment;
  const date = moment(createdDate);
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <div className={classes.titleContainer}>
        <Typography>{author.name}</Typography>
        <Typography variant="overline" color="textSecondary">
          {date.format("DD/MM/YYYY hh:mm a")}
        </Typography>
      </div>
      <Typography color="textSecondary">{content}</Typography>
    </Paper>
  );
}

export default Comment;
