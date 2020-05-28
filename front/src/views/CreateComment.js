import React, { useState } from "react";
import { TextField, Paper, Button, makeStyles } from "@material-ui/core";
import { post } from "../hooks/useRequest";
import AuthContext from "../contexts/authContext";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "8px 16px 16px 16px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: 16,
  },
  cancelButton: {
    marginRight: 16,
  },
}));

function CreateComment(props) {
  const { _postId, onCreatedComment, isSubcomment } = props;
  const [content, setContent] = useState("Great post!");
  const onChangeContent = (event) => setContent(event.target.value);

  const onCreate = (token) => async () => {
    const url = isSubcomment
      ? `/comment/${_postId}/${props._parentCommentId}`
      : `/comment/${_postId}`;
    await post(url, {}, { content }, { headers: { Authorization: token } });
    onCreatedComment();
  };

  const classes = useStyles();
  return (
    <>
      <Paper className={classes.container}>
        <TextField
          fullWidth
          margin="dense"
          id="newComment"
          label="New Comment"
          defaultValue="Great post!"
          onChange={onChangeContent}
        ></TextField>
      </Paper>
      <p></p>
      <div className={classes.buttonContainer}>
        <AuthContext.Consumer>
          {(auth) => (
            <>
              {isSubcomment && (
                <Button
                  edge="end"
                  variant="contained"
                  onClick={props.onCancel}
                  className={classes.cancelButton}
                >
                  Cancel
                </Button>
              )}
              <Button
                edge="end"
                variant="contained"
                color="secondary"
                onClick={onCreate(auth.token)}
              >
                Add Comment
              </Button>
            </>
          )}
        </AuthContext.Consumer>
      </div>
    </>
  );
}

export default CreateComment;
