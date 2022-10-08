/**
 * @but :
 * Battre la banque en ayant un mains plus élevée que le croupier
 * sans dépasser 21 points
 * 
 * Etape 1 : Choisir le montant de la mise
 * Etape 2 : Le groupier distribue 2 cartes
 *           Seul le groupier garde une carte face cachée
 * 
 * Valeur des cartes 
 * {2 :2, .. 9 :9, 10 :10, A :[1 ou 11], J :10, Q :10, K :10 }
 * A + [10 ou J ou K ou Q] = 21 = BlackJack
 * 
 * Au tour du joueur,
 * Si plus de 22, il perd la mise
 * Option 1 : possibilité de tirer des cartes 1 par 1, jusqu'à s'arrêter
 * Option 2 : il est satisfait de la mains, il pioche rien
 * Option 3 : Décide de doubler sa mise et recoit une dernier carte
 * Option 4 (pas fait) : Il a une paire, il decide de séparer la paire (en deux mains)
 *                            il double sa mise et 
 *                            recoit une carte de plus pour completer chaque main
 * 
 * Au tour du Croupier,
 * Sa main doit obligatoirement être supérieure à 16
 * Si < 16, tirer une nouvelle carte
 * Si > 16, il s'arrete
 * 
 * Main gagnant : Le joueur gagne la mise, prend au croupier
 * Main perdante : Le joueur perd la mise, donne au croupier
 *   
 */

var game;
var wpPath = "https://yohanbornes.fr/wp-content/BlackJack/";

window.onload = function () {
    game = new Game();
    document.getElementById("playBtn").addEventListener("click", function () { game.initRound()});
    document.getElementById("drawBtn").addEventListener("click", function() { game.drawButton()});
    document.getElementById("doubleBetBtn").addEventListener("click", function() { game.doubleBetButton()});
    document.getElementById("betBtn").addEventListener("click", function() { game.betButton()});
    document.getElementById("confirmBtn").addEventListener("click", function() { game.confirmButton()});
}

// document.querySelector("#valid").onclick = ()=>{game._player._bet = document.getElementById("playBtn") };