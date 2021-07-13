import React, { useState } from "react";
import AppbarComponent from "../components/AppbarComponent";
import DrawerComponent from "../components/DrawerComponent";
import BillDialog from "../components/BillDialog";
import SalePage from "./SalePage";
import AdminPage from "./AdminPage";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline, Grid } from "@material-ui/core";
import "../utils/global";
import { useAuth } from "../services/auth.service";
import billService from "../services/bill.service";
import billItemService from "../services/billItem.service";

const Home = () => {
  const classes = useStyles();
  const auth = useAuth();
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [billItem, setBillItem] = useState([]);
  const [search, setSearch] = useState("");
  const [previous, setPrevious] = React.useState({});
  const [adminMode, setAdminMode] = useState(false);
  const [drawerItemSelected, setDrawerItemSelected] = useState(null);
  const [billId, setBillId] = useState(0);
  const [totalBill, setTotalBill] = useState(0);
  const [isCreated, setIsCreated] = useState(false);
  const currentUser = auth.getCurrentUser();
  const storeId =
    currentUser.role === "owner" ? currentUser.id : currentUser.storeId;
  const employeeId = currentUser.role === "owner" ? 1 : currentUser.id;

  const handleSearch = (searchValue) => {
    setSearch(searchValue);
  };

  const createData = (id, name, price, amount, total, isEditMode = false) => {
    return { id, name, price, amount, total, isEditMode };
  };

  const productSelected = (event, data) => {
    const exist = billItem.some((element) => element.id === data.id);
    if (exist) {
      // Find existed index
      const billIndex = billItem.findIndex((obj) => obj.id === data.id);

      billItem[billIndex].amount += 1;
      billItem[billIndex].total =
        billItem[billIndex].price * billItem[billIndex].amount;
      setTotalBill(totalBill + Number(billItem[billIndex].price));

      let newArr = [...billItem];

      setBillItem(newArr);
    } else {
      let temp = createData(data.id, data.name, data.price, 1, data.price * 1);
      // tempArr.push(temp);
      setBillItem([...billItem, temp]);
      setTotalBill(totalBill + Number(data.price));
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const makeBillItemEmpty = () => {
    setBillItem([]);
    setTotalBill(0);
    setIsCreated(false);
    handleCloseDialog();
  };

  const handleOpenDialog = () => {
    if (billItem === undefined || billItem.length === 0) {
      return console.log("not have any thing to pay");
    }
    const totalItem = billItem.length;
    const totalBill = billItem.reduce((acc, cur) => acc + Number(cur.total), 0);

    !isCreated &&
      billService
        .create({
          area: null,
          table: null,
          total_discount: 0,
          total_price: totalBill,
          total_item: totalItem,
          store_id: storeId,
          employee_id: employeeId,
        })
        .then((bill) => {
          setIsCreated(true);
          setBillId(bill.data.id);
          billItem.forEach((item) =>
            billItemService
              .create({
                item_discount: 0,
                max_discount_amount: 0,
                amount: item.amount,
                total_price: item.total,
                bill_id: bill.data.id,
                product_id: item.id,
              })
              .then(
                (res) => {
                  console.log(`BillItem ${res.data}`);
                },
                (error) => {
                  console.log(`Bill Item ${error}`);
                }
              )
          );
        });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const onToggleEditMode = (id) => {
    setBillItem(() => {
      return billItem.map((row) => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
  };

  const onDeleteBillItem = (index) => {
    setTotalBill(totalBill - Number(billItem[index].total));
    billItem.splice(index, 1);
    setBillItem([...billItem]);
  };

  const onAmountChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious((state) => ({ ...state, [row.id]: row }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    const newRows = billItem.map((row) => {
      if (row.id === id) {
        return { ...row, [name]: value, total: row.price * value };
      }
      return row;
    });
    setBillItem(newRows);
  };

  const handleChangeAdminMode = () => {
    setAdminMode(!adminMode);
  };

  const handleItemNotSelected = () => {
    setDrawerItemSelected(null);
  };

  const handleCategoryDrawer = (item) => {
    console.log(`Category ${item.id}`);
  };

  const handleAdminFeatureDrawer = (item) => {
    setDrawerItemSelected(item.id);
    console.log(`Admin Feature ${item.id}`);
  };

  const handleDrawerItemSelected = (item) => {
    return !adminMode
      ? handleCategoryDrawer(item)
      : handleAdminFeatureDrawer(item);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <BillDialog
        storeId={storeId}
        billId={billId}
        currentUser={currentUser ? currentUser : null}
        bills={billItem}
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        totalBill={totalBill}
        makeBillItemEmpty={makeBillItemEmpty}
      />
      <AppbarComponent
        handleSearch={handleSearch}
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        currentUser={currentUser}
        admin={adminMode}
        handleChangeAdminMode={handleChangeAdminMode}
      />
      <DrawerComponent
        storeId={storeId}
        open={open}
        handleDrawerClose={handleDrawerClose}
        admin={adminMode}
        drawerItemSelected={drawerItemSelected}
        handleDrawerItemSelected={handleDrawerItemSelected}
        currentUser={currentUser}
      />
      <main className={classes.contentMain}>
        <div className={classes.toolbar} />
        <Grid container className={classes.flexSection} spacing={1}>
          {!adminMode ? (
            <SalePage
              storeId={storeId}
              currentUser={currentUser}
              billItem={billItem}
              search={search}
              productSelected={productSelected}
              handleOpenDialog={handleOpenDialog}
              onToggleEditMode={onToggleEditMode}
              onDeleteBillItem={onDeleteBillItem}
              onAmountChange={onAmountChange}
              totalBill={totalBill}
            />
          ) : (
            <AdminPage
              drawerItemSelected={drawerItemSelected}
              handleItemNotSelected={handleItemNotSelected}
              currentUser={currentUser}
            />
          )}
        </Grid>
      </main>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  contentMain: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  flexSection: {
    flexGrow: 1,
    display: "flex",
    minHeight: 0,
  },
}));

export default Home;
