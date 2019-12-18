import React, { PureComponent } from "react";
import Card from "./Card";
import Create from "./Create";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { connect } from "react-redux";
import { editTitle, deleteList } from "../store/actions";
import Icon from "@material-ui/core/Icon";

const ListContainer = styled.div`
    background-color: #dfe3e6;
    border-radius: 3px;
    width: 300px;
    padding: 8px;
    height: 100%;
    margin: 0 8px 0 0;
`;

const StyledInput = styled.input`
    width: 100%;
    border: none;
    outline-color: blue;
    border-radius: 3px;
    margin-bottom: 3px;
    padding: 5px;
`;

const TitleContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
`;

const DeleteButton = styled(Icon)`
    cursor: pointer;
    transition: opacity 0.3s ease-in-out;
    opacity: 0.4;
    &:hover {
        opacity: 0.8;
    }
`;

const ListTitle = styled.h4`
    transition: background 0.3s ease-in;
    ${TitleContainer}:hover & {
        background: #ccc;
    }
`;

class List extends PureComponent {
    state = {
        isEditing: false,
        listTitle: ""
    };

    renderEditInput = () => {
        return (
            <form onSubmit={this.handleFinishEditing}>
                <StyledInput
                    type="text"
                    value={this.props.listTitle}
                    onChange={this.handleChange}
                    autoFocus
                    onFocus={this.handleFocus}
                    onBlur={this.handleFinishEditing}
                />
            </form>
        );
    };

    handleFocus = e => {
        e.target.select();
    };

    handleChange = e => {
        e.preventDefault();
        this.setState({
            listTitle: e.target.value
        });
    };

    handleFinishEditing = e => {
        this.setState({
            isEditing: false
        });
        this.props.editTitle(this.props.listID, this.state.listTitle);
    };

    handleDeleteList = () => {
        this.props.deleteList(this.props.listID);
    };

    render() {
        return (
            <Draggable
                draggableId={String(this.props.listID)}
                index={this.props.index}
            >
                {provided => (
                    <ListContainer
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <Droppable
                            droppableId={String(this.props.listID)}
                            type="card"
                        >
                            {provided => (
                                <div>
                                    <div>
                                        {this.state.isEditing ? (
                                            renderEditInput()
                                        ) : (
                                            <TitleContainer
                                                onClick={() =>
                                                    setIsEditing(true)
                                                }
                                            >
                                                <ListTitle>
                                                    {this.state.listTitle}
                                                </ListTitle>
                                                <DeleteButton
                                                    onClick={
                                                        this.handleDeleteList
                                                    }
                                                >
                                                    delete
                                                </DeleteButton>
                                            </TitleContainer>
                                        )}
                                    </div>
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {this.props.cards.map((card, index) => (
                                            <Card
                                                key={card.id}
                                                text={card.text}
                                                id={card.id}
                                                index={index}
                                                listID={this.props.listID}
                                                listTitle={this.state.listTitle}
                                                description={card.description}
                                                checklists={card.checklists}
                                            />
                                        ))}
                                        {provided.placeholder}
                                        <Create listID={this.props.listID} />
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    </ListContainer>
                )}
            </Draggable>
        );
    }
}

const mapStateToProps = state => ({
    lists: state.lists
});

export default connect(mapStateToProps, { editTitle, deleteList })(List);
