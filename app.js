/*
YOUR 3 CHALLENGES
Change the game to follow these rules:
1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
var scores, roundScore, activePlayer, gamePlaying,nameOne,nameTwo, gameLength;

//----- Get User Values
nameOne = document.querySelector('#player-0-name').value;
nameTwo = document.querySelector('#player-1-name').value;
gameLength = document.querySelector('#game-length').value;

document.querySelector('#win-score').textContent = gameLength;

document.querySelector('.btn-close').addEventListener('click',function(){
document.querySelector('.options').style.display = 'none';
nameOne = document.querySelector('#player-0-name').value;
nameTwo = document.querySelector('#player-1-name').value;
gameLength = document.querySelector('#game-length').value;
document.getElementById('name-0').textContent = nameOne;
document.getElementById('name-1').textContent = nameTwo;
document.querySelector('#win-score').textContent = gameLength;
});
let player1 = [0,0,0];
let player2 = [0,0,0];
let score0Save = 0;
let score1Save = 0;
let doubleArr = [];
let saved = false;
let canSave = false;

init();


function updateSavedScore(){
    if(activePlayer === 0){
        if(player1[0] === player1[1] && player1[0] === player1[2]){
            score0Save = (player1[0]+player1[1]+player1[2])*3;
        }else if(player1[0] === player1[1] || player1[0] === player1[2] && player1 !== 0){
            score0Save = (player1[0]+player1[1]+player1[2])*2
        }else if(player1[1] === player1[2] && player1[1] !== 0){
            score0Save = (player1[0]+player1[1]+player1[2])*2
        }else{
            score0Save = (player1[0]+player1[1]+player1[2]);
        }
    }else if(activePlayer === 1){
        if(player2[0] === player2[1] && player2[0] === player2[2]){
            score1Save = (player2[0]+player2[1]+player2[2])*3
        }else if(player2[0] === player2[1] || player2[0] === player2[2] && player2 !== 0){
            score1Save = (player2[0]+player2[1]+player2[2])*2
        }else if(player2[1] === player2[2] && player2[1] !== 0){
            score1Save = (player2[0]+player2[1]+player2[2])*2
        }else{
            score1Save = (player2[0]+player2[1]+player2[2]);
        }
    }
    document.querySelector('#score-0-save').textContent = score0Save;
    document.querySelector('#score-1-save').textContent = score1Save;
}

document.querySelector('.btn-roll').addEventListener('click',function(){
    if(gamePlaying){
        saved = false;
        canSave = false;
// 1. Generate random number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
// 2. Display dice
    var dice1DOM = document.querySelector('#dice-1');
    dice1DOM.style.display = 'block';
    dice1DOM.src = 'dice-' + dice1 + '.png';
    var dice2DOM = document.querySelector('#dice-2');
    dice2DOM.style.display = 'block';
    dice2DOM.src = 'dice-' + dice2 + '.png';
// 3. Update result if the rolled number is other then 1
    if(dice1 === 1 && dice2 === 1){
    scores[activePlayer] = 0;
    document.querySelector('#score-'+activePlayer).textContent = '0';
    nextPLayer();
    }
    else if(dice1 === dice2){
        canSave = true;
        roundScore+=(dice1*4);
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        dice1DOM.src = `dice-${dice1}-save.png`;
        dice2DOM.src = `dice-${dice2}-save.png`;
        doubleArr.push(dice1);
    }
    else if(dice1 !== 1 && dice2 !== 1){
        roundScore += dice1+dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
    else{
        nextPLayer();
        }
    }
});

document.querySelector('#dice-1').addEventListener("click",function(){
    if(activePlayer === 0 && !saved && canSave){
        saved = true;
        for(let i = 0;i < player1.length;i++){
            if(player1[i] === 0){
                player1[i] = doubleArr[doubleArr.length-1];
                document.querySelector(`#hold-0-${i}`).src = `dice-${doubleArr[doubleArr.length-1]}-save.png`;
                updateSavedScore()
                attack();
                break;
            }
        }
    }
    else if(activePlayer === 1 && !saved && canSave){
        saved = true;
        for(let i = 0;i < player2.length;i++){
            if(player2[i] === 0){
                player2[i] = doubleArr[doubleArr.length-1];
                document.querySelector(`#hold-1-${i}`).src = `dice-${doubleArr[doubleArr.length-1]}-save.png`;
                updateSavedScore()
                attack();
                break;
            }
        }
    }
})

document.querySelector('.btn-hold').addEventListener('click',function(){
    if(gamePlaying){
// 1. Add curent score to global score
    scores[activePlayer] += roundScore;
// 2. Update user interface
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
// 3. Check if player won the game
    if (scores[activePlayer] >= gameLength){
        document.getElementById('name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('#dice-1').style.display = 'none';
        document.querySelector('#dice-2').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        document.querySelector('.player-' + activePlayer + '-panel').classList.add ('winner')
        gamePlaying = false;
        }
    else{
        nextPLayer();
        }
    }   
});
    function nextPLayer(){
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
    };
document.querySelector('.btn-new').addEventListener('click',init)

    function init(){
        player1 = [0,0,0];
        player2 = [0,0,0];
        scores = [0,0];
        roundScore = 0;
        activePlayer = 0;
        document.querySelector('#dice-1').style.display = 'none';
        document.querySelector('#dice-2').style.display = 'none';
        document.getElementById('score-0').textContent = '0';
        document.getElementById('score-1').textContent = '0';
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        document.getElementById('name-0').textContent = nameOne;
        document.getElementById('name-1').textContent = nameTwo;
        document.querySelector('.player-0-panel').classList.remove('winner');
        document.querySelector('.player-1-panel').classList.remove('winner');
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('active');
        document.querySelector('.options').style.display = 'none';
        document.querySelector('#hold-0-0').src = `dice-empty.png`;
        document.querySelector('#hold-0-1').src = `dice-empty.png`;
        document.querySelector('#hold-0-2').src = `dice-empty.png`;
        document.querySelector('#hold-1-0').src = `dice-empty.png`;
        document.querySelector('#hold-1-1').src = `dice-empty.png`;
        document.querySelector('#hold-1-2').src = `dice-empty.png`;
        document.querySelector('#score-0-save').textContent = 0;
        document.querySelector('#score-1-save').textContent = 0;
        document.querySelector('.attack-0').style.display = "none";
        document.querySelector('.attack-1').style.display = "none";
        gamePlaying = true;
    };
    document.querySelector('.btn-options').addEventListener('click',function(){
        document.querySelector('.options').style.display = 'block';
        });
        document.querySelector('.btn-rules').addEventListener('click',function(){
        document.querySelector('.rules').style.display = 'block';
        document.querySelector('#dice-1').style.display = 'none';
        document.querySelector('#dice-2').style.display = 'none';

        });
        document.querySelector('.btn-close-rules').addEventListener('click',function(){
        document.querySelector('.rules').style.display = 'none';
        if(scores[0,1]!==0 || roundScore !==0){
        document.querySelector('#dice-1').style.display = 'block';
        document.querySelector('#dice-2').style.display = 'block';
        };
        document.querySelector()
        });

        function attack(){
            if(player1[0] !== 0 && player1[1] !== 0 && player1[2] !== 0){
                document.querySelector('.attack-0').style.display = "block";
            }else if(player2[0] !== 0 && player2[1] !== 0 && player2[2] !== 0){
                document.querySelector('.attack-1').style.display = "block";
            }
        }

        document.querySelector('.attack-0').addEventListener("click",function(){
            if(activePlayer === 0 && score0Save < scores[1]){
                scores[1]-=score0Save;
                document.getElementById('score-1').textContent = scores[1];
                document.querySelector('#hold-0-0').src = `dice-empty.png`;
                document.querySelector('#hold-0-1').src = `dice-empty.png`;
                document.querySelector('#hold-0-2').src = `dice-empty.png`;
                player1 = [0,0,0];
                score0Save = 0;
                document.querySelector('.attack-0').style.display = "none";
                document.querySelector('#score-0-save').textContent = 0;
            }else if(activePlayer === 0 && score0Save >= scores[1]){
                scores[1] = 0;
                document.getElementById('score-1').textContent = scores[1];
                document.querySelector('#hold-0-0').src = `dice-empty.png`;
                document.querySelector('#hold-0-1').src = `dice-empty.png`;
                document.querySelector('#hold-0-2').src = `dice-empty.png`;
                player1 = [0,0,0];
                score0Save = 0;
                document.querySelector('.attack-0').style.display = "none";
                document.querySelector('#score-0-save').textContent = 0;
            }
        })
        document.querySelector('.attack-1').addEventListener("click",function(){
            if(activePlayer === 1 && score1Save < scores[0]){
                scores[0]-=score1Save;
                document.getElementById('score-0').textContent = scores[0];
                document.querySelector('#hold-1-0').src = `dice-empty.png`;
                document.querySelector('#hold-1-1').src = `dice-empty.png`;
                document.querySelector('#hold-1-2').src = `dice-empty.png`;
                player2 = [0,0,0];
                score1Save = 0;
                document.querySelector('.attack-1').style.display = "none";
                document.querySelector('#score-1-save').textContent = 0;

            }else if(activePlayer === 1 && score1Save >= scores[0]){
                scores[0] = 0;
                document.getElementById('score-0').textContent = scores[0];
                document.querySelector('#hold-1-0').src = `dice-empty.png`;
                document.querySelector('#hold-1-1').src = `dice-empty.png`;
                document.querySelector('#hold-1-2').src = `dice-empty.png`;
                player2 = [0,0,0];
                score1Save = 0;
                document.querySelector('.attack-1').style.display = "none";
                document.querySelector('#score-1-save').textContent = 0;
            }
        })