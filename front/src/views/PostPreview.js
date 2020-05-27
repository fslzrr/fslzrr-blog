import React from "react";
import moment from "moment";
import { Typography, Paper, makeStyles, Button } from "@material-ui/core";
import Markdown from "./Markdown";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 16,
    transition: "all 0.2s",
    "&:hover": {
      transform: "scale(1.01)",
    },
    "&:hover .post-title": {
      color: theme.palette.secondary.main,
    },
  },
  header: {
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
  markdownWrapper: {
    position: "relative",
    overflow: "hidden",
    maxHeight: 400,
    "&::after": {
      content: '" "',
      display: "block",
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
      background: "linear-gradient(to bottom, transparent 50%, white 100%)",
    },
  },
  readMoreButton: {
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1,
    transition: "all 0.2s",
    "&:hover": {
      transform: "scale(1.02)",
    },
  },
}));

function PostPreview(props) {
  const { title, content, updatedDate, author } = props.post;
  const date = moment(updatedDate);

  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h4" className="post-title">
          {title}
        </Typography>
        <div className={classes.info}>
          <Typography variant="caption">{author.name}</Typography>
          <span> - </span>
          <Typography variant="caption" className={classes.dateText}>
            {date.format("DD/MM/YYYY")}
          </Typography>
          <Typography variant="caption" className={classes.dateText}>
            {date.format("hh:mm A")}
          </Typography>
        </div>

        <div></div>
      </div>
      <div className={classes.markdownWrapper}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.readMoreButton}
          onClick={props.onClick}
        >
          Read More
        </Button>
        <Markdown>{content}</Markdown>
      </div>
    </Paper>
  );
}

export default PostPreview;
