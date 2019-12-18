import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addBoard } from "../store/actions";
import BoardThumbnail from "./BoardThumbnail";
import MainNavBar from "./Navigation/MainNavBar";

const Thumbnails = styled.div`
  flex: 1;
  height: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;

const HomeContainer = styled.div`
  margin: 20px auto;
  width: 800px;
`;

const CreateTitle = styled.h3`
  font-size: 28px;
  color: black;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
`;

const CreateInput = styled.input`
  height: 80px;
  width: 180px;
  font-size: 12px;
  padding: 10px;
  border-radius: 3px;
  border: none;
  outline-color: blue;
  box-shadow: 0 2px 4px grey;
  text-align: center;
`;

const Home = ({ boards, boardOrder, dispatch }) => {
  // this is the home site that shows you your boards and you can also create a Board here.

  const [newBoardTitle, setNewBoardTitle] = useState("");

  const handleChange = e => {
    setNewBoardTitle(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addBoard(newBoardTitle));
  };

  const renderBoards = () => {
    return boardOrder.map(boardID => {
      const board = boards[boardID];

      return (
        <Link
          key={boardID}
          to={`/${board.id}`}
          style={{ textDecoration: "none" }}
        >
          <BoardThumbnail {...board} />
        </Link>
      );
    });
  };

  const renderCreateBoard = () => {
    return (
      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        {/* <CreateTitle>Create a new Board</CreateTitle> */}
        <CreateInput
          onChange={handleChange}
          value={newBoardTitle}
          placeholder="Create new board"
          type="text"
        />
      </form>
    );
  };

  return (
    <HomeContainer>
      <div style={{ paddingLeft: 20}}>
        <h1>Personal Boards</h1>
      </div>
      
      <Thumbnails>{renderBoards()}{renderCreateBoard()}</Thumbnails>
      
      <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </HomeContainer>
  );
};

const mapStateToProps = state => ({
  boards: state.boards,
  boardOrder: state.boardOrder
});

export default connect(mapStateToProps)(Home);