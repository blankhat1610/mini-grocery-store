import React, { useState } from "react";
import { useHistory } from "react-router";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useAuth } from "../../services/auth.service";
import StyledLink from "../../assets/styles/styles-link";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <StyledLink color="inherit" to="/">
        Blankhat Site
      </StyledLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const auth = useAuth();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [storeId, setStoreId] = useState();
  const [loading, setLoading] = useState(false);
  const [employeeSelected, setEmployeeSelected] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    !employeeSelected
      ? auth.login(phoneNumber, password).then(
          () => {
            history.push("/");
            window.location.reload();
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            setLoading(false);
            setMessage(resMessage);
          }
        )
      : auth.employeeLogin(userName, password, storeId).then(
          () => {
            history.push("/");
            window.location.reload();
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            setLoading(false);
            setMessage(resMessage);
          }
        );
  };

  const storeIdTextField = (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      label="Store Id"
      type="number"
      id="store-id"
      autoComplete="store-id"
      value={storeId || ""}
      onChange={(e) => setStoreId(e.target.value)}
      autoFocus
    />
  );

  const handleEmployeeSelected = (e) => {
    setEmployeeSelected(e);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={!employeeSelected ? "Phone number" : "Username"}
            type={!employeeSelected ? "mobile" : "text"}
            id={!employeeSelected ? "mobile" : "username"}
            // autoComplete={!employeeSelected ? "mobile" : "username"}
            value={!employeeSelected ? phoneNumber : userName}
            onChange={(e) => {
              !employeeSelected
                ? setPhoneNumber(e.target.value)
                : setUserName(e.target.value);
            }}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            // autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={(event) =>
                  handleEmployeeSelected(event.target.checked)
                }
                value="remember"
                color="primary"
              />
            }
            label="Employee"
          />
          {employeeSelected && storeIdTextField}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <StyledLink to="#" variant="body2">
                Forgot password?
              </StyledLink>
            </Grid>
            <Grid item>
              <StyledLink to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </StyledLink>
            </Grid>
          </Grid>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default Login;
