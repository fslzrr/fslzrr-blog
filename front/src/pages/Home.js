import React, { useState } from "react";
import { makeStyles, Typography, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useRequest } from "../hooks/useRequest";
import AuthContext from "../contexts/authContext";
import PostPreview from "../views/PostPreview";
import CreatePost from "./CreatePost";

const useStyles = makeStyles((theme) => ({
  titleContent: {
    display: "flex",
    alignItem: "center",
    marginBottom: 16,
    color: "white",
  },
  blogPreview: {
    marginBottom: 16,
    "&:last-of-type": {
      marginBottom: 0,
    },
  },
}));

function Home(props) {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const onCreatePostOpen = () => setIsCreatePostOpen(true);
  const onCreatePostClose = () => setIsCreatePostOpen(false);

  const [posts, requestAgain] = useRequest("get", "/post");

  const classes = useStyles();
  return (
    <>
      <AuthContext.Consumer>
        {(auth) => (
          <div className={classes.titleContent}>
            <Typography variant="h4">Latests Posts</Typography>
            {auth.user && auth.user.isOwner && (
              <>
                <IconButton
                  color="secondary"
                  aria-label="add"
                  onClick={onCreatePostOpen}
                >
                  <AddIcon />
                </IconButton>
                <CreatePost
                  isOpen={isCreatePostOpen}
                  onClose={onCreatePostClose}
                  onCreated={requestAgain}
                ></CreatePost>
              </>
            )}
          </div>
        )}
      </AuthContext.Consumer>
      <div>
        {!posts && <p>loading...</p>}
        {posts &&
          posts.map((post) => (
            <div key={post._id} className={classes.blogPreview}>
              <PostPreview
                post={post}
                onClick={() => props.onPostClick(post._id)}
              ></PostPreview>
            </div>
          ))}
      </div>
    </>
  );
}

export default Home;
