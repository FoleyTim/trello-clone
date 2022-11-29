import React from "react";
import Typography from '@mui/material/Typography';

const Header = () => {
    return (
        <div style={styles.container}>
            <Typography variant="h4">
                Trello
            </Typography>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: "#64b5f6",
        width: "100%",
        color: "white",
        margin: 0,
        padding: 5
    }
}

export default Header;