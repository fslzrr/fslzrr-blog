import React from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";

const useStyles = makeStyles((theme) => ({
  listItemRoot: {
    paddingRight: 110,
    paddingLeft: 0,
  },
}));

function Friends(props) {
  const {
    isOpen,
    isViewingFriends,
    friends,
    friendRequests,
    onClose,
    onRemoveFriend,
    onAcceptRequest,
    onDeclineRequest,
  } = props;

  const listToUse = isViewingFriends ? friends : friendRequests;
  const classes = useStyles();
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent>
        <Typography variant="h6">
          {isViewingFriends ? "Friends" : "Friend Requests"}
        </Typography>
        <List>
          {listToUse.length === 0 && (
            <Typography>
              {isViewingFriends
                ? "You suck and don't have any friends :D"
                : "Nobody want's to be your friend... yet :)"}
            </Typography>
          )}
          {listToUse.length > 0 &&
            listToUse.map((user) => (
              <ListItem key={user._id} className={classes.listItemRoot}>
                <ListItemText primary={user.name} secondary={user.email} />
                <ListItemSecondaryAction>
                  {isViewingFriends && (
                    <IconButton
                      edge="end"
                      aria-label="remove friend"
                      onClick={onRemoveFriend(user._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                  {!isViewingFriends && (
                    <>
                      <IconButton
                        edge="start"
                        aria-label="decline friend request"
                        onClick={onDeclineRequest(user._id)}
                      >
                        <CloseIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        edge="end"
                        aria-label="accept friend request"
                        onClick={onAcceptRequest(user._id)}
                      >
                        <CheckIcon />
                      </IconButton>
                    </>
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}

export default Friends;
