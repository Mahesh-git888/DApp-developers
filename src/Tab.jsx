import React from 'react';

function Card() {
let User = "Trial"

    return (
        <div className="card">
            <h1 style = {{color : "black"}}> Welcome!</h1>
            <p style = {{color : "black"}} >{User}</p>
        </div>
    );
}

export default Card;
