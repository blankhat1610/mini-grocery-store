import { React } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/Registration";
import Home from "./pages/Home";
import { ProvideAuth } from "./services/auth.service";

const App = () => {
  return (
    <ProvideAuth>
      <Switch>
        <PrivateRoute exact path={["/", "/home"]}>
          <Home />
        </PrivateRoute>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <SignUp />
        </Route>
      </Switch>
    </ProvideAuth>
  );
};

const PrivateRoute = ({ children, ...rest }) => {
  console.log("STORE: ", localStorage.getItem("store"));
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem("store") ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default App;
