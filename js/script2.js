"use strict"

var newGameBtn = document.getElementById('js-newGameButton'),
	pickRock = document.getElementById('js-playerPick_rock'),
	pickPaper = document.getElementById('js-playerPick_paper'),
	pickScissors = document.getElementById('js-playerPick_scissors'),
	newGameBtn = document.getElementById('js-newGameButton'),
	newGameElem = document.getElementById('js-newGameElement'),
	pickElem = document.getElementById('js-playerPickElement'),
	resultsElem = document.getElementById('js-resultsTableElement'),
	playerPointsElem = document.getElementById('js-playerPoints'),
	playerNameElem = document.getElementById('js-playerName'),
	computerPointsElem = document.getElementById('js-computerPoints'),
	playerPickElem = document.getElementById('js-playerPick'),
	computerPickElem = document.getElementById('js-computerPick'),
	playerResultElem = document.getElementById('js-playerResult'),
	computerResultElem = document.getElementById('js-computerResult'),
	gameState = 'notStarted',
		player = {
			name: '',
			score: 0
		},
		computer = {
			score: 0
		};

pickRock.addEventListener('click', function() { playerPick('kamień')});
pickPaper.addEventListener('click', function() { playerPick('papier')});
pickScissors.addEventListener('click', function() { playerPick('nożyce')});
newGameBtn.addEventListener('click', newGame);

function setGameElements() {
	switch(gameState) {
		case 'started':
			newGameElem.style.display = 'none';
			pickElem.style.display = 'block';
			resultsElem.style.display = 'block';
			playerPointsElem.display = 'block';

		break;
		case 'ended':
			newGameBtn.innerText = 'Jeszcze raz?';
		case 'notStarted':
		default:
			newGameElem.style.display = 'block';
			pickElem.style.dispaly = 'none';
			resultsElem.style.display = 'none'; 
	}
}

setGameElements();

function newGame() {
	player.name = prompt('Podaj swoje imię', 'Imię');
		if (player.name) {
			player.score = computer.score = 0;
			gameState = 'started';
			setGameElements();

			playerNameElem.innerHTML = player.name;
				setGamePoints();
		}
}

function playerPick(playerPick) {
	var computerPick = getComputerPick();

	playerPickElem.innerHTML = playerPick;
	computerPickElem.innerHTML = computerPick;

	checkRoundWinner(playerPick, computerPick);
}

function getComputerPick() {
	var possiblePicks = ['kamień', 'papier', 'nożyce'];
	return possiblePicks[Math.floor(Math.random()*3)];
}

function checkRoundWinner(playerPick, computerPick) {
	playerResultElem.innerHTML = computerResultElem.innerHTML = '';

	var winnerIs = 'player';

	if (playerPick == computerPick) {
		winnerIs = 'remis'; 
		playerResultElem.innerHTML = "remis";
		computerResultElem.innerHTML = "remis";
	} else if (
		(computerPick == 'kamień' && playerPick == 'nożyce') ||
		(computerPick == 'nożyce' && playerPick == 'papier') ||
		(computerPick == 'papier' && playerPick == 'kamień')) {

		winnerIs = 'computer';
	}

	if (winnerIs == 'player') {
		playerResultElem.innerHTML = "Wygrana!";
		player.score++;
		playerPointsElem.innerHTML = player.score;
	} else if (winnerIs == 'computer') {
		computerResultElem.innerHTML = "Wygrana!";
		computer.score++;
		computerPointsElem.innerHTML = computer.score;
	}

	if (player.score == '10') {
		alert(player.name + ' Wygrałeś! '  +  ' 10 punktów!')
		gameState = 'ended'
		setGameElements()
	
	} else if (computer.score == '10' ) {
		alert('Niestety komputer wygrał! 10 punktów! Spróbuj jeszcze raz!!')
		gameState = 'ended'
		setGameElements()
		
	}
}

function setGamePoints() {
	playerPointsElem.innerHTML = player.score;
	computerPointsElem.innerHTML = computer.score;
}