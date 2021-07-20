import React, {useState} from 'react'
import EmptySpace from './EmptySpace'
import {whiteStyle , redStyle , yellowStyle} from './constantStyles'

export default function (props){
    let emptySpaces = new Array(6);
    for(let i = 0 ; i<6 ; i++){
        emptySpaces[i] = <EmptySpace
        id = {props.id}
        style = {props.style[i]}
        column = {props.column} 
        row = {i}
        currentTurn = {props.currentTurn}
        onClick = {() => {
            if(props.id === 0){
                alert('Please create or join a game first!');
            }
            else{
                props.moveMade(props.column);
            }
        }}
        />
    }
    /* Reverse is done so that alignment of x and y is corrected */
    return (
    <div className = "emptyColumn">
            {emptySpaces.reverse()}
    </div>
    );
}
