import React from "react";
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

const useStyles = makeStyles((theme) => ({
  list: {
    marginLeft: -16,
    width: "calc(100% + 32px)",
  },
}));

function Profile(props) {
  const logout = async () => {
    props.onLogOut();
  };
  console.log(props.user.friendRequests.length);
  const classes = useStyles();
  return (
    <>
      <Typography>{props.user.name}</Typography>
      <Typography variant="caption">{props.user.email}</Typography>
      <List className={classes.list}>
        <ListItem button>
          <ListItemText primary="Friends" />
        </ListItem>

        <ListItem button>
          <ListItemText primary="Friend Requests" />
          {props.user.friendRequests.length !== 0 && (
            <ListItemSecondaryAction>
              <Badge
                badgeContent={props.user.friendRequests.length}
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
    </>
  );
}

export default Profile;
