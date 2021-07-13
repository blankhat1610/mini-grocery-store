import React, { useEffect, useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import AddFormComponent from "../components/AddFormComponent";
import { Grid, Button, Box } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import categoryService from "../services/category.service";

const CategoryPage = (props) => {
  const { currentUser } = props;
  const [open, setOpen] = useState(false);
  const [categoryData, setCategoryData] = useState();

  useEffect(() => {
    categoryService.getAll(currentUser.id).then(
      (response) => {
        console.log(response.data);
        setCategoryData(response.data);
      },
      (error) => {
        console.log(`error ${error}`);
      }
    );
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
        category={true}
        currentUser={currentUser}
      />
      <Grid item xs={12}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleIcon />}
            onClick={handleClickOpen}
          >
            Add Category
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12}>
        {categoryData && (
          <DataGrid
            rows={categoryData}
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
    width: 230,
    editable: true,
  },
  {
    field: "description",
    headerName: "Description",
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

export default CategoryPage;
