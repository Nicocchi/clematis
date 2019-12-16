import React from "react";
import MCard from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const CardContainer = styled.div`
    margin-bottom: 8px;
`
const Card = ({ text, cardID, index }) => {
    return (
        <Draggable draggableId={String(cardID)} index={index}>
            {
                provided => (
                    <CardContainer 
                    ref={provided.innerRef} 
                    {...provided.draggableProps} 
                    {...provided.dragHandleProps}
                    >
                        <MCard>
                            <CardContent>
                                <Typography gutterBottom>{text}</Typography>
                            </CardContent>
                        </MCard>
                    </CardContainer>
                    
                )
            }
        </Draggable>
    );
};

export default Card;