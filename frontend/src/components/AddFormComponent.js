import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import categoryService from "../services/category.service";
import productService from "../services/product.service";
import {
  Dialog,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
// For material-ui-pickers v3 use v1.x version of @date-io adapters
import DateFnsUtils from "@date-io/date-fns";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { getDateIgnoreTimezone } from "../utils/dateFormat";
import { capitalizeFirstLetter } from "../utils/global";
import employeeService from "../services/employee.service";

const AddFormComponent = (props) => {
  const {
    handleClose,
    open,
    category,
    product,
    employee,
    currentUser,
    categoryData,
  } = props;
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState();
  const [price, setPrice] = useState();
  const [amount, setAmount] = useState();
  const [mfgDate, setMFGDate] = useState();
  const [expDate, setEXPDate] = useState();

  const handleAddProduct = (e) => {
    e.preventDefault();
    productService
      .create({
        name: capitalizeFirstLetter(name),
        category_id: categoryId,
        price: price,
        amount: amount,
        mfg_date: mfgDate,
        exp_date: expDate,
        description: capitalizeFirstLetter(description),
      })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(`error ${error}`);
        }
      );
    handleClose();
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    categoryService
      .create({
        name: name.toUpperCase(),
        description: capitalizeFirstLetter(description),
        store_id: currentUser.id,
      })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(`error ${error}`);
        }
      );
    handleClose();
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    employeeService
      .create({
        name: name,
        username: username,
        password: password,
        phone_number: phoneNumber,
        address: capitalizeFirstLetter(address),
        store_id: currentUser.id,
      })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(`error ${error}`);
        }
      );
    handleClose();
  };

  const categoryForm = (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          margin="none"
          required
          fullWidth
          label="Category Name"
          type="text"
          id="category-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          multiline
          variant="outlined"
          margin="none"
          required
          fullWidth
          label="Description"
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Grid>
    </Grid>
  );

  const productForm = (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          margin="none"
          required
          fullWidth
          label="Product Name"
          type="text"
          id="category-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          select
          variant="outlined"
          margin="none"
          required
          fullWidth
          label="Category"
          type="text"
          id="category-id"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          {categoryData &&
            categoryData.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
        </TextField>
      </Grid>
      <Grid item xs={6}>
        <TextField
          variant="outlined"
          margin="none"
          required
          fullWidth
          label="Price"
          type="text"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          variant="outlined"
          margin="none"
          required
          fullWidth
          label="Amount"
          type="text"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </Grid>

      <Grid item xs={12}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="none"
                id="date-picker-inline"
                label="Date picker inline"
                value={mfgDate}
                onChange={(date) => {
                  const theDate = getDateIgnoreTimezone(date);
                  setMFGDate(theDate);
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="none"
                id="date-picker-inline"
                label="Date picker inline"
                value={expDate}
                onChange={(date) => {
                  const theDate = getDateIgnoreTimezone(date);
                  setEXPDate(theDate);
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </Grid>

      <Grid item xs={12}>
        <TextField
          multiline
          variant="outlined"
          margin="none"
          fullWidth
          label="Description"
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Grid>
    </Grid>
  );

  const employeeForm = (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          margin="none"
          required
          fullWidth
          label="Name"
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          variant="outlined"
          margin="none"
          required
          fullWidth
          label="User Name"
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          variant="outlined"
          margin="none"
          required
          fullWidth
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          multiline
          variant="outlined"
          margin="none"
          fullWidth
          required
          label="Phone Number"
          type="tel"
          id="phone-number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          multiline
          variant="outlined"
          margin="none"
          fullWidth
          label="Address"
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </Grid>
    </Grid>
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        Add{" "}
        {category ? "Category" : product ? "Product" : employee && "Employee"}
      </DialogTitle>
      <form
        onSubmit={
          category
            ? handleAddCategory
            : product
            ? handleAddProduct
            : employee && handleAddEmployee
        }
      >
        <DialogContent>
          {category
            ? categoryForm
            : product
            ? productForm
            : employee && employeeForm}
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="primary">
            Add
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const DialogTitle = withStyles((theme) => ({
  root: {
    padding: "16px 24px 5px",
  },
}))(MuiDialogTitle);

const DialogContent = withStyles((theme) => ({
  root: {
    "&:first-child": {
      paddingTop: 10,
    },
  },
}))(MuiDialogContent);

export default AddFormComponent;
