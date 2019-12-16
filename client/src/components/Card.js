import React from "react";
import MCard from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Draggable } from "react-beautiful-dnd";

const Card = ({ text, cardID, index }) => {
    return (
        <Draggable draggableId={String(cardID)} index={index}>
            {
                provided => (
                    <div 
                    ref={provided.innerRef} 
                    {...provided.draggableProps} 
                    {...provided.dragHandleProps}
                    >
                        <MCard style={styles.cardContainer}>
                            <CardContent>
                                <Typography gutterBottom>{text}</Typography>
                            </CardContent>
                        </MCard>
                    </div>
                    
                )
            }
        </Draggable>
    );
};

const styles = {
    cardContainer: {
        marginBottom: 8
    }
}

export default Card;