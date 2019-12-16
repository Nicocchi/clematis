import React from "react";
import Card from "./Card";
import ActionButton from "./ActionButton";
import { Droppable } from "react-beautiful-dnd";

const List = ({ title, cards, listID }) => {
    return (
        <Droppable droppableId={String(listID)}>
            {
                provided => (
                    <div 
                    {...provided.droppableProps} 
                    ref={provided.innerRef} 
                    style={style.container}
                    >
                        <h4>{title}</h4>
                        { cards.map((card, index) => (
                            <Card key={card.id} cardID={card.id} index={index} text={card.text} />
                        ))}
                        {provided.placeholder}
                        <ActionButton listID={listID} />
                    </div>
            )}
        </Droppable>
    )
}

const style = {
    container: {
        backgroundColor: "#dfe3e6",
        borderRadius: 3,
        width: 300,
        padding: 8,
        height: "100%",
        marginRight: 8
    }
}

export default List;