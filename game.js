const cardsColor = [
	"red", "red", 
	"green", "green", 
	"blue", "blue", 
	"yellow", "yellow", 
	"cadetblue", "cadetblue", 
	"brown", "brown", 
	"gray", "gray", 
	"lightgreen", "lightgreen", 
	"violet", "violet"];

let cards = document.querySelectorAll("div");
cards = [...cards]; //18 div's

const startTime = new Date().getTime();

let activeCard = "";
const activeCards = [];

const gamePairs = cards.length / 2;
let gameResult = 0;
let accurary = 0;

const clickCard = function() {
	activeCard = this;
	if (activeCard === activeCards[0]) return;
	activeCard.classList.remove("hidden");
	
	if (activeCards.length === 0) {
		activeCards[0] = activeCard;
        accurary++;
	} 
	else {
		cards.forEach(card => card.removeEventListener("click", clickCard));
		activeCards[1] = activeCard;
        accurary++;
		setTimeout(function() {
			if (activeCards[0].className === activeCards[1].className) {
				activeCards.forEach(card => card.classList.add("off"));
				gameResult++;
				cards = cards.filter(card => !card.classList.contains("off"));
				if (gameResult === gamePairs) {
					const endTime = new Date().getTime();
					const gameTime = (endTime - startTime)/1000;
                    const accuraryResult = 1800/accurary;
					alert(`\nUdało się! Twój wynik to: ${gameTime.toFixed(1)} secund\nSkuteczność: ${accuraryResult.toFixed(1)} %`);
					location.reload();
				}
			}
			else {
				activeCards.forEach(card => card.classList.add("hidden"));
			}
			activeCard = "";
			activeCards.length = 0;
			cards.forEach(card => card.addEventListener("click", clickCard));
		}, 500)
	}
}

// start game
const init = function() {
	cards.forEach(function(card) {
		const position = Math.floor(Math.random() * cardsColor.length);
		card.classList.add(cardsColor[position]);
		cardsColor.splice(position, 1);

		setTimeout(function() {
			cards.forEach(function(card) {
				card.classList.add("hidden");
				card.addEventListener("click", clickCard);
			})
		}, 100)
	});
	
	alert(`Are You ready ? xD`);
}

init()