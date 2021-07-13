import React, { useEffect, useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import AddFormComponent from "../components/AddFormComponent";
import { Grid, Button, Box } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import employeeService from "../services/employee.service";

const EmployeePage = (props) => {
  //   const classes = useStyles();
  const { currentUser } = props;
  const [open, setOpen] = useState(false);
  const [employeeData, setEmployeeData] = useState();

  useEffect(() => {
    employeeService.getAll(currentUser.id).then(
      (response) => {
        console.log(response.data);
        setEmployeeData(response.data);
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
        employee={true}
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
            Add Employee
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12}>
        {employeeData && (
          <DataGrid
            rows={employeeData}
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
    width: 200,
    editable: true,
  },
  {
    field: "username",
    headerName: "User Name",
    width: 150,
    editable: true,
  },
  {
    field: "phone_number",
    headerName: "Phone",
    sortable: false,
    width: 120,
    editable: true,
  },
  {
    field: "address",
    headerName: "Address",
    sortable: false,
    width: 300,
    editable: true,
  },
  {
    field: "password",
    headerName: "Password",
    sortable: false,
    width: 120,
    editable: true,
  },
  {
    field: "created_at",
    headerName: "Created At",
    width: 200,
    editable: true,
  },
];

export default EmployeePage;
