/*
GAME RULES:

- The game has 2 players, playing in rounds.

- In each turn, a player rolls two dices as many times as he whishes. Each result get added to his ROUND score.

- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn.

- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn.

- The first player to reach the Final Score wins the game (100 points by default).

- A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn.

- Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100.
*/

var numeros, scores, activePlayer, diceUno, diceDos, segDiceUno, segDiceDos, suma;
var game = 0;

init();




document.querySelector('.btn-roll').addEventListener('click',function(){
    if (game == 1){

    // Math.floor(Math.random() * (max - min + 1)) + min;
    diceUno = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    segDiceUno = Math.floor(Math.random() * (6 - 1 + 1)) + 1;

    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';

    if ((diceUno == 6 && diceDos == 6) || (segDiceUno == 6 && segDiceDos == 6)){
        scores[activePlayer] = 0;
        document.getElementById('score-' + activePlayer).innerHTML = scores[activePlayer];
        nextPlayer();
    } else if (diceUno === 1 || segDiceUno === 1){
        document.getElementById('dice-1').src = 'dice-' + diceUno + '.png';
        document.getElementById('dice-2').src = 'dice-' + segDiceUno + '.png';
        nextPlayer();

    }
    else {
        document.getElementById('dice-1').src = 'dice-' + diceUno + '.png';
        document.getElementById('dice-2').src = 'dice-' + segDiceUno + '.png';
        suma = diceUno + segDiceUno;
        numeros[activePlayer] = numeros[activePlayer] + suma;
        document.getElementById('current-' + activePlayer).innerHTML = numeros[activePlayer];
        diceDos = diceUno;
        segDiceDos = segDiceUno;
    }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if (game === 1){
        scores[activePlayer] = numeros[activePlayer] + scores[activePlayer];
        document.getElementById('score-' + activePlayer).innerHTML = scores[activePlayer];

    var input = document.querySelector('.final-score').value;

    if (input){
        var winningScore = input;
    }else{
        winningScore = 100;
    }

    if (scores[activePlayer] >= winningScore){
        document.getElementById('name-' + activePlayer).innerHTML = 'Winner!!';
        document.querySelector('.player-' + activePlayer +'-panel').classList.toggle('winner');
        game = 0;
    }
        else{
            numeros[activePlayer] = 0;
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click',init);

function nextPlayer(){
    document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');
    document.getElementById('current-' + activePlayer).innerHTML = 0;
    diceDos = 0;
    segDiceDos = 0;
    numeros[activePlayer] = 0;
    activePlayer ^= 1;
    document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

function init(){
    numeros = [0,0];
    scores = [0,0];
    activePlayer = 0;
    diceUno = 0;
    diceDos = 0;
    segDiceUno = 0;
    segDiceDos = 0;
    suma = 0;
    game ^= 1;
    document.getElementById('score-0').innerHTML = 0;
    document.getElementById('score-1').innerHTML = 0;
    document.getElementById('current-0').innerHTML = 0;
    document.getElementById('current-1').innerHTML = 0;
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.getElementById('name-0').innerHTML = 'Player 1';
    document.getElementById('name-1').innerHTML = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
