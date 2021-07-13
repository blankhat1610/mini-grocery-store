import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import IconButton from "@material-ui/core/IconButton";
import MailIcon from "@material-ui/icons/Mail";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { adminFeatureList } from "../utils/global";
import categoryService from "../services/category.service";

const DrawerComponent = (props) => {
  const classes = useStyles();
  const [categoryData, setCategoryData] = useState();
  const theme = useTheme();
  const {
    open,
    handleDrawerClose,
    admin,
    drawerItemSelected,
    handleDrawerItemSelected,
    // currentUser,
    storeId,
  } = props;
  // const storeId =
  //   currentUser.role === "owner" ? currentUser.id : currentUser.storeId;

  useEffect(() => {
    categoryService.getAll(storeId).then((response) => {
      setCategoryData(response.data);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const categories = (
    <List>
      {categoryData &&
        categoryData.map((item, index) => (
          <ListItem button key={item.id}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
    </List>
  );

  const adminFeatures = (
    <List>
      {adminFeatureList.map((item) => (
        <ListItem
          button
          key={item.id}
          selected={drawerItemSelected === item.id}
          onClick={() => handleDrawerItemSelected(item)}
        >
          <ListItemIcon>
            {item.id % 2 === 0 ? <InboxIcon /> : <MailIcon />}
          </ListItemIcon>
          <ListItemText primary={item.value} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      {admin ? adminFeatures : categories}
    </Drawer>
  );
};

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: global.drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: global.drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

export default DrawerComponent;
