import React from 'react';
import './style.css'
export default function SpoilerCard(props) {
 return (
    <div className="spoiler-container">
        <p>{props.spoiler.description}</p>
        <div >
            Author: {props.spoiler.name} {props.spoiler.email}
        </div>
        <button onClick={() => props.onBtnReplay}>Replay</button>
        <button onClick={() => props.onBtnDelete}>Delete</button>
    </div>
 );
}