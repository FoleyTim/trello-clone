import React from "react"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Draggable } from "react-beautiful-dnd";

const CardComponent = ({ title, cardId, index, description }) => {
    return (
        <Draggable draggableId={String(cardId)} index={index}>
            {provided => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <Card style={styles.card} sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.primary">
                                {title}
                            </Typography>
                            <Typography sx={{ fontSize: 12 }} color="text.secondary">
                                {description}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            )
            }
        </Draggable>
    );
};

const styles = {
    card: {
        marginBottom: 10

    }
}

export default CardComponent;