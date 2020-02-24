import React, { Component, Fragment, Suspense, IndexRedirect } from "react";
import PrivateRoute from "./common/PrivateRoute";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Layout } from "antd";
import AppHeader from "../layout/AppHeader";
import AppFooter from "../layout/AppFooter";
import AppSider from "../layout/AppSider";
import Spinner from "./common/Spinner";
import Error404 from "./common/Error404";
const { Content } = Layout;
const Library = React.lazy(() => import("./library/Library"));
const Students = React.lazy(() => import("./students/Students"));
const Classes = React.lazy(() => import("./classes/Classes"));
const Dormitories = React.lazy(() => import("./dormitories/Dormitories"));
const Register = React.lazy(() => import("./accounts/Register"));

export class Dashboard extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Layout style={{ minHeight: "100vh" }}>
            <AppSider />
            <Layout>
              <AppHeader />
              <Content
                style={{
                  margin: "15px ",
                  marginTop: "1px ",
                  minHeight: "100vh"
                }}
              >
                <Switch>
                  <Suspense fallback={<Spinner />}>
                    <PrivateRoute exact path="/" component={Students} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/spinner" component={Spinner} />
                    <PrivateRoute path="/students" component={Students} />
                    <PrivateRoute path="/library" component={Library} />
                    <PrivateRoute path="/classes" component={Classes} />
                    <PrivateRoute path="/dorms" component={Dormitories} />
                  </Suspense>
                  <Route component={Error404} />
                </Switch>
              </Content>
              <AppFooter />
            </Layout>
          </Layout>
        </Fragment>
      </Router>
    );
  }
}

export default Dashboard;
