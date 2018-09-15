/*
YOUR 3 CHALLENGES
Change the game to follow these rules:
1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
var scores, roundScore, activePlayer, gamePlaying,nameOne,nameTwo, gameLength;
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

init();

document.querySelector('.btn-roll').addEventListener('click',function(){
    if(gamePlaying){
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
        
        roundScore+=(dice1*4);
        document.querySelector('#current-' + activePlayer).textContent = roundScore;

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