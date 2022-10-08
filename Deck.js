class Deck {
    _cardDeck = [];
    _color = ["Clubs", "Diamonds", "Hearts", "Spades"];
    _name = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A', 'J', 'K', 'Q'];
    constructor() {
        for (var indexCol in this._color)
            for (var indexName in this._name) {
                let color = this._color[indexCol];
                let name = this._name[indexName];
                this._cardDeck.push(new Card(color, name));
            }
        this.shuffle(this._cardDeck);
    }

    shuffle(deck) {
        let currentIndex = deck.length, randomIndex;
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // And swap it with the current element.
            [deck[currentIndex], deck[randomIndex]] = [deck[randomIndex], deck[currentIndex]];
        }
        return deck;
    }

    /**
     * Remove a card from the deck (drew by the player or the croupier)
     * @returns the card drew
     */
    removeCard() {
        return this._cardDeck.pop();
    }
}