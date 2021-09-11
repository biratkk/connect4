import React, {useState} from 'react'
import { redStyle , whiteStyle, yellowStyle } from './constantStyles'
import EmptyColumn from './EmptyColumn'
import { dropPieceOn } from './ConnectionFunctions/MakeMove';
/**
 * Turn state is as follows
 * 0 or false is for YELLOW
 * 1 or true is for RED
 */

const INITIAL_STATE =   [[whiteStyle, whiteStyle, whiteStyle, whiteStyle, whiteStyle, whiteStyle],
                        [whiteStyle, whiteStyle, whiteStyle, whiteStyle, whiteStyle, whiteStyle],
                        [whiteStyle, whiteStyle, whiteStyle, whiteStyle, whiteStyle, whiteStyle],
                        [whiteStyle, whiteStyle, whiteStyle, whiteStyle, whiteStyle, whiteStyle],
                        [whiteStyle, whiteStyle, whiteStyle, whiteStyle, whiteStyle, whiteStyle],
                        [whiteStyle, whiteStyle, whiteStyle, whiteStyle, whiteStyle, whiteStyle],
                        [whiteStyle, whiteStyle, whiteStyle, whiteStyle, whiteStyle, whiteStyle]]

const compUser = false;
const localUser = true;
export default function(props){
    
    const [styles, setStyles] = useState(INITIAL_STATE);
    const changeTurnFunction = () => {
        props.setTurn(!props.turn)
    }
    const reloadPage = () => {
        window.location.reload();
    }
    const renderPiece = (column, row, turn) => {
        let temp = [...styles];
        temp[column][row] = turn ? redStyle : yellowStyle;
        setStyles(temp);
    }
    
    const moveMade = async ( column ) => {
        if(props.local){
            const user = props.turn ? 0 : 1;
            await dropPieceOn(column, props.connectionID, user)
            .then(data => {
                const {won, columnChanged, rowChanged} = data;
                renderPiece(columnChanged, rowChanged, props.turn);
                if(won){
                    props.winner({
                        finished:true,
                        winningPlayer:props.turn ? "Red" : "Yellow"
                    });
                }
                changeTurnFunction();
            })
        }
        else{
            await dropPieceOn(column, props.connectionID, 0)
            .then(data => {
                    const {won,
                    columnChanged,
                    rowChanged,
                    computerWon,
                    computerColumn,
                    computerRow} = data;
                    
                    renderPiece(columnChanged, rowChanged, localUser);
                    if(won){
                        props.winner({
                            finished:true,
                            winningPlayer:"Red"
                        });
                        return;
                    }
                    renderPiece(computerColumn, computerRow, compUser);
                    if(computerWon){
                        props.winner({
                            finished:true,
                            winningPlayer:"Yellow"
                        });
                    }
            });
        }
    }

    let emptyColumns = new Array(7);
    for(let i = 0 ; i<7 ; i++){
        emptyColumns[i] = 
        <EmptyColumn
        key = {props.key}
        id = {props.id}
        style = {styles[i]}
        column = {i}
        currentTurn = {props.turn}
        connectionID = {props.connectionID}
        userID = {props.userID}
        moveMade = {moveMade}
        />
    }
    return (
        <div className = "page">
            <div className = "board">
                {emptyColumns}
            </div>
        </div>
    );
}