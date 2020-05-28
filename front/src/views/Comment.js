import React, { useState } from "react";
import moment from "moment";
import {
  Typography,
  makeStyles,
  Paper,
  IconButton,
  Link,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import { deleteR, post, put } from "../hooks/useRequest";
import AuthContext from "../contexts/authContext";
import CreateComment from "./CreateComment";

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
  reply: {
    marginLeft: 16,
    "&:hover": {
      cursor: "pointer",
    },
  },
  comment: {
    marginLeft: 16,
  },
}));

function Comment(props) {
  const {
    _id,
    author,
    content,
    createdDate,
    isApproved,
    replies,
  } = props.comment;

  const [isReplying, setIsReplying] = useState(false);

  const onDeleteComment = (token, _commentId) => async () => {
    const url = props._parentCommentId
      ? `/comment/${props._postId}/${props._parentCommentId}/${_commentId}`
      : `/comment/${props._postId}/${_commentId}`;
    console.log("delete:", url);
    await deleteR(url, {}, { headers: { Authorization: token } });
    props.onDeletedComment();
  };

  const onApproveComment = (token, _commentId) => async () => {
    const url = props._parentCommentId
      ? `/comment/${props._postId}/${props._parentCommentId}/${_commentId}`
      : `/comment/${props._postId}/${_commentId}`;
    await put(url, {}, {}, { headers: { Authorization: token } });
    props.onDeletedComment();
  };

  const date = moment(createdDate);
  const classes = useStyles();
  return (
    <>
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
      {replies && (
        <>
          {!isReplying && (
            <p style={{ marginTop: "8px" }}>
              <Link
                color="secondary"
                className={classes.reply}
                onClick={() => setIsReplying(true)}
              >
                Reply
              </Link>
            </p>
          )}
          {isReplying && (
            <div style={{ marginLeft: "16px", paddingTop: "8px" }}>
              <CreateComment
                isSubcomment
                _postId={props._postId}
                _parentCommentId={_id}
                onCancel={() => setIsReplying(false)}
                onCreatedComment={props.onCreatedComment}
              ></CreateComment>
            </div>
          )}
          <AuthContext.Consumer>
            {(auth) =>
              replies.map(
                (comment) =>
                  (comment.isApproved ||
                    props._postAuthorId === auth.user._id) && (
                    <div key={comment._id} className={classes.comment}>
                      <Comment
                        comment={comment}
                        _postId={props._postId}
                        _parentCommentId={_id}
                        _postAuthorId={props._postAuthorId}
                        onDeletedComment={props.onDeletedComment}
                      ></Comment>
                    </div>
                  )
              )
            }
          </AuthContext.Consumer>
        </>
      )}
    </>
  );
}

export default Comment;
