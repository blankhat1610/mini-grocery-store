import React from "react";
import ProductPage from "./ProductPage";
import DashboardPage from "./DashboardPage";
import CategoryPage from "./CategoryPage";
import EmployeePage from "./EmployeePage";
import {
  Grid,
  Typography,
  Breadcrumbs,
  Link,
  Divider,
} from "@material-ui/core";
import { adminFeatureList } from "../utils/global";
import OrderPage from "./OrderPage";

const AdminPage = (props) => {
  const { drawerItemSelected, handleItemNotSelected, currentUser } = props;
  const item = adminFeatureList.find((item) => item.id === drawerItemSelected);

  const handlePageDisplay = () => {
    switch (drawerItemSelected) {
      case 1:
        return <ProductPage currentUser={currentUser} />;
      case 2:
        return <CategoryPage currentUser={currentUser} />;
      case 3:
        return <OrderPage currentUser={currentUser} />;
      case 4:
        return <EmployeePage currentUser={currentUser} />;
      default:
        return <ProductPage currentUser={currentUser} />;
    }
  };

  return (
    <>
      <Grid item xs={12}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/">
            Home
          </Link>
          <Link
            color="inherit"
            href="/"
            onClick={(event) => {
              event.preventDefault();
              handleItemNotSelected();
            }}
          >
            Admin
          </Link>
          <Typography color="textPrimary">
            {item !== undefined ? item.value : "Dashboard"}
          </Typography>
        </Breadcrumbs>
        <Divider />
      </Grid>
      {handlePageDisplay()}
    </>
  );
};

export default AdminPage;
