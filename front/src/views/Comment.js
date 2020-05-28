import React from "react";
import moment from "moment";
import { Typography, makeStyles, Paper, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import { deleteR, post } from "../hooks/useRequest";
import AuthContext from "../contexts/authContext";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "8px 16px 16px 16px",
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
}));

function Comment(props) {
  const { _id, author, content, createdDate, isApproved } = props.comment;

  const onDeleteComment = (token, _commentId) => async () => {
    await deleteR(
      `/comment/${props._postId}/${_commentId}`,
      {},
      { headers: { Authorization: token } }
    );
    props.onDeletedComment();
  };

  const onApproveComment = (token, _commentId) => async () => {
    await post(
      `/comment/${props._postId}/${_commentId}`,
      {},
      {},
      { headers: { Authorization: token } }
    );
    props.onDeletedComment();
  };

  const date = moment(createdDate);
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <div className={classes.titleContainer}>
        <Typography>{author.name}</Typography>
        <AuthContext.Consumer>
          {(auth) => (
            <div className={classes.buttonContainer}>
              <Typography variant="overline" color="textSecondary">
                {date.format("DD/MM/YYYY hh:mm a")}
              </Typography>
              {!isApproved && props._postAuthorId === auth.user._id && (
                <IconButton
                  color="secondary"
                  aria-label="delete"
                  onClick={onApproveComment(auth.token, _id)}
                >
                  <CheckIcon />
                </IconButton>
              )}
              {(author._id === auth.user._id ||
                props._postAuthorId === auth.user._id) && (
                <IconButton
                  color="secondary"
                  aria-label="delete"
                  onClick={onDeleteComment(auth.token, _id)}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </div>
          )}
        </AuthContext.Consumer>
      </div>
      <Typography color="textSecondary">{content}</Typography>
    </Paper>
  );
}

export default Comment;
