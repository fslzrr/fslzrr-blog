import React, { useState } from "react";
import moment from "moment";
import { Typography, IconButton, makeStyles, Paper } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AuthContext from "../contexts/authContext";
import { useRequest, deleteR } from "../hooks/useRequest";
import EditPost from "../pages/CreatePost";
import Comment from "../views/Comment";
import CreateComment from "../views/CreateComment";
import Markdown from "../views/Markdown";

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
  titileButtonsContainer: {
    display: "flex",
    alignItems: "center",
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
  emptyComments: {
    marginBottom: 16,
  },
  comment: {
    marginBottom: 16,
  },
}));

function Detail(props) {
  const [isEditPostOpen, setIsEditPostOpen] = useState(false);
  const onEditPostOpen = () => setIsEditPostOpen(true);
  const onEditPostClose = () => setIsEditPostOpen(false);

  const [post, requestAgain] = useRequest("get", `/post/${props._id}`);

  const onDeletePost = async () => {
    await deleteR(`/post/${post._id}`);
    props.onBack();
  };

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
          <AuthContext.Consumer>
            {(auth) => (
              <div className={classes.titileButtonsContainer}>
                <Typography variant="h4">{post.title}</Typography>
                {auth.user && auth.user.isOwner && (
                  <>
                    <IconButton
                      color="secondary"
                      aria-label="edit"
                      onClick={onEditPostOpen}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      aria-label="delete"
                      onClick={onDeletePost}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <EditPost
                      post={post}
                      isOpen={isEditPostOpen}
                      onClose={onEditPostClose}
                      onUpdated={requestAgain}
                    ></EditPost>
                  </>
                )}
              </div>
            )}
          </AuthContext.Consumer>
          <Typography variant="caption" className={classes.date}>
            Last Updated - {date.format("DD/MM/YYYY hh:mm A")}
          </Typography>
        </div>
      </div>
      <Paper className={classes.contentContainer}>
        <Markdown>{post.content}</Markdown>
      </Paper>
      <Typography variant="h5" className={classes.titleComments}>
        Comments
      </Typography>
      {post.comments.length === 0 && (
        <div className={classes.emptyComments}>
          <Typography variant="caption">
            Anyone has commented yet{" "}
            <span role="img" aria-label="sad">
              😞
            </span>
          </Typography>
        </div>
      )}
      {post.comments.length > 0 &&
        post.comments.map((comment) => (
          <div key={comment._id} className={classes.comment}>
            <Comment
              comment={comment}
              _postId={post._id}
              onDeletedComment={requestAgain}
            ></Comment>
          </div>
        ))}
      <AuthContext.Consumer>
        {(auth) => {
          return (
            auth.user && (
              <CreateComment
                _postId={post._id}
                onCreatedComment={requestAgain}
              ></CreateComment>
            )
          );
        }}
      </AuthContext.Consumer>
    </>
  );
}

export default Detail;
