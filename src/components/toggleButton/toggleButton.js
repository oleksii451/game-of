import React from 'react';
import './toggleButton.css'
import { Button } from 'reactstrap';


const ToggleButton = () => {
    return (
        <Button onClick={toggleRandomChar} color="primary">Toggle Random Character</Button>
    )
}

export default ToggleButton;