import React, { useEffect, useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import AddFormComponent from "../components/AddFormComponent";
import { Grid, Button, Box } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import categoryService from "../services/category.service";
import productService from "../services/product.service";

const ProductPage = (props) => {
  // const classes = useStyles();
  const { currentUser } = props;
  const [open, setOpen] = useState(false);
  const [categoryData, setCategoryData] = useState();
  const [productData, setProductData] = useState();

  useEffect(() => {
    categoryService.getAll(currentUser.id).then((response) => {
      setCategoryData(response.data);
    });
    productService
      .getAll(currentUser.id)
      .then((response) => setProductData(response.data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <AddFormComponent
        handleClose={handleClose}
        open={open}
        product={true}
        currentUser={currentUser}
        categoryData={categoryData}
      />
      <Grid item xs={12}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleIcon />}
            onClick={handleClickOpen}
          >
            Add Product
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12}>
        {productData && (
          <DataGrid
            rows={productData}
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
    field: "name",
    headerName: "Name",
    width: 250,
    editable: true,
  },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    width: 130,
    editable: true,
  },
  {
    field: "amount",
    headerName: "Amount",
    type: "number",
    width: 130,
    editable: true,
  },
  {
    field: "description",
    headerName: "Description",
    sortable: false,
    width: 250,
  },
  {
    field: "mfg_date",
    headerName: "MFG Date",
    sortable: false,
    width: 120,
  },
  {
    field: "exp_date",
    headerName: "MFG Date",
    sortable: false,
    width: 120,
  },
  {
    field: "created_at",
    headerName: "Created At",
    width: 200,
    editable: true,
  },
];

export default ProductPage;
