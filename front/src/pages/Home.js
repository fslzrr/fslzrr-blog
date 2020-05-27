import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import useRequest from "../hooks/useRequest";
import PostPreview from "../views/PostPreview";

const useStyles = makeStyles((theme) => ({
  heroImage: {
    position: "absolute",
    zIndex: -1,
    left: 0,
    top: 0,
    height: "30vh",
    width: "100vw",
    backgroundColor: theme.palette.primary.light,
  },
  title: {
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
  const posts = useRequest("get", "/post");

  const classes = useStyles();
  return (
    <>
      <div className={classes.heroImage}></div>
      <Typography variant="h4" className={classes.title}>
        Latests Blogs
      </Typography>
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
