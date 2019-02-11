/*

 BlackJackack
 By Thomas Donkor

*/
	
//define the suits and value card variables
var suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'],
	values = ['Ace', 'King', 'Queen', 'Jack',
			'Ten', 'Nine', 'Eight', 'Seven', 'Six',
			'Five', 'Four', 'Three', 'Two'];
				

//DOM variables - give information to the user
var textArea = document.getElementById('text-area'),
	newGameButton = document.getElementById('new-game-button'),
	hitButton = document.getElementById('hit-button'),
	stayButton = document.getElementById('stay-button');
	
//Game variables
//boolean values
var gameStarted = false,
	gameOver = false,
	playerWon = false,
	//array values
	dealerCards = [],
	playerCards = [],
	//scores to track
	dealerScore = 0,
	playerScore = 0,
	deck = []; //empty deck of cards
	
	
	// at start of game hide the Hit and Stay button
	hitButton.style.display = 'none';  // remove element from display
	stayButton.style.display = 'none'; // remove element from display
	showStatus();

	//************* */LISTENERS******************************//
	
	/*** START A NEW GAME    ***/
    //set up a handler for the new game button
    newGameButton.addEventListener('click', function() {
    //set game boolean variables on new game 
	gameStarted = true;
	gameOver = false;
	playerWon = false;
	
	deck = createDeck(); // load the deck of 52 cards
	shuffleDeck(deck);   // shuffle the deck
	
	//get deals and player cards start off with 2 cards each
	dealerCards = [getNextCard(), getNextCard()];
	playerCards = [getNextCard(), getNextCard()];
	
	//Hide the new game button and display the 
	// hit and stay buttons
	
	newGameButton.style.display = 'none'; // remove element from display - use block to add it back
	hitButton.style.display = 'inline';
	stayButton.style.display = 'inline';
	showStatus();
});  //end of newgame eventlistener


hitButton.addEventListener('click', function() {
	playerCards.push(getNextCard());
	checkForEndOfGame();
	showStatus();
})

stayButton.addEventListener('click', function() {
	gameOver = true;
	checkForEndOfGame();
	showStatus();
})

//******************* */functions *************************//
	/** define the deck **/
	function createDeck(){
		//clear out the deck
		let deck = [];
		for(let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
			for(let valueIdx = 0; valueIdx < values.length; valueIdx++) {
				//create an array of real cards instead of strings
				 let card = {
					 suit: suits[suitIdx],
					 value: values[valueIdx]
				 };
				deck.push(card);
			}
		}
		return deck;
	}
	
	
	/***  returns the card value and suit ***/
	function getCardString(card) {
		return card.value + ' of ' + card.suit;
	}
	
	/*** Shuffle the Cards ***/
	// loop through every card in the deck
	// take first card in the deck and swap it with a random card in the deck
	// we want to go through the whole deck in this way
	// swapIdx
	//
	function shuffleDeck(deck) {
	    for(var i = 0; i < deck.length; i++) {
            var swapIdx = Math.trunc(Math.random() * deck.length);
            var tmp = deck[swapIdx];
            deck[swapIdx] = deck[i];
			deck[i] = tmp;
		}
	}
	
	
	//get the next card from the deck
	function getNextCard() {
		return deck.shift();
	}
	
	function getCardNumericValue(card) {
		switch(card.value) {
			case 'Ace':
			return 1;
			case 'Two':
			return 2;
			case 'Three':
			return 3;
			case 'Four':
			return 4;
			case 'Five':
			return 5;
			case 'Six':
			return 6;
			case 'Seven':
			return 7;
			case 'Eight':
			return 8;
			case 'Nine':
			return 9;
			default:
			return 10;
			
		}
	}

	function getScore(cardArray){

		var score = 0;
		var hasAce = false;
		for(var i = 0; i < cardArray.length; i++ ){
			var card = cardArray[i];
			score += getCardNumericValue(card);
			if(card.value ==='Ace'){
				hasAce = true;
			}
		}
		if(hasAce && score + 10 <=21 ){
			return score + 10;
		}
		return score;
	}

	function updateScores() {
		dealerScore = getScore(dealerCards);
		playerScore = getScore(playerCards);
	}

	function checkForEndOfGame() {
		updateScores();
		if (gameOver){
			//let dealer take cards
			while(dealerScore < playerScore
				&& playerScore <= 21
				&& dealerScore <=21) { 
					dealerCards.push(getNextCard());
					updateScores();
			}
		}

		if(playerScore > 21){
			playerWon =false;
			gameOver = true;
		}
		else if (dealerScore > 21) {
				playerWon = true;
				gameOver = true;
		}
		else if (gameOver) {
			if(playerScore > dealerScore) {
				playerWon = true;
			}
		}
	}

	// Sets up the paragraph for the game started
	function showStatus() {
		if(!gameStarted) {  //if the game is not started execute the code
			textArea.innerText = 'Welcome to Blackjack!';
			return;
		}

		var dealerCardString = '';
		for(var i = 0; i < dealerCards.length; i++){
			dealerCardString += getCardString(dealerCards[i] )+ '\n';
		}

		var playerCardString = '';
		for(var i = 0; i < playerCards.length; i++){
			playerCardString += getCardString(playerCards[i]) + '\n';
		}

		updateScores();

		textArea.innerText = 
		'Dealer has \n' + 
		dealerCardString + 
		'(score: ' + dealerScore + ')\n\n' + 

		'Player has \n' + 
		playerCardString + 
		'(score: ' + playerScore + ')\n\n';

		if(gameOver){
			if (playerWon){
				textArea.innerText += "YOU WIN!";
			}
			else {
				textArea.innerText += "DEALER WINS";
			}
			newGameButton.style.display = 'inline';
			hitButton.style.display = 'none';
			stayButton.style.display = 'none';
		}
	 /*this is a test to show the 52 cards shuffled
	    for(var i=0, i; deck.length; i++) {
		   textArea.innerText += '\n' + getCardString(deck[i]);
	   } */
	}

	 
