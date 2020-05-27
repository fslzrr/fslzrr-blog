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
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { post } from "../hooks/useRequest";

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
  const { isOpen, onClose, onCreated } = props;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onValueChange = (set) => (event) => set(event.target.value.trim());

  const createPost = async () => {
    if (title.trim() === "" || content.trim() === "") return;
    onClose();
    const res = await post("/post", {}, { title, content });
    onCreated(res.data);
  };

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
          <Button
            disableElevation
            variant="contained"
            color="primary"
            onClick={createPost}
          >
            Save & Publish
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.container}>
        <Typography variant="h4">Let's Start!</Typography>
        <TextField
          fullWidth
          margin="dense"
          id="title"
          label="Title"
          onChange={onValueChange(setTitle)}
        />
        <TextField
          autoFocus
          fullWidth
          multiline
          margin="dense"
          id="content"
          label="Content"
          onChange={onValueChange(setContent)}
        />
      </div>
    </Dialog>
  );
}

export default CreatePost;
