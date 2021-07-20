import React,{useState} from 'react'
import Navbar from './Navbar'
import Board from './Board'
import Celebration from './Celebration'
import ResetGame from './ConnectionFunctions/ResetGame'

const gameFinishedInitialState = {
    finished:false,
    winningPlayer:null
};

function Game(){
    const [turn, setTurn] = useState(true);
    const [connectionID, setConnectionID] = useState(null);
    const [local, setLocal] = useState(null);
    const [key, setKey] = useState(0);
    const [gameFinished, setGameFinished] = useState(gameFinishedInitialState);
    const [difficulty, setDifficulty] = useState(0);
    const [celebration, setCelebration] = useState(false);
    
    const resetBoard = () => {
        setKey(key+1);
    }

    const resetGame = async() => {
        console.log("Reached resetboard function");
        await ResetGame(connectionID)
            .then(() => {
                console.log("End of resetboard function");
                resetBoard();
                setGameFinished(gameFinishedInitialState);
                if(celebration){
                    setCelebration(false);
                }
            })
    }
    /**
     * Updates game winner state 
     */
    const winner = (gameUpdate) => {
        console.log(gameUpdate.winningPlayer+" has won");
        setGameFinished(gameUpdate);
        setCelebration(true);
    }
    return (
        <div className = "app">
            <Navbar
                /**
                 * State methods for current connection
                 */
                connectionID = {connectionID}
                setConnectionID = {setConnectionID}
                resetBoard = {resetBoard}
                resetGame = {resetGame}

                gameFinished = {gameFinished}
                setGameFinished = {setGameFinished}

                setLocal = {setLocal}
                local = {local}

                turn = {turn}

                difficulty = {difficulty}
                setDifficulty = {setDifficulty}
            />
            {!celebration &&
                <Board
                key = {key}

                id = {key} 
                connectionID = {connectionID}

                local = {local}
                winner = {winner}

                turn = {turn}
                setTurn = {setTurn}
                />
            }
            {
                celebration && 
                <Celebration 
                winner = {gameFinished.winningPlayer}
                />
            }
            
        </div>
    );
}

export default Game






