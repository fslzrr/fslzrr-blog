import React from "react";
import moment from "moment";
import { Typography, IconButton, makeStyles, Paper } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useRequest } from "../hooks/useRequest";
import Comment from "../views/Comment";

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    display: "flex",
    marginBottom: 16,
  },
  back: {
    color: "white",
  },
  titleTextContainer: {
    color: "white",
  },
  date: {
    lineHeight: "unset",
  },
  contentContainer: {
    padding: 16,
    marginBottom: 16,
  },
  titleComments: {
    marginBottom: 16,
  },
}));

function Detail(props) {
  const post = useRequest("get", `/post/${props._id}`);

  const classes = useStyles();
  if (!post) return <></>;
  const date = moment(post.updatedDate);
  return (
    <>
      <div className={classes.titleContainer}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="back"
          onClick={props.onBack}
          className={classes.back}
        >
          <ArrowBackIcon />
        </IconButton>
        <div className={classes.titleTextContainer}>
          <Typography variant="h4">{post.title}</Typography>
          <Typography variant="caption" className={classes.date}>
            Last Updated - {date.format("DD/MM/YYYY hh:mm A")}
          </Typography>
        </div>
      </div>
      <Paper className={classes.contentContainer}>{post.content}</Paper>
      <Typography variant="h5" className={classes.titleComments}>
        Comments
      </Typography>
      {post.comments.length === 0 && (
        <Typography variant="caption">
          Anyone has commented yet{" "}
          <span role="img" aria-label="sad">
            😞
          </span>
        </Typography>
      )}
      {post.comments.length > 0 &&
        post.comments.map((comment) => (
          <div key={comment._id}>
            <Comment comment={comment}></Comment>
          </div>
        ))}
    </>
  );
}

export default Detail;
