import React from "react";
import MCard from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const Card = ({ text }) => {
    return (
        <MCard style={styles.cardContainer}>
            <CardContent>
                <Typography gutterBottom>{text}</Typography>
            </CardContent>
        </MCard>
    );
};

const styles = {
    cardContainer: {
        marginBottom: 8
    }
}

export default Card;