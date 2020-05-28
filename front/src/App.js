import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  makeStyles,
  Menu,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@material-ui/core";
import CodeIcon from "@material-ui/icons/Code";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import SearchIcon from "@material-ui/icons/Search";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./config/theme";
import PageHome from "./pages/Home";
import PageDetail from "./pages/Detail";
import PageLanding from "./pages/Landing";
import Account from "./views/Account";
import AuthContext from "./contexts/authContext";
import SearchUsers from "./views/SearchUsers";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  searchContainer: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "space-evenly",
    "& > *": {
      flexGrow: 1,
    },
    "& *": {
      color: "rgba(255, 255, 255, 0.7)",
    },
    marginRight: 24,
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
  const [query, setQuery] = useState({});
  const [justUsers, setJustUsers] = useState(false);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [orderBy, setOrderBy] = useState(1);
  const [requestAgain, setRequestAgain] = useState(1);

  const onToggleJustUsers = () => setJustUsers(!justUsers);
  const onSearchChanged = (set, value) => {
    set(value);
  };
  const onSearch = () => {
    const qName = name === "" ? {} : { name };
    const qTitle = title === "" ? { ...qName } : { ...qName, title };
    const q = {
      ...qTitle,
      justUsers,
      orderBy: orderBy === 1 ? "latest" : "claps",
    };
    setQuery(q);
    setRequestAgain(requestAgain + 1);
  };

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
    onBack();
  };

  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const onUsersClose = () => setIsUsersOpen(false);
  const onUsersOpen = () => setIsUsersOpen(true);

  const [postId, setPostId] = useState(null);
  const onPostClick = (_id) => setPostId(_id);
  const onBack = () => setPostId(null);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const onProfileClose = () => setIsProfileOpen(false);
  const onProfileOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setIsProfileOpen(true);
  };

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
          {user && (
            <>
              <div className={classes.searchContainer}>
                <TextField
                  fullWidth
                  variant="filled"
                  color="secondary"
                  label="User"
                  onChange={(event) =>
                    onSearchChanged(setName, event.target.value.trim())
                  }
                ></TextField>
                <TextField
                  fullWidth
                  variant="filled"
                  color="secondary"
                  label="Title"
                  onChange={(event) =>
                    onSearchChanged(setTitle, event.target.value.trim())
                  }
                ></TextField>
                <FormControl fullWidth variant="filled" color="secondary">
                  <InputLabel id="order">Order By</InputLabel>
                  <Select
                    labelId="order"
                    id="order"
                    value={orderBy}
                    onChange={(event) =>
                      onSearchChanged(setOrderBy, event.target.value)
                    }
                  >
                    <MenuItem value={1}>Latest</MenuItem>
                    <MenuItem value={2}>Most Claps</MenuItem>
                  </Select>
                </FormControl>
                <IconButton edge="end" aria-label="menu" onClick={onSearch}>
                  <SearchIcon />
                </IconButton>
              </div>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                ref={anchorEl}
                onClick={onUsersOpen}
              >
                <GroupAddIcon />
              </IconButton>
            </>
          )}
          {!user && (
            <div className={classes.searchContainer}>
              <Typography variant="h6">TechBlogs</Typography>
            </div>
          )}
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
        <Account
          justUsers={justUsers}
          onToggleJustUsers={onToggleJustUsers}
        ></Account>
      </Menu>
      <div className={classes.heroImage}></div>
      <div className={classes.container}>
        {user && postId && (
          <PageDetail _id={postId} token={token} onBack={onBack}></PageDetail>
        )}
        {user && !postId && (
          <PageHome
            token={token}
            query={query}
            requestAgain={requestAgain}
            onPostClick={onPostClick}
          ></PageHome>
        )}
        {!user && <PageLanding></PageLanding>}
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
