/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
const deck = document.querySelector('.deck');
const cards = document.querySelectorAll('.card');

let firstCard, secondCard;
let openedCard = false;
let blockedClick = false;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

deck.addEventListener('click', function (event) {	

	//verifica se está clicando em uma carta
	if (event.target.classList[0] !== 'card') return;

	//bloquear caso duas cartas viradas;
	if (blockedClick) return;	

	//caso carta já virada não irá verificar novamente
	if (event.target.classList.contains('match','open')) return;	

	show(event);

	if (!openedCard) {
		openedCard = true;
		firstCard = event.target;

		return;
	}
	
	blockedClick = true;
	secondCard = event.target;
	openedCard = false;

	compare();
});	


function show (event) {	

	event.target.classList.add('open','show');	

}

function compare () {	

	setTimeout(() => {
		
		if (firstCard.firstElementChild.classList[1] === secondCard.firstElementChild.classList[1]) {
			match();
		} else {
			close();
		}

	},800);

}

function match () {		
		
	firstCard.classList.remove('show');
	secondCard.classList.remove('show');

	firstCard.classList.add('match');
	secondCard.classList.add('match');

	blockedClick = false;

}

function close () {

	firstCard.classList.remove('open','show');
	secondCard.classList.remove('open','show');
	blockedClick = false;

}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */