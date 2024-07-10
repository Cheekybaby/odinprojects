// Function to compute the computer choice
function getcomputerinput() {
    const computer = Math.floor(Math.random() * 3);

    if (computer === 0){
        return "rock";
    } else if (computer === 1){
        return "paper";
    } else {
        return "scissor";
    }
}

// Variable to store the scores
let humanScore = 0; // Calculates the user's score
let computerScore = 0; // Calculates the computer's score

// The PlayGame Function
function playGame() {
    // Reference to score show variable
    const humanScoreShow = document.querySelector(".humanScoreBoard");
    const computerScoreShow = document.querySelector(".computerScoreBoard");
    const roundWinnerShow = document.querySelector(".round-winner");

    // Registering Human Choice
    let choiceButtons = document.querySelector(".HumanChoice");
    choiceButtons.addEventListener("click", (event) => {
        let target = event.target.closest(".choices");
        
        if (!target) return;

        if (humanScore === 5 || computerScore === 5){
            humanScore = 0;
            computerScore = 0;
            humanScoreShow.textContent = `${humanScore}`;
            computerScoreShow.textContent = `${computerScore}`;
        }

        switch(target.id){
            case "rock":
                break;
            case "paper":
                break;
            case "scissor":
                break;
        }

        scoreBoard(target.id, getcomputerinput());
    });

    function scoreBoard(humanChoice, computerChoice){
        const drawGame = `Game Drawn!!`;
        const humanWin = `You Win!!`;
        const compWin = `Computer Win!!`;
        if ((humanChoice === "rock" && computerChoice === "rock") ||
            (humanChoice === "paper" && computerChoice === "paper") ||
            (humanChoice === "scissor" && computerChoice === "scissor")
        ){
            console.log(drawGame);
            roundWinnerShow.textContent = `${drawGame}`;
        } else if (humanChoice === "paper" && computerChoice === "rock"){
            console.log(humanWin);
            ++humanScore;
            humanScoreShow.textContent = `${humanScore}`;
            roundWinnerShow.textContent = `${humanWin}`;
        } else if (humanChoice === 'paper' && computerChoice === 'scissor'){
            console.log(compWin);
            ++computerScore;
            computerScoreShow.textContent = `${computerScore}`;
            roundWinnerShow.textContent = `${compWin}`;
        } else if (humanChoice === "rock" && computerChoice === "paper"){
            console.log(compWin);
            ++computerScore;
            computerScoreShow.textContent = `${computerScore}`;
            roundWinnerShow.textContent = `${compWin};`
        } else if (humanChoice === "rock" && computerChoice === "scissor"){
            console.log(humanWin);
            ++humanScore;
            humanScoreShow.textContent = `${humanScore}`;
            roundWinnerShow.textContent = `${humanWin}`;
        } else if (humanChoice === "scissor" && computerChoice === "paper"){
            console.log(humanWin);
            ++humanScore;
            humanScoreShow.textContent = `${humanScore}`;
            roundWinnerShow.textContent = `${humanWin}`;
        } else if (humanChoice === "scissor" && computerChoice === "rock"){
            console.log(compWin);
            ++computerScore;
            computerScoreShow.textContent = `${computerScore}`;
            roundWinnerShow.textContent = `${compWin}`;
        }

        if (humanScore === 5) {
            roundWinnerShow.textContent = `Game's Up, You Win!!`;
            console.log(`You Win!!`);
        } else if (computerScore === 5){
            roundWinnerShow.textContent = `Game's Up, Computer Wins!!`;
            console.log(`Computer Wins!!`);
        }
    }
}

playGame();