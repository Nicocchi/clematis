import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Board from "../components/Board";
import Home from "../components/Home";
import MainNavBar from "../components/Navigation/MainNavBar";

const AppRouter = () => {
  return (
    <Router>
      <MainNavBar />
      <div>
        <Route path="/" exact component={Home} />
        <Route path="/:boardID" component={Board} />
      </div>
    </Router>
  );
};

export default AppRouter;