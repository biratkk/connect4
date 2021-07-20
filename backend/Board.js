
const boardProperties = {
    column:7,
    row:6,
    computerTurn:1,
    depth:null
}
class Board{
    //0 => negative
    //1 => positive
    constructor(difficulty){

        //initialising turn
        this.turn = 0;

        //initalising board array
        this.board = new Array(boardProperties.column)
                        .fill(new Array(boardProperties.row)
                        .fill(null));

        this.depth = difficulty;

    }
    /**
     * 
     * @returns current board as an array
     */
    getBoard(){
        return [...this.board];
    }
    switchTurn(){
        this.turn = this.turn === 0 ? 1 : 0;
    }
    //Reference 1
    /**
     * This function drops piece on given column with given 
     * turn and returns a copy of the board after the move.
     * @returns an array representing the board
     */
    dropPieceOnAndGetBoard(turn, column, board){
        let tempColumn = [...board[column]];
        let row;
        for(let r = 0 ; r < boardProperties.row ; r++){
            if(r === 0 && tempColumn[r] === null){
                row = 0;
                break;
            }
            else if(tempColumn[r] === null && tempColumn[r-1] !== null){
                row = r;
                break;
            }
        }
        tempColumn[row] = turn;
        board[column] = tempColumn;
        return [...board];
    }
    /**
     * 
     * @returns the row of which the piece is placed
     */
    dropPieceOn(turn, column){
        let tempColumn = [...this.board[column]];
        let row;
        for(let r = 0 ; r < boardProperties.row ; r++){
            if(r === 0 && tempColumn[r] === null){
                row = 0;
                break;
            }
            else if(tempColumn[r] === null && tempColumn[r-1] !== null){
                row = r;
                break;
            }
        }
        tempColumn[row] = turn;
        this.board[column] = tempColumn;
        return row;
    }
    dropPieceOnVoid(turn, column){
        let tempColumn = [...this.board[column]];
        let row;
        for(let r = 0 ; r < boardProperties.row ; r++){
            if(r === 0 && tempColumn[r] === null){
                row = 0;
                break;
            }
            else if(tempColumn[r] === null && tempColumn[r-1] !== null){
                row = r;
                break;
            }
        }
        tempColumn[row] = turn;
        this.board[column] = tempColumn;
    }
    //Reference 2 
    getCurrentStaticEval(){
        return getStaticEval(this.board.slice());
    }
    /**
     *  
     * @returns number for the sum of points to evaluate winnings
     */
    getStaticEval(board){
        let total = 0;
        let list2 = [];
        let list3 = [];
        
        for(let c = 0; c<6 ; c++){
            for(let r = 0; r<7 ; r++){  
                if(board[r][c] === null) continue;
                for(let player = 0; player <= 1 ; player++){
                    if (r + 3 < boardProperties.row && player === board[c][r] && player === board[c][r+1]){ //look right
                        if( player == board[c][r+2] ){
                            total = player === 0 ? total + 3 : total - 3 ;
                            list3.push({
                                indexList:[[c,r],[c,r+1],[c,r+2]],
                                player:player
                            })
                        }
                        else{
                            total = player === 0 ? total + 2 : total - 2 ;
                            list2.push({
                                indexList:[[c,r],[c,r+1]],
                                player:player
                            })
                        }
                    }
                    if (c + 3 < boardProperties.column) {
                        if (player === board[c][r] && player === board[c+1][r]){//look up
                            if(player === board[c+2][r]){
                                total = player === 0 ? total + 3 : total - 3 ;
                                list3.push({
                                    indexList:[[c,r],[c+1,r],[c+2,r]],
                                    player:player
                                })
                            }
                            else{
                                total = player === 0 ? total + 2 : total - 2 ;
                                list2.push({
                                    indexList:[[c,r],[c+1,r]],
                                    player:player
                                })
                            }
                        }
                        if (r + 3 < boardProperties.row && player === board[c][r] && player === board[c+1][r+1]){ //look up and right
                            if(player === board[c+2][r+2]){
                                total = player === 0 ? total + 3 : total - 3 ;
                                list3.push({
                                    indexList:[[c,r],[c+1,r+1],[c+2,r+2]],
                                    player:player
                                })
                            }
                            else{
                                total = player === 0 ? total + 2 : total - 2 ;
                                list2.push({
                                    indexList:[[c,r],[c+1,r+1]],
                                    player:player
                                })
                            }
                        }
                        if (r - 3 >= 0 && player === board[c][r] && player === board[c+1][r-1]){ //look up and left
                            if(player === board[c+2][r-2]){
                                total = player === 0 ? total + 3 : total - 3 ;
                                list3.push({
                                    indexList:[[c,r],[c+1,r-1],[c+2,r-2]],
                                    player:player
                                })
                            }
                            else{
                                total = player === 0 ? total + 2 : total - 2 ;
                                list2.push({
                                    indexList:[[c,r],[c+1,r-1]],
                                    player:player
                                })
                            }
                        }
                    }
                } 
            }
        }
        return {
            current: total
        };
    }
    //Reference 3
    miniMax(depth, posPlayer, board){
        if(depth === 0 || this.draw(board)){
            return this.getStaticEval([...board]);
        }
        if(posPlayer === 0){
            let maxNum = {
                current:Number.NEGATIVE_INFINITY,
                column:null
            };
            for(let i = 0; i < 7 ; i++){
                const miniMaxRes = this.miniMax(depth-1, 1, this.dropPieceOnAndGetBoard(0, i, [...board]));
                let {current} = miniMaxRes;
                maxNum = {
                    current:current > maxNum.current ? current : maxNum.current,
                    column: current > maxNum.current ? i : maxNum.column
                };
                
            }
            return maxNum;
        }
        if(posPlayer === 1){
            let minNum = {
                current:Number.POSITIVE_INFINITY,
                column:null
            };
            for(let i = 0; i < 7 ; i++){
                const miniMaxRes = this.miniMax(depth-1,0,this.dropPieceOnAndGetBoard(1, i, [...board]));
                let {current} = miniMaxRes;
                minNum = {
                    current:current < minNum.current ? current : minNum.current,
                    column:current < minNum.current ? i : minNum.column
                };
            }
            return minNum;
        }
    }
    won(player){
        const board = [...this.getBoard()];
        board.reverse();
        for(let r = 0; r<7 ; r++){
            for(let c = 0; c<6 ; c++){
                if(board[r][c] == null) continue;
                //https://codereview.stackexchange.com/questions/127091/java-connect-four-four-in-a-row-detection-algorithms
                if (c + 3 < 6 &&
                    player === board[r][c] &&
                    player === board[r][c+1] && // look up
                    player === board[r][c+2] &&
                    player === board[r][c+3]){
                        return true;
                    }
                if (r + 3 < 7) {
                    if (player === board[r][c] &&
                        player === board[r+1][c] && // look right
                        player === board[r+2][c] &&
                        player === board[r+3][c]){
                            return true;
                        }
                    if (c + 3 < 6 &&
                        player === board[r][c] &&
                        player === board[r+1][c+1] && // look up & right
                        player === board[r+2][c+2] &&
                        player === board[r+3][c+3]){
                            return true;
                        }
                    if (c - 3 >= 0 &&
                        player === board[r][c] &&
                        player === board[r+1][c-1] && // look up & left
                        player === board[r+2][c-2] &&
                        player === board[r+3][c-3]){
                            return true;
                        }
                }
            }
        }
        return false; 
    }
    draw(){
        return false;
    }
    getBestMove(difficulty){
        let tempBoard = [...this.board];
        const {column} = this.miniMax(difficulty, boardProperties.computerTurn,tempBoard);
        return column;
    }
}

module.exports = {
    Board
}