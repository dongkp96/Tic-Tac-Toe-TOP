/*Cell object to keep track of properties of being filled
2 properties and is to be added to filled spaces array
-Board tile number ranging 1-9 -> number 
-value of 0 or 1 that corresponds to the "O" or "X" -> value
*/

/*function cell(tileNumber){
    const number = tileNumber;
    let value;

    function updateValue(player){
        if(player === "o"){
            value = 0;
        }else{
            value = 1;
        }
    }

    return{number, value, updateValue};
}*/

function chooseShape(){
    let player;
    let cpu;
    while(!player){
        let userinput = prompt("Please choose your symbol for Tic Tac Toe. Valid answers are only include 'O', 'o','X', or 'x'").toLowerCase();
        switch (userinput){
            case "o":
                player = "O";
                cpu ="X";
                break;
            case "x":
                player = "X";
                cpu = "O";
                break;
            default:
                alert("Not a valid entry. Please try again");
        }
    }

    return {player, cpu};

        /*Will use this function later with finished game module like trying to use const{player, cpu} = chooseShape();*/

} 
/*^^^^^Storage area^^^^^*/


function gameboard(){

    const board = [];
    /*Generates an array for the board */

    for (let i = 0; i < 3; i++) {
        board[i]= []
        for (let j = 1; j < 4; j++) {
          if(i === 0){
            board[i].push(j)
          }else if (i=== 1){
            board[i].push(j+3)
          }else{
            board[i].push(j+6)
          }
        }
      };
       /*Creates 2D Array 3x3 counting from 1-9 from top to bottom */

      const getBoard =() => board;
      /*Used to get the board and store it a variable for the gameController*/

      const printBoard = () => {
        console.log(board);
      /*Used to display the board for the console currently for phase 1 */  
      }

      const fillCell = (tileNumber, playerValue) =>{
        for(let i =0; i < 3; i++){
            for(let j =0; j<3; j++){
                if (board[i][j] === tileNumber){
                    board[i][j] = playerValue;
                    return true;
                }
            }
        }
        return false;
        /*Used to replace spaces on the board with the player's symbol*/
      }

      const checkColumn = () => {
        if(board[0][0] === board[1][0] && board[1][0]===board[2][0]){
            if(board[0][0]==="O"){
                return 1;
            }else if(board[0][0]==="X"){
                return 2;
            }
        }else if(board[0][1] === board[1][1] && board[1][1]===board[2][1]){
            if (board[0][1]==="O"){
                return 1;
            }else if (board[0][1]==="X"){
                return 2;
            }
        }else if(board[0][2] === board[1][2] && board[1][2]===board[2][2]){
            if(board[0][2]==="O"){
                return 1;
            }else if (board[0][2]==="X"){
                return 2;
            }
        }
        return false;
        /*Used to check for 3 in a column to allow for checking of winners, if winner returns 1 or 2 to help indicate in game controller who won */
      }

      const checkRow = () =>{
        for(let i=0; i<3; i++){
            if(board[i][0]=== board[i][1] && board[i][1]===board[i][2]){
                if(board[i][0]==="O"){
                    return 1;
                }else if(board[i][0]==="X"){
                    return 2;
                }
            }
        }
        return false;
        /*Used to check for 3 in a row to allow for checking of winners, if winner returns 1 or 2 to help indicate in game controller who won */
      }

      const checkDiagonal = () => {
        if(board[0][0]===board[1][1] && board[1][1]===board[2][2]){
            if(board[0][0]==="O"){
                return 1;
            }else if(board[0][0]==="X"){
                return 2;
            }
        }else if(board[0][2]===board[1][1] && board[0][2] === board[2][0]){
            if(board[0][2]==="O"){
                return 1;
            }else if (board[0][2]==="X"){
                return 2;
            }
        }else{
            return false;
        }
        /*Used to check for 3 in a row diagonally to allow for checking of winners, if winner returns 1 or 2 to help indicate in game controller who won */
      }

      const checkBoard = () => {
        if(checkRow()!==false){
            return checkRow();
        }else if(checkColumn()!== false){
            return checkColumn();
        }else if(checkDiagonal()!== false){
            return checkDiagonal();
        }else{
            return false;
        }
        /*Used to check the board and returns the value that corresponds to which player won */
      }



      return {getBoard, printBoard, fillCell, checkBoard};

};


function gameControl(){
    const player = "O";
    const cpu ="X";
    let turn = 1;

    /*Phase 1 of the code was meant for console play only and game development gameChoice will be called in the full game function */
    const grid = gameboard();

    const getTurn = ()=> {return turn};

    const advanceTurn = () => {turn +=1};

    const userMove = () => {
        let validMove = false;
        while (validMove === false){
            let userChoice = Number(prompt("Please choose a space on the grid for your move. Valid values is numbers 1-9"));
            validMove = grid.fillCell(userChoice, player);
            if(validMove === false){
                alert("Sorry this space is filled, please choose another space.")
            }
        }
        /*Prompts the user to move using the prompt function and makes the move have to be valid in terms of the grid spacing */
    }

    const cpuMove = () =>{
        let validMove = false;
        while(validMove === false){
            let cpuChoice = Math.floor(Math.random()*10);
            validMove = grid.fillCell(cpuChoice, cpu);
        }
        /*Uses random function and floor function to select a number from 1-9 for the computer and makes the move have to be valid in terms of the grid spacing */
    }


    const showBoardState = () =>{
        grid.printBoard();
        /*Uses the gameBoards print board function to display the board */
    }

    const checkWinner = () =>{
        if(grid.checkBoard()===1){
            console.log("User Won!");
            return true;
        }else if (grid.checkBoard()===2){
            console.log("User Lost");
            return true;
        }
        return false;

        /*Uses the grids Checkboard function to check if there is a winning condition, uses console.log to declare winner and returns true to help break a while loop  */
    }

    return{getTurn, advanceTurn, userMove, cpuMove, showBoardState, checkWinner};
};

function screenControl(){

    const createBoard= ()=>{
        const main = document.querySelector("main");
        const gameTitle = document.createElement("h3");
        gameTitle.textContent = "Tic Tac Toe";
        main.appendChild(gameTitle);
        const gameContainer = document.createElement("div");
        gameContainer.setAttribute("class", "game-container");
        for(let i = 1; i<10; i++){
            const card = document.createElement("div");
            card.setAttribute("class", "card");
            card.setAttribute("id", i);
            gameContainer.appendChild(card);
        }

        const restartBtn = document.createElement("button");
        restartBtn.setAttribute("type", "generic"); 
        restartBtn.setAttribute("id", "restart");
        restartBtn.textContent = "Restart button";

        main.appendChild(gameContainer);
        main.appendChild(restartBtn);
    }

    return{createBoard};
}

const screen =screenControl();
screen.createBoard();

/*We need to implement the draw condition, work on UI logic, create play-a-round function that encompasses the code   */