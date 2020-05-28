import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
  Menu,
} from "@material-ui/core";
import CodeIcon from "@material-ui/icons/Code";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./config/theme";
import PageHome from "./pages/Home";
import PageDetail from "./pages/Detail";
import Account from "./views/Account";
import AuthContext from "./contexts/authContext";
import SearchUsers from "./views/SearchUsers";

const useStyles = makeStyles((theme) => ({
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
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const setAuth = (token, user) => {
    const t = `Bearer ${token}`;
    setToken(t);
    setUser(user);
    localStorage.setItem("token", t);
    localStorage.setItem("user", JSON.stringify(user));
  };
  const clearAuth = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const onUsersClose = () => setIsUsersOpen(false);
  const onUsersOpen = () => setIsUsersOpen(true);

  const [postId, setPostId] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const onProfileClose = () => setIsProfileOpen(false);
  const onProfileOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setIsProfileOpen(true);
  };

  const onPostClick = (_id) => setPostId(_id);
  const onBack = () => setPostId(null);

  const classes = useStyles();
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        setAuth,
        clearAuth,
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <CodeIcon className={classes.icon} />
          <Typography variant="h6" className={classes.title}>
            Fslzrr's Blog
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            ref={anchorEl}
            onClick={onUsersOpen}
          >
            <GroupAddIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="menu"
            ref={anchorEl}
            onClick={onProfileOpen}
          >
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <SearchUsers
        isOpen={isUsersOpen}
        user={user}
        setUser={setUser}
        token={token}
        onClose={onUsersClose}
      ></SearchUsers>
      <Menu open={isProfileOpen} onClose={onProfileClose} anchorEl={anchorEl}>
        <Account></Account>
      </Menu>
      <div className={classes.heroImage}></div>
      <div className={classes.container}>
        {!postId && (
          <PageHome token={token} onPostClick={onPostClick}></PageHome>
        )}
        {postId && (
          <PageDetail _id={postId} token={token} onBack={onBack}></PageDetail>
        )}
      </div>
    </AuthContext.Provider>
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
