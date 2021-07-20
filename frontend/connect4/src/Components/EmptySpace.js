import React,{useState} from 'react'

export default function (props){
    return (
        <div
        key = {props.key}
        className = "emptySpaces"
        style = {props.style}
        onClick = {props.onClick}
        >
        </div>
    );
}