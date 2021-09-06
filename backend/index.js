const express = require('express');
const fs = require('fs');
const cors = require('cors')
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const app = express();
const port = process.env.PORT || 3001;
const {Board} = require('./Board');
//use WebSockets for a faster response time
//establishing app config and middleware

//using cors to avoid any cors related error
app.use(cors());

//to parse and application code
app.use(bodyParser.urlencoded({ extended: true }));

//to parse json
app.use(bodyParser.json());

//to pass form data
app.use(upload.array());
app.use(express.static('public'));


const compUser = 1;
const difficulty = {
    easy:2,
    medium:4,
    hard:6
}

var gameStates = [];

/**
 * JSON Structure of gameStates:
 * {
 * connectionID:(number)
 * local:(boolean)
 * gameArr:(Board Object)
 * }
 */

app.listen(port, () => {
    console.log("HTTP Express server listening in port ",port)
});

// app using express methods instead of sockets

/**
 * JSON Structure of request:
 * {
 * connectionID:(number)
 * }
 * 
 * JSON Structure of response:
 * {
 * connectionID:(number)
 * newBoard:(boolean)
 * }
 */
app.post("/getBoard", (req,res) => {
    const {connectionID} = req.body;
    res.send({
        array:getGameBoard(connectionID).getBoard()
    })
    res.end();
})


/**
 * JSON Structure of request:
 * {
 * local:(boolean)
 * connectionID:(number)
 * }
 * 
 * JSON Structure of response:
 * {
 * connectionID:(number)
 * newBoard:(boolean)
 * }
 */
app.post("/createNewGame", (req,res) => {
    console.log(req.body);
    let {local, connectionID, difficulty} = req.body;
    difficulty = parseInt(difficulty);
    local = local === 'true' ? true : false;
    let resData;
    if(connectionID === 'null'){
        gameStates.push({
            connectionID: gameStates.length,
            local:local,
            //game array being used for current game
            gameArr: new Board(difficulty)
        })
        resData = {
            connectionID:gameStates.length-1,
            newBoard:false
        }
    }
    /**
     * else the previous object is modified with a new Game Array
     * for the connect 4 board
     */
    else{
        gameStates[connectionID].local = local;
        gameStates[connectionID].gameArr = new Board();
        resData = {
            connectionID:gameStates.length-1,
            newBoard:true
        }
    }
    res.send(resData);
    res.end();    
})

/**
 * JSON Structure of request:
 * {
 * column:(number),
 * connectionID:(number),
 * user:(number)
 * }
 * 
 * JSON Structure of response:
 * {
 * won:(boolean),
 * columnChanged:(number),
 * rowChanged:(number),
 * computerWon:(boolean),
 * computerRow:(number),
 * computerColumn:(number)
 * }
 */
app.post("/makeMove", (req , res) => {
    console.log(req.body);
    let {column, connectionID, user} = req.body;
    connectionID = parseInt(connectionID);
    user = parseInt(user);
    column = parseInt(column);

    /**
     * @returns the row that the piece settles in
     */
    const makeMove = (column, connectionID, user) => {
        const currentGameBoard = getGameBoard(connectionID);
        const row = currentGameBoard.dropPieceOn(user, column);
        return row;
    }

    const makeComputerMove = (connectionID) => {
        const currentBoard = getGameBoard(connectionID);
        const difficultyOfCurrentBoard = currentBoard.depth;
        const columnToMove = getGameBoard(connectionID).getBestMove(difficultyOfCurrentBoard);
        return [makeMove(columnToMove, connectionID, compUser), columnToMove];
    }

    const won = (connectionID, player) => {
     return getGameBoard(connectionID).won(player);
    }

    if(gameStates[connectionID].local == true){
        const rowAddedTo = makeMove(column, connectionID, user);
        if(won(connectionID, user)){
            res.send({
                won:true,
                //reversed to calibrate to server
                columnChanged:column,
                rowChanged:rowAddedTo
            })
        }
        else{
            res.send({
                won:false,
                columnChanged:column,
                rowChanged:rowAddedTo
            })
        }
    }
    else{
        let resData = {};
        const rowAddedTo = makeMove(column, connectionID, user);
        resData.columnChanged = column;
        resData.rowChanged = rowAddedTo;
        if(won(connectionID, user)){
            resData.won = true;
        }
        else{
            resData.won = false;
            const [row, column] = makeComputerMove(connectionID);
            resData.computerColumn =  column;
            resData.computerRow =  row;
            if(won(connectionID, compUser)){
                resData.computerWon = true;
            }
            else{
                resData.computerWon = false;
            }
        }
        res.send(resData);
    }
})
app.post("/resetGame", (req, res) => {
    let {connectionID} = req.body;
    connectionID = parseInt(connectionID);
    gameStates[connectionID].gameArr = new Board();
    res.send();
})
app.post("/deletegameStates", (req, res) => {
})
app.post("/deleteUserFromGame", (req, res) => {
});

const getFormData = (formdata) => {

}

function getGameBoard(connectionID){
    return gameStates[connectionID].gameArr;
}