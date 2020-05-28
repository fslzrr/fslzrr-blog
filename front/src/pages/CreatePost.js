import React, { useState } from "react";
import {
  Dialog,
  Slide,
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  IconButton,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { post as postRequest, put as putRequest } from "../hooks/useRequest";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    position: "relative",
    top: 64,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100vw",
    maxWidth: 800,
    padding: 16,
    marginRight: "auto",
    marginLeft: "auto",
  },
}));

function CreatePost(props) {
  const { post, isOpen, onClose, onCreated, onUpdated } = props;

  const [title, setTitle] = useState(post ? post.title : "");
  const [content, setContent] = useState(post ? post.content : "");
  const [isPublic, setIsPublic] = useState(post ? post.isPublic : false);

  const onValueChange = (set) => (event) => set(event.target.value.trim());

  const createPost = async () => {
    if (title.trim() === "" || content.trim() === "") return;
    await postRequest(
      "/post",
      {},
      { title, content, isPublic },
      { headers: { Authorization: props.token } }
    );
    onClose();
    onCreated();
  };

  const updatePost = async (body) => {
    if (body.title.trim() === "" || body.content.trim() === "") return;
    if (body.title === post.title && body.content === post.content) return;
    await putRequest(`/post/${post._id}`, {}, body);
    onClose();
    onUpdated();
  };

  const fixPost = async () =>
    await updatePost({ title, content, isPublic, isUpdating: false });

  const improvePost = async () =>
    await updatePost({ title, content, isPublic, isUpdating: true });

  const classes = useStyles();
  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <AppBar color="secondary">
        <Toolbar>
          <IconButton edge="start" aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Writing New Post
          </Typography>
          {!post && (
            <Button
              disableElevation
              variant="contained"
              color="primary"
              onClick={createPost}
            >
              Save & Publish
            </Button>
          )}
          {post && (
            <>
              <Button
                disableElevation
                variant="contained"
                color="primary"
                onClick={fixPost}
              >
                Edit & Publish
              </Button>
              <p>&emsp;</p>
              <Button
                disableElevation
                variant="contained"
                color="primary"
                onClick={improvePost}
              >
                Update & Publish
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.container}>
        <Typography variant="h4">Let's Start!</Typography>

        <TextField
          fullWidth
          margin="dense"
          id="title"
          label="Title"
          defaultValue={post ? post.title : undefined}
          onChange={onValueChange(setTitle)}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isPublic}
              onChange={() => setIsPublic(!isPublic)}
              inputProps={{ "aria-label": "is public" }}
            />
          }
          label="Make Public"
        />
        <TextField
          autoFocus
          fullWidth
          multiline
          margin="dense"
          id="content"
          label="Content"
          defaultValue={post ? post.content : undefined}
          onChange={onValueChange(setContent)}
        />
      </div>
    </Dialog>
  );
}

export default CreatePost;
