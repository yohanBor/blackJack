class Bank {
    _money;
    _score;
    _cards = [];
    _myTurn;
    constructor() {
        this._money = 100;
        this._score = 0;
        this._myTurn = true;
    }

    /**
     * Add a card to the croupier's hand
     * @param {*} card 
     */
    addCard(card) {
        this._cards.push(card);
        if(this._cards.length != 2) {
            this._score += card.convertNametoValue(card._name);
            document.getElementById("bankLevel").innerHTML = this._score;
        }
    }

    /**
     * Reveal the second card (that was hidden for the player)
     */
    reveal() {
        let card = this._cards[1];
        // Update the score
        this._score += card.convertNametoValue(card._name);
        document.getElementById("bankLevel").innerHTML = this._score;
        // Reveal the card
        let area = document.getElementById("bankCardArea");
        area.innerHTML += '<img class="card ' + card._color + '" src="https://yohanbornes.fr/wp-content/BlackJack/Flat-Playing-Cards-Set/' + card._color + '/' + card._name + '.png">';
        let revCard = document.getElementById("cardReverse");
        revCard.innerHTML = "";
    }
    
    /**
     * - Get a new deck (new score)
     * - Conserve the money
     */
    initNewGame() {
        this._score = 0;
        this._cards = [];
        this._myTurn = true;
        document.getElementById("bankLevel").innerHTML = this._score;
    }

    setTurn(turn) {
        if (turn) this._myTurn = true;
        else this._myTurn = false;
    }

    tryBlackJack() {
        let card1 = this._cards[0];
        let card2 = this._cards[1];

        if ((card1._name == 'A' || card1._name == 'J' ||
            card1._name == 'K' || card1._name == 'Q') &&
            (card2._name == 'A' || card2._name == 'J' ||
            card2._name == 'K' || card2._name == 'Q')
        ) {
            return true;
        }
        return false;
    }
}