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
  },
}));

function CreateComment(props) {
  const { _postId, onCreatedComment } = props;
  const [content, setContent] = useState("Great post!");
  const onChangeContent = (event) => setContent(event.target.value);

  const onCreate = (token) => async () => {
    await post(
      `/comment/${_postId}`,
      {},
      { content },
      { headers: { Authorization: token } }
    );
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
            <Button
              edge="end"
              variant="contained"
              color="secondary"
              onClick={onCreate(auth.token)}
            >
              Add Comment
            </Button>
          )}
        </AuthContext.Consumer>
      </div>
    </>
  );
}

export default CreateComment;
