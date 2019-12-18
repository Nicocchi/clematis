import React, { PureComponent } from "react";
import List from "./List";
import { connect } from "react-redux";
import Create from "./Create";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Routes from "../routes";
import { sort } from "../store/actions";
import { MainNavBar } from "./Navigation/MainNavBar";

class App extends PureComponent {
  render() {
    return <Routes />;
  }
}

export default App;