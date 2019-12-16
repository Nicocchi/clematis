import React from "react";
import { hot } from 'react-hot-loader/root';
import List from "./List";
import { connect } from "react-redux";
import ActionButton from "./ActionButton";

class App extends React.Component {
  render() {

    const { lists } = this.props;

    return (
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