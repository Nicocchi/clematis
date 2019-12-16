import React from "react";
import { hot } from 'react-hot-loader/root';
import List from "./List";
import { connect } from "react-redux";
import ActionButton from "./ActionButton";
import { DragDropContext } from "react-beautiful-dnd";

class App extends React.Component {

  onDragEnd = () => {
    // TODO: Reordering logic
  }

  render() {

    const { lists } = this.props;

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div>
          <h2>Clematis</h2>
          <div style={styles.listsContainer}>
            {
              lists.map(list => (
                <List key={list.id} listID={list.id} title={list.title} cards={list.cards} />
            ))}
            <ActionButton list />
          </div>
          
        </div>
      </DragDropContext>
    )

  }
}

const styles = {
  listsContainer: {
    display: "flex",
    flexDirection: "row"
  }
}

const mapStateToProps = state => ({
  lists: state.lists
})

export default hot(connect(mapStateToProps)(App));