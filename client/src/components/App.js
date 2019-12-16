import React from "react";
import { hot } from 'react-hot-loader/root';
import List from "./List";
import { connect } from "react-redux";
import ActionButton from "./ActionButton";
import { DragDropContext } from "react-beautiful-dnd";
import { sort } from "../store/actions";
import styled from "styled-components";

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
`

class App extends React.Component {

  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    this.props.dispatch(sort(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId
    ))
  }

  render() {

    const { lists } = this.props;

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div>
          <h2>Clematis</h2>
          <ListContainer>
            {
              lists.map(list => (
                <List key={list.id} listID={list.id} title={list.title} cards={list.cards} />
            ))}
            <ActionButton list />
          </ListContainer>
          
        </div>
      </DragDropContext>
    )

  }
}

const mapStateToProps = state => ({
  lists: state.lists
})

export default hot(connect(mapStateToProps)(App));