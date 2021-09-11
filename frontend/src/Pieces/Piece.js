import React from 'react'
import {whiteStyle, redStyle, yellowStyle} from '../Components/constantStyles'
import './Pieces.css'
export default function(props){
    return (
    <div className = "piece" style = {props.style}>
    </div>
    );
}
