class Player {
    _money;
    _score;
    _cards = [];
    _currentBet;
    _myTurn;
    constructor() {
        this._money = 100;
        this._score = 0;
        this._currentBet = 0;
        this._myTurn = false;
        this._currentBet = 0;
    }
    
    /**
     * Add a card to the player's hand
     * @param {*} card 
     */
    addCard(card) {
        this._cards.push(card);
        this._score += card.convertNametoValue(card._name);
        document.getElementById("yourLevel").innerHTML = this._score;
    }

    /**
     * - Get a new deck (new score)
     * - Re init the bet
     * - Conserve the money
     */
    initNewGame() {
        this._score = 0;
        this._cards = [];
        this._currentBet = 0;
        this._myTurn = false;
        document.getElementById("yourLevel").innerHTML = parseInt(this._score);
        document.getElementById("yourBet").innerHTML = parseInt(this._currentBet);
    }

    /**
     * Change turn and update html buttons usable for the player
     * @param {*} turn 
     */
    setTurn(turn) {
        if (turn) {
            this._myTurn = true;
            // Update html buttons
            let btn = document.getElementById("drawBtn");
            btn.style.display = "block";
            btn = document.getElementById("betBtn");
            btn.style.display = "none";
            btn = document.getElementById("doubleBetBtn");
            btn.style.display = "block";
            btn = document.getElementById("confirmBtn");
            btn.style.display = "block";
        }
        else {
            this._myTurn = false;
        }
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