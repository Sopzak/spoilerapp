import React from 'react';
import './style.css'
export default function SpoilerCard(props) {
 return (
    <div className="spoiler-container">
        <p>{props.spoiler.description}</p>
        <div >
            Author: <p>{props.spoiler.name}</p>
            contact: <p>{props.spoiler.email}</p>
        </div>
        <button onClick={() => props.onBtnReplay}>Replay</button>
        <button onClick={() => props.onBtnDelete}>Delete</button>
    </div>
 );
}