import React from "react";
import "./App.css";
import { Route, Switch, withRouter } from "react-router-dom";
import UserDashboard from "./components/UserDashboard";
import Post from "./components/Post";
import { Icon } from "antd";
import PostDetails from "./components/PostDetails";

function App(props) {
  const styling = { width: "40%" };
  return (
    <div className="main-container">
      <div className="app-header">
        <div style={styling}>
          <Icon
            onClick={() => {
              props.history.push('/')
            }}
            type="home"
          />
        </div>
        <div>Rentomojo Assignment</div>
      </div>
      <div className="sub-container">
        <Switch>
          <Route exact path="/" component={UserDashboard} />
          <Route path="/userPost/:id?" component={Post} />
          <Route path="/postDetails/:id?" component={PostDetails} />
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(App);
