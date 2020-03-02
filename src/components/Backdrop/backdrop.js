import React from 'react';

import "./backdrop.css"

const Backdrop = props => {
    return (
        <div className="backdrop" onClick={props.click}>

        </div>
    )
}

export default Backdrop;