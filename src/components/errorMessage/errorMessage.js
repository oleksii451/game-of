import React from 'react';
import './errorMessage.css';
import img from './error.jpg';

const ErrorMessage = () => {
    return (
        <>
            <span>Something went wrong</span>
            <img src={img} alt="error"></img>
        </>
    )
}

export default ErrorMessage;