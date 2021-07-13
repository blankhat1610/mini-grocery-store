import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import {
  Box,
  Grid,
  makeStyles,
  Paper,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import QRCode from "qrcode.react";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const BillDialog = (props) => {
  const classes = useStyles();
  const {
    currentUser,
    openDialog,
    handleCloseDialog,
    makeBillItemEmpty,
    bills,
    storeId,
    totalBill,
    billId,
  } = props;
  const codeQRString = `${currentUser.storeName.toUpperCase()} STORE.BLANK${storeId}HAT${billId}`;

  return (
    <div>
      <Dialog
        fullScreen
        onClose={handleCloseDialog}
        aria-labelledby="customized-dialog-title"
        TransitionComponent={Transition}
        open={openDialog}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleCloseDialog}>
          Bill Detail
        </DialogTitle>
        <DialogContent dividers>
          <Grid container>
            <Grid item md={7} xs={12}>
              <TableContainer component={Paper}>
                <Table
                  className={classes.table}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bills.map((bill) => {
                      return (
                        <TableRow key={bill.id}>
                          <TableCell component="th" scope="bill">
                            {bill.name}
                          </TableCell>
                          <TableCell align="right">{bill.price}</TableCell>
                          <TableCell align="right">{bill.amount}</TableCell>
                          <TableCell align="right">{bill.total}</TableCell>
                        </TableRow>
                      );
                    })}
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <Typography variant="subtitle1" color="secondary">
                          Total
                        </Typography>
                      </TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell align="right">
                        <Typography variant="subtitle1" color="secondary">
                          {totalBill}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item md={5} xs={12}>
              <Box textAlign="center" margin={1}>
                <QRCode
                  id="qrcode"
                  renderAs={"canvas"}
                  value={JSON.stringify(codeQRString)}
                  size={600}
                  level={"L"}
                  includeMargin={true}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={makeBillItemEmpty} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BillDialog;
