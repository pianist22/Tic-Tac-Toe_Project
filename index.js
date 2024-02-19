const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newBtn = document.querySelector(".btn");
let currentPlayer;// tells about the current player

let gameGrid; // tells about the status of the game so that we can decide which will win when

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let's create a function to intialise the game intially what variables with what values do we need

function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // par hame UI pe bhisarri cheezo ko intializekarana hain
    boxes.forEach((box,index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // par hame ek orcheez ko bhi dalnapadega 
        // vo ye hain ki hame winner milne par green background show ho raha hoga jisse hame hatana hain
        box.classList.remove("win");
        box.style.pointerEvents = "all";

        // // ye karne ka ek or tarika hain ki ham saare box ki properties ko intialize kar denge uski original properties se 
        // box.classList = `box box${index+1}`;
    
    });
    newBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

// now we need to create a event Listener for all boxes so that when we click on it then it render the current player value on the box

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    // ab hame player ko swap to kar diya hain par ab hame use UI pe bhi render karna hoga
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer = "";

    winningPosition.forEach((position)=>{
        if((gameGrid[position[0]]!== "" || gameGrid[position[1]]!== "" || gameGrid[position[2]]!== "") 
        && (gameGrid[position[0]]===gameGrid[position[1]]) && (gameGrid[position[1]]===gameGrid[position[2]])){
            // check who is the winner
            if(gameGrid[position[0]]==="X"){
                answer = "X";
            }
            else answer = "O";
            
            // disable pointer Events 
            boxes.forEach((box)=>{
                box.style.pointerEvents = "none";
            })
            
            //now we know in X/O who  is a winner so we need to add the win class in those boxes
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        }
    });

    // agar hamare pass answer non empty aata hain to iska matlab hame ans mil gaya
    if(answer!==""){
        // winner ko UI pe visible karana hain 
        gameInfo.innerText = `Winner Player -${answer}`;
        // new game ke button lo bhi visible karana hain 
        newBtn.classList.add("active");
        return;
    }

    // let's check whether we don't have a winner if yes then this means the game is tied we need to render it on UI and show to new game button for the next game to start

    // here we checking wheter there is tie
    let edgeCount = 0;
    gameGrid.forEach((box)=>{
        if(box!=="") edgeCount++;
    });
    // if the board is completely filled then there is a tie
    if(edgeCount==9){
        gameInfo.innerText = `Game Tied!`;
        newBtn.classList.add("active");
    } 

}

// function which will handle when click event on the box takes place
function handleClickEvent(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // Now swap karo turn ko 
        swapTurn();
        // ek bar check kar lo ki koi jeet to nahi gaya 
        checkGameOver();
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=> {
        handleClickEvent(index);
    })
});

newBtn.addEventListener("click",initGame);