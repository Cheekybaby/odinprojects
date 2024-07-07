function getcomputerinput(computer) {
    computer = Math.floor(Math.random() * 3);

    switch(computer){
        case 0:
            return "ROCK";
        case 1:
            return "PAPER";
        case 2:
            return "SCISSOR";
    }
}

function gethumaninput(player) {
    player = prompt("ENTER YOUR CHOICE: ");

    return player.toUpperCase();
}

function game(player, computer) {
    let scoreP = 0, scoreC = 0;
    for (i=0; i<5; i+=1){
        player = gethumaninput();
        computer = getcomputerinput();

        if (player === computer){
            alert(`TIE!!
                Player : Computer :: ${ scoreP } : ${ scoreC }`);
        } else if ((player === "ROCK" && computer === "SCISSOR") || (player === "PAPER" && computer === "ROCK") || (player === "SCISSOR" && computer === "PAPER")){
            scoreP+=1;
            alert(`Player : Computer :: ${scoreP} : ${scoreC}`);
        } else {
            scoreC+=1;
            alert(`Player : Computer :: ${scoreP} : ${scoreC}`);
        }

        if (scoreP == 3 || scoreC == 3){
            break;
        }
    }

    if (scoreP == 3 || scoreP > scoreC){
        alert("You Win!!!");
    } else if (scoreC == 3 || scoreC > scoreP){
        alert("You Lose!!!");
    } else {
        alert("It's a TIE!!!");
    }
}
game();