# Connect4

This is a basic game of Connect4 made using React frontend and Express backend. 

To start the backend server for trial, go into backend directory in terminal and type following command 
`node index.js`. This server currently listens on port 3001.

To start the frontend server, go into frontend directory terminal `frontend/connect4` and type following command `npm run start`. This server is currently on port 3000.
## Features 
- Local mode where you can play on the same computer with another person by taking turns 
- Computer mode where you play against the computer(*Minimax Algorithm*)

### Overall to-do list
- [ ] Use concurrently package or otherwise to create an option to start both frontend and backend at the same time

### Frontend to-do list
- [x] Have a basic design and logic of Connect4 app with clicking functionality
- [ ] ~~Create an SVG of the board with transparent holes(so that animation for dropping down is easier)~~ (Too difficult right now)
- [ ] ~~Make designs for Connect4 pieces~~ (pointless, doesn't let me learn much)
- [x] Create a "winner" page
- [x] Integrate to back-end
- [x] Make sure back-end response is fully functional with front end
- [x] Implement game logic to back-end
- [x] Implement optional minimax algorithm

### Backend to-do list
- [x] Update logic on the static evaluation method to check that a piece is *potential*
- [x] Integrate the Board object from `Board.js` into the main express server back-end
- [x] Transfer function to check for a win to inside the class from 
``app.post("/makeMove",(req, res) => {...const won = () => {...}})``
- [x] Use form-data instead of using raw main body when receiving data
- [ ] Fill function to check for a draw
- [x] Integrate the option of difficulty into front-end and depth search into the back-end
