import React from "react";
import Card from "./Card"
import Typography from '@mui/material/Typography';
import AddButton from "./AddButton";
import { Droppable } from "react-beautiful-dnd";

const List = ({ title, cards, listId }) => {
    return (
        <Droppable droppableId={String(listId)}>
            {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef} style={styles.container}>
                    <Typography variant="h6">{title} </Typography>
                    {cards.map((card, index) => <Card key={card.cardId} title={card.title} cardId={card.cardId} index={index} description={card.description} />)}
                    {provided.placeholder}
                    <AddButton listId={listId} />
                </div>
            )}
        </Droppable>
    );
};

const styles = {
    container: {
        backgroundColor: "#ebeced",
        borderRadius: 4,
        width: 300,
        padding: 10,
        margin: 10,
        height: '90%'
    }
}

export default List;