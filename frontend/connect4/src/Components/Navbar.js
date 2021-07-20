import React, { useState } from 'react'
import Slider from '@material-ui/core/Slider';

import {createLocalGame, createMinimaxGame } from './ConnectionFunctions/CreateGame'

export default function(props){
    
    const [difficultyOptions, showDifficultyOptions] = useState(false);
    const [value, setValue] = useState(props.difficulty);
    const [sliderAvailable, setSliderAvailable] = useState(false);

    const handleSliderChange = (event, newValue) =>{
        setValue(newValue);
        props.setDifficulty(newValue);
    }
    const disableSlider = () => {
        setSliderAvailable(true);
    }

    /**
     * This function takes in a boolean value and sets the current
     * game settings to whether a local game should be played or a 
     * game against the computer should be played
     * @param {*} local boolean representing whether game is local or not 
     */
    const createGame = async (local) => {
        disableSlider();
        if(local){
            await createLocalGame(props.connectionID)
            .then(data => {
                props.setConnectionID(data.connectionID);
                props.resetBoard();
            });
            props.setLocal(true);
        }
        else{
            await createMinimaxGame(props.connectionID, props.difficulty)
            .then(data => {
                props.setConnectionID(data.connectionID);
                props.resetBoard();
            });
            props.setLocal(false);
        }
    }
    return (
        <div className = "nav">
            
            <ion-icon
            className = "navbar-logo"
            onClick = {() => createGame(true)} 
            name="people-outline"
            title = "Play local game">
            </ion-icon>
            
            
            <ion-icon
            className = "navbar-logo"
            onClick = {() => createGame(false)}
            name="laptop-outline"
            title = "Play against computer">
            </ion-icon>

           
            <ion-icon
            className = "navbar-logo"
            onClick = {() => props.resetGame()}
            name="refresh-outline"
            title = "Reset game">
            </ion-icon>


            <ion-icon
            className = "navbar-logo"
            id = "turnShower" 
            name = "ellipse"
            title = "Current Turn"
            style= {{
                color: props.turn ? "Red" : "Yellow"
            }
            }>
            </ion-icon>

            <Slider
            title = "Set Difficulty" 
            value={value}
            onChange={handleSliderChange}
            aria-labelledby="continuous-slider"
            min = {1}
            max = {10}
            disabled = {sliderAvailable}
            />

            <div className = "navbar-option current-play-mode">
                {nowPlaying(props.local)}
            </div>
            <div className = "navbar-option current-play-mode">
                {"Connection ID:" + (props.connectionID !== null ? props.connectionID : "")}
            </div>
            <div className = "navbar-option current-play-mode">
                {"Current Difficulty: "+props.difficulty}
            </div>
        </div>
    )
}
/**
 * 
 * @param {*} local boolean value that represents whether current game is local or against computer 
 * @returns String showing what type of game is being played
 */
const nowPlaying = (local) => {
    if(local === undefined || local === null) return ""
    else if(local) return "Playing locally"
    else return "Playing against machine"
}
