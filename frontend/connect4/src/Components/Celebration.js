import React from 'react'
const redStyle = {

}

const yellowStyle = {

}
export default function (props){
    if(props.winner !== null){
        return (
            <div className = "celebration-page">
                <div 
                style = {{
                    color:props.winner === "Red" ? "red" : "yellow",
                }} 
                className = "celebration-slide">
                    {props.winner+" is the winner!"}
                </div>
            </div>
        )
    }
    return (
        <div>
        </div>
    );
}