import React, { useEffect, Suspense } from "react";
import { Route, HashRouter, Switch } from "react-router-dom";
import SpinnerFull from "./components/common/SpinnerFull";
import { Provider } from "react-redux";
import store from "./store";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import PrivateRoute from "./components/common/PrivateRoute";
import { loadUser } from "./actions/auth/auth";
import Alerts from "./components/common/Alerts";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { URL } from "./actions/url";
const Dashboard = React.lazy(() => import("./layout/Dashboard"));
const Test = React.lazy(() => import("./components/common/Test"));
const Login = React.lazy(() => import("./components/accounts/Login"));

// Alerts Options
const alertOptions = {
    timeout: 3250,
    position: "top center",
};
function App() {
    // OnMount
    // eslint-disable-next-line
    useEffect(() => {
        if (store.getState().authReducer.isAuthenticated !== true) {
            store.dispatch(loadUser());
            const Http = new XMLHttpRequest();
            const url = `${URL}/api/ping/`;
            Http.open("GET", url);
            Http.send();
        }
        // eslint-disable-next-line
    }, [store.getState().authReducer.isAuthenticated]);

    return (
        <Provider store={store}>
            <AlertProvider template={AlertTemplate} {...alertOptions}>
                <HashRouter>
                    <Alerts />

                    <Suspense
                        fallback={<SpinnerFull info="Authenticating..." />}
                    >
                        <Switch>
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/test" component={Test} />
                            <PrivateRoute path="/" component={Dashboard} />
                        </Switch>
                    </Suspense>
                </HashRouter>
            </AlertProvider>
        </Provider>
    );
}

export default App;

// expose store when run in Cypress
if (window.Cypress) {
    window.store = store;
}
