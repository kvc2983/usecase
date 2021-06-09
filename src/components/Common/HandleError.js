import React from 'react';

const HandleError = ({ error }) => {
    return (
        <div>
            <p>OOPS! Something went Wrong:</p>
            <p style={{ color: 'red' }}>{error}</p>
            <p>Please try again after sometime</p>
        </div>
    )
}

export default HandleError; 