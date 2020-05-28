import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  Typography,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { useRequest, post } from "../hooks/useRequest";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "8px 16px 16px 16px",
  },
  listItem: {
    padding: 0,
  },
}));

function SearchUsers(props) {
  const { isOpen, onClose } = props;
  const [search, setSearch] = useState("<null>");

  const [users, requestAgain] = useRequest(
    "get",
    `/user/${search}`,
    {},
    {},
    { headers: { Authorization: props.token } }
  );

  const onSearchChange = (event) => {
    const newVal = event.target.value.trim();
    setSearch(newVal === "" ? "<null>" : newVal);
    requestAgain();
  };

  const onSendFriendRequest = (_friendId) => async () => {
    await post(
      "/friend/request",
      {},
      { _friendId },
      { headers: { Authorization: props.token } }
    );
    requestAgain();
  };

  const classes = useStyles();
  return (
    <Dialog open={isOpen} onClose={onClose} aria-labelledby="search users">
      <DialogContent className={classes.root}>
        <Typography variant="h6">Search Users</Typography>
        <TextField
          autoFocus
          fullWidth
          variant="filled"
          margin="dense"
          id="search"
          label="Name to search"
          onChange={onSearchChange}
        />
        <List>
          {props.user &&
            users &&
            users.map((user) => {
              const alreadySentReq =
                user.friendRequests &&
                user.friendRequests.find((fr) => fr === props.user._id);
              const alreadyFriend =
                user.friends &&
                user.friends.find((fr) => fr === props.user._id);
              return (
                <ListItem key={user._id} className={classes.listItem}>
                  <ListItemText primary={user.name} secondary={user.email} />

                  <ListItemSecondaryAction>
                    {!alreadyFriend && (
                      <IconButton
                        color="primary"
                        edge="end"
                        aria-label="send friend request"
                        disabled={alreadySentReq}
                        onClick={onSendFriendRequest(user._id)}
                      >
                        <PersonAddIcon />
                      </IconButton>
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          {(!users || users.length === 0) && (
            <ListItem className={classes.listItem}>
              <ListItemText primary="No users found :(" />
            </ListItem>
          )}
        </List>
      </DialogContent>
    </Dialog>
  );
}

export default SearchUsers;
