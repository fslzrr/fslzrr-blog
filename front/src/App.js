import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
} from "@material-ui/core";
import CodeIcon from "@material-ui/icons/Code";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./config/theme";
import PageHome from "./pages/Home";
import PageDetail from "./pages/Detail";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  heroImage: {
    position: "absolute",
    zIndex: -1,
    left: 0,
    top: 0,
    height: "30vh",
    width: "100vw",
    backgroundColor: theme.palette.primary.light,
  },
  container: {
    padding: 16,
    maxWidth: 800,
    margin: "auto",
  },
}));

function App() {
  const [postId, setPostId] = useState(null);

  const onPostClick = (_id) => setPostId(_id);
  const onBack = () => setPostId(null);

  const classes = useStyles();
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <CodeIcon className={classes.icon} />
          <Typography variant="h6" className={classes.title}>
            fslzrr's blog
          </Typography>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.heroImage}></div>
      <div className={classes.container}>
        {!postId && <PageHome onPostClick={onPostClick}></PageHome>}
        {postId && <PageDetail _id={postId} onBack={onBack}></PageDetail>}
      </div>
    </>
  );
}

function AppWrapper() {
  return (
    <ThemeProvider theme={theme}>
      <App></App>
    </ThemeProvider>
  );
}

export default AppWrapper;
