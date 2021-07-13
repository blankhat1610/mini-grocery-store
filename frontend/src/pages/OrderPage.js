import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import billService from "../services/bill.service";

const OrderPage = (props) => {
  const { currentUser } = props;
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    billService.getAll(currentUser.id).then(
      (response) => {
        setOrderData(response.data);
      },
      (error) => {
        console.log(`error ${error}`);
      }
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Grid item xs={12}>
        {orderData && (
          <DataGrid
            rows={orderData}
            columns={columns}
            checkboxSelection
            disableSelectionOnClick
            autoHeight
            autoPageSize
          />
        )}
      </Grid>
    </>
  );
};

// const useStyles = makeStyles((theme) => ({}));

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "total_item",
    headerName: "Item",
    width: 230,
    editable: true,
  },
  {
    field: "total_price",
    headerName: "Total",
    sortable: false,
    width: 350,
    editable: true,
  },
  {
    field: "employeeName",
    headerName: "Employee",
    sortable: false,
    width: 350,
    editable: true,
  },
  {
    field: "created_at",
    headerName: "Created At",
    width: 200,
    editable: true,
  },
];

export default OrderPage;
