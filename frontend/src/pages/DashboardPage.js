import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid } from "@material-ui/core";
import CardComponent from "../components/dashboard/CardComponent";

const DashboardPage = () => {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item xs={6} sm={3}>
            <CardComponent />
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>Total Categories</Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>Total Orders</Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>Total Users</Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const useStyles = makeStyles((theme) => ({}));

export default DashboardPage;
