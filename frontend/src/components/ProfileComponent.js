import React from "react";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../services/auth.service";
import {
  Avatar,
  Box,
  Divider,
  SwipeableDrawer,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import { deepOrange, deepPurple, indigo } from "@material-ui/core/colors";
import MailIcon from "@material-ui/icons/Mail";
import LinkIcon from "@material-ui/icons/Link";
import PhoneIcon from "@material-ui/icons/Phone";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { capitalizeFirstLetter } from "../utils/global";

const useStyles = makeStyles((theme) => ({
  profile: {
    width: 350,
  },
  fullProfile: {
    width: "auto",
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  indigo: {
    color: theme.palette.getContrastText(indigo[500]),
    backgroundColor: indigo[500],
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  storeText: {
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

const Profile = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const auth = useAuth();

  const currentUser = auth.getCurrentUser();
  const { open, onClose } = props;

  const routeLogin = () => {
    history.push("/login");
  };

  const profile = (anchor) => (
    <div
      className={clsx(classes.profile, {
        [classes.fullProfile]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      // onClick={onClose}
      // onKeyDown={onClose}
    >
      <Box padding={2}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar className={clsx(classes.indigo, classes.large)}>
              <Typography variant="h5">
                {currentUser && currentUser.name.charAt(0).toUpperCase()}
              </Typography>
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h5" className={classes.storeText}>
              {currentUser && currentUser.name}
            </Typography>
            <Typography variant="body2" className={classes.storeText}>
              Role: {currentUser && capitalizeFirstLetter(currentUser.role)}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <PhoneIcon />
          </ListItemIcon>
          <ListItemText primary={currentUser.phoneNumber} />
        </ListItem>
        {currentUser.role === "owner" && (
          <>
            <ListItem button>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary={currentUser.email} />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <LinkIcon />
              </ListItemIcon>
              <ListItemText primary={currentUser.url} />
            </ListItem>
          </>
        )}
      </List>
      <Divider />
      <List>
        <ListItem
          button
          onClick={() => {
            auth.logout();
            routeLogin();
          }}
        >
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <SwipeableDrawer
          anchor="right"
          open={open}
          onClose={onClose}
          onOpen={onClose}
        >
          {profile("right")}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
};

export default Profile;
