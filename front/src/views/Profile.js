import React, { useState } from "react";
import {
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  ListItemSecondaryAction,
  Badge,
} from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { useRequest, deleteR, post } from "../hooks/useRequest";
import Friends from "./Friends";

const useStyles = makeStyles((theme) => ({
  list: {
    marginLeft: -16,
    width: "calc(100% + 32px)",
  },
}));

function Profile(props) {
  const [user, requestAgain] = useRequest(
    "get",
    "/auth",
    {},
    {},
    { headers: { Authorization: props.token } },
    (user) => {
      const x = props.token.slice(7);
      props.setAuth(x, user);
    }
  );

  const logout = async () => {
    props.onLogOut();
  };

  const [isFriendsOpen, setIsFriendsOpen] = useState(false);
  const [isViewingFriends, setIsViewingFriends] = useState(false);
  const onFriendsClose = () => setIsFriendsOpen(false);
  const onFriendsOpen = () => setIsFriendsOpen(true);

  const onRemoveFriend = (_id) => async () => {
    await deleteR(
      `/friend/${_id}`,
      {},
      { headers: { Authorization: props.token } }
    );
    requestAgain();
  };
  const onAcceptRequest = (_id) => async () => {
    await post(
      "/friend",
      {},
      { _friendId: _id },
      { headers: { Authorization: props.token } }
    );
    requestAgain();
  };
  const onDeclineRequest = (_id) => async () => {
    await deleteR(
      `/friend/request/${_id}`,
      {},
      { headers: { Authorization: props.token } }
    );
    requestAgain();
  };

  const classes = useStyles();
  if (!user) return <></>;
  return (
    <>
      <Typography>{user.name}</Typography>
      <Typography variant="caption">{user.email}</Typography>
      <List className={classes.list}>
        <ListItem
          button
          onClick={() => {
            setIsViewingFriends(true);
            onFriendsOpen();
          }}
        >
          <ListItemText primary="Friends" />
        </ListItem>

        <ListItem
          button
          onClick={() => {
            setIsViewingFriends(false);
            onFriendsOpen();
          }}
        >
          <ListItemText primary="Friend Requests" />
          {user.friendRequests.length !== 0 && (
            <ListItemSecondaryAction>
              <Badge
                badgeContent={user.friendRequests.length}
                color="secondary"
              >
                <NotificationsIcon />
              </Badge>
            </ListItemSecondaryAction>
          )}
        </ListItem>
      </List>

      <Button fullWidth disableElevation variant="contained" onClick={logout}>
        Log Out
      </Button>

      <Friends
        isOpen={isFriendsOpen}
        isViewingFriends={isViewingFriends}
        friends={user.friends}
        friendRequests={user.friendRequests}
        onClose={onFriendsClose}
        onRemoveFriend={onRemoveFriend}
        onAcceptRequest={onAcceptRequest}
        onDeclineRequest={onDeclineRequest}
      ></Friends>
    </>
  );
}

export default Profile;
