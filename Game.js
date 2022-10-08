class Game {
    _round;
    _player;
    _bank;
    _deck;
    _hasBeenInit;
    constructor() {
        this._round = 1;
        this._player = new Player();
        this._bank = new Bank();
        this._deck = new Deck();
        this._hasBeenInit = false;
    }

    addCard() {
        let curCard;
        if (this._bank._myTurn) {
            let area = document.getElementById("bankCardArea");
            curCard = this._deck.removeCard();
            this._bank.addCard(curCard);
            area.innerHTML += '<img class="card ' + curCard._color + '" src="https://yohanbornes.fr/wp-content/BlackJack/Flat-Playing-Cards-Set/' + curCard._color + '/' + curCard._name + '.png">';
        }
        else {
            if (this._player._myTurn && this._player._score < 21) {
                let area = document.getElementById("playerCardArea");
                curCard = this._deck.removeCard();
                this._player.addCard(curCard);
                area.innerHTML += '<img class="card ' + curCard._color + '" src="https://yohanbornes.fr/wp-content/BlackJack/Flat-Playing-Cards-Set/' + curCard._color + '/' + curCard._name + '.png">';
            }
        }
        this.tryEvent();
    }

    /**
     * Distribute the firsts cards to the croupier and to the player
     * The second card of the croupier is hidden for the player.
     */
    async initRound() {
        let curCard;
        // Bank set
        this.addCard();
        // Reverse card at first round
        curCard = this._deck.removeCard();
        this._bank.addCard(curCard);
        let area = document.getElementById("bankCardArea");
        area.innerHTML += '<div id="cardReverse"><img  class="card reverse' + '" src="https://yohanbornes.fr/wp-content/BlackJack/Flat-Playing-Cards-Set/Back Covers/Sun Flower.png"></div>';

        this._bank.setTurn(false);
        this._player.setTurn(true);

        // Player set
        this.addCard();
        this.addCard();
        // Check Black Jack only in the initialize (first 2 cards)
        if (this._player.tryBlackJack() ) {
            await this.sleep(2000);
            this._bank.reveal();
            await this.sleep(2000);
            if (this._bank.tryBlackJack()) {
                this.simpleSwalQuit('Black Jack ! Oups... The croupier too');
                await this.sleep(3000);
                this.next();
            } else {
                this.simpleSwalQuit('Black Jack !');
                this._player._money += this._player._currentBet * 1.5;
                this._bank._money -= this._player._currentBet * 1.5;
                // await this.sleep(4000);
                document.getElementById("yourMoney").innerHTML = parseInt(this._player._money);
                document.getElementById("bankMoney").innerHTML = parseInt(this._bank._money);
                document.getElementById("yourBet").innerHTML = parseInt(this._player._currentBet);
                game.nextRound();
            }
        }
        this._hasBeenInit = true;
        document.getElementById("playBtn").style.display = "none";
    }

    /**
     * Re init the game conserving the money of the player
     */
    nextRound() {
        this._player.initNewGame();
        this._bank.initNewGame();
        this._hasBeenInit = false;
        let area = document.getElementById("bankCardArea");
        area.innerHTML = '';
        area = document.getElementById("playerCardArea");
        area.innerHTML = '';
        this._round++;
        document.getElementById("round").innerHTML = this._round;
        document.getElementById("playBtn").style.display = "block";
        document.getElementById("betBtn").style.display = "block";
        document.getElementById("confirmBtn").style.display = "none";
        document.getElementById("doubleBetBtn").style.display = "none";
        this._deck = new Deck();
    }

    /**
     * Try the player score and execute an alert if it is over 21
     */
    tryEvent() {
        if (this._player._score > 21) {
            Swal.fire({
                title: 'Round lost !',
                text: 'Score : ' + this._player._score,
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Continue',
                denyButtonText: 'Quit',
            }).then((result) => {
                if (result.isConfirmed) {
                    this._player._money -= this._player._currentBet;
                    this._bank._money += this._player._currentBet;
                    document.getElementById("yourMoney").innerHTML = parseInt(this._player._money);
                    document.getElementById("bankMoney").innerHTML = parseInt(this._bank._money);
                    document.getElementById("yourBet").innerHTML = parseInt(this._player._currentBet);
                    game.nextRound();
                } else if (result.isDenied) {
                        this.quitButton();             
                }
            });
        }
    }

    /**
     * Functionalities and html related to the 'quit button'
     */
    quitButton() {
        game = new Game();
        // reset HTML
        let area = document.getElementById("bankCardArea");
        area.innerHTML = '';
        area = document.getElementById("playerCardArea");
        area.innerHTML = '';
        document.getElementById("yourLevel").innerHTML = "0";
        document.getElementById("yourMoney").innerHTML = parseInt(game._player._money);
        document.getElementById("bankMoney").innerHTML = parseInt(game._bank._money);
        document.getElementById("yourBet").innerHTML = "0";
        document.getElementById("bankLevel").innerHTML = "0";
        document.getElementById("round").innerHTML = parseInt(game._round);
        document.getElementById("playBtn").style.display = "block";
        document.getElementById("confirmBtn").style.display = "none";
        document.getElementById("doubleBetBtn").style.display = "none"; 
        document.getElementById("betBtn").style.display = "block";  
    }

    /**
     * Functionalities and html related to the 'draw card button'
    */
    drawButton() { 
        if (this._hasBeenInit) this.addCard(); 
    }

    /**
     * Functionalities and html related to the 'double bet button'
    */
    doubleBetButton() {
        if (this._player._currentBet * 2 <= this._player._money) {
            this._player._currentBet *=2;
            document.getElementById("yourBet").innerHTML = parseInt(this._player._currentBet);
            this.addCard();
        }
    }

    /**
     * Functionalities and html related to the 'bet button'
    */
    betButton() {
        if (this._player._money >= this._player._currentBet + 10 ) {
            this._player._currentBet += 10;
            document.getElementById("yourBet").innerHTML = parseInt(this._player._currentBet);
        }  
    }

    /**
     * Functionalities and html related to the 'confirm button'
    */
    async confirmButton() {
        this._bank.reveal();
        this._player.setTurn(false);
        this._bank.setTurn(true);
        document.getElementById("bankText").innerHTML = "Bank turn !";
        document.getElementById("bankText").style.display = "block";
        await this.sleep(2000);
        while (this._bank._score < 17) {
            this.addCard();
            await this.sleep(2000);
        }
        
        document.getElementById("bankText").innerHTML = "Check ...";
        await this.sleep(3000);
        document.getElementById("bankText").innerHTML ="";
        document.getElementById("bankText").style.display = "none";

        if (this._player._score > this._bank._score) {
            this.simpleSwalQuit('Round win !');
            this._player._money += this._player._currentBet;
            this._bank._money -= this._player._currentBet;
            document.getElementById("yourMoney").innerHTML = parseInt(this._player._money);
            document.getElementById("bankMoney").innerHTML = parseInt(this._bank._money);
            document.getElementById("yourBet").innerHTML = parseInt(this._player._currentBet);
            game.nextRound();
        }
        else if (this._player._score < this._bank._score && this._bank._score <= 21) {
            this.simpleSwalQuit('Round lost !');
            this._player._money -= this._player._currentBet;
            this._bank._money += this._player._currentBet;
            document.getElementById("yourMoney").innerHTML = parseInt(this._player._money);
            document.getElementById("bankMoney").innerHTML = parseInt(this._bank._money);
            document.getElementById("yourBet").innerHTML = parseInt(this._player._currentBet);
            game.nextRound();
        }
        else if (this._player._score < this._bank._score && this._bank._score > 21) {
            this.simpleSwalQuit('Round win !');
            this._player._money += this._player._currentBet;
            this._bank._money -= this._player._currentBet;
            document.getElementById("yourMoney").innerHTML = parseInt(this._player._money);
            document.getElementById("bankMoney").innerHTML = parseInt(this._bank._money);
            document.getElementById("yourBet").innerHTML = parseInt(this._player._currentBet);
            game.nextRound();
        }
        else if (this._player._score ==  this._bank._score) {
            this.simpleSwalQuit('Equality !');
            this._player._money += this._player._currentBet;
            this._bank._money -= this._player._currentBet;
            document.getElementById("yourMoney").innerHTML = parseInt(this._player._money);
            document.getElementById("bankMoney").innerHTML = parseInt(this._bank._money);
            document.getElementById("yourBet").innerHTML = parseInt(this._player._currentBet);
            game.nextRound();
        }
    }

    /**
     * Display a custom alert
     * @param {*} msg message to display
     */
    simpleSwalQuit(msg) {
        Swal.fire({
            title: msg,
            text: 'Score : ' + this._player._score,
            showDenyButton: true,
            denyButtonText: 'Quit'
        }).then((result) => {
            if (result.isDenied) {
                this.quitButton();              
        }});
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}