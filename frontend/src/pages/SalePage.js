import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Paper,
  IconButton,
  Button,
  Typography,
  Input,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import productService from "../services/product.service";

const SaleComponent = (props) => {
  const classes = useStyles();
  const [product, setProduct] = useState([]);
  const history = useHistory();
  const {
    storeId,
    // currentUser,
    search,
    productSelected,
    billItem,
    onToggleEditMode,
    onAmountChange,
    onDeleteBillItem,
    handleOpenDialog,
    totalBill,
  } = props;

  useEffect(() => {
    localStorage.getItem("store")
      ? productService.getAll(storeId).then((response) => {
          setProduct(response.data);
        })
      : history.push("/login");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Grid item xs={12} md={6}>
        <Box maxHeight="88vh" overflow="auto">
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Product name</StyledTableCell>
                  <StyledTableCell align="right">Price</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {product
                  .filter((item) =>
                    item.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((item) => {
                    return (
                      <StyledTableRow
                        key={item.id}
                        onClick={(event) => productSelected(event, item)}
                      >
                        <StyledTableCell component="th" scope="row">
                          {item.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {item.price}
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box maxHeight="88vh" overflow="auto">
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align="right">Price</StyledTableCell>
                  <StyledTableCell align="right">Amount</StyledTableCell>
                  <StyledTableCell align="right">Total</StyledTableCell>
                  <StyledTableCell align="right">Delete</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {billItem.map((item, index) => {
                  return (
                    <StyledTableRow
                      key={index}
                      onDoubleClick={() => onToggleEditMode(item.id)}
                    >
                      <StyledTableCell component="th" scope="row">
                        {item.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.price}
                      </StyledTableCell>
                      <CustomTableCell
                        {...{ item, name: "amount", onAmountChange }}
                      />
                      <StyledTableCell align="right">
                        {item.total}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <IconButton
                          aria-label="delete"
                          size="small"
                          onClick={() => onDeleteBillItem(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
                <StyledTableRow>
                  <StyledTableCell colSpan={2} />
                  <StyledTableCell component="th" scope="row" colSpan={2}>
                    <Typography variant="subtitle1" color="secondary">
                      Total
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Typography variant="subtitle1" color="secondary">
                      {totalBill}
                    </Typography>
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box textAlign="center" paddingTop={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenDialog}
            >
              Pay
            </Button>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

const useStyles = makeStyles(() => ({
  table: {
    minWidth: 400,
  },
  input: {
    width: 130,
    height: 40,
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 15,
  },
}))(TableCell);

const CustomTableCell = ({ item, name, onAmountChange }) => {
  const classes = useStyles();
  const { isEditMode } = item;
  return (
    <TableCell align="right">
      {isEditMode ? (
        <Input
          value={item[name]}
          name={name}
          onChange={(e) => onAmountChange(e, item)}
          className={classes.input}
        />
      ) : (
        item[name]
      )}
    </TableCell>
  );
};

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default SaleComponent;
