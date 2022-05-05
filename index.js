const imgcards= [
    'gaara.jpg',
    'itachi.jpg',
    'jiraiya.jpg',
    'kakachi.jpg',
    'naruto.jpg',
    'sakura.jpg',
    'susake.jpg'
];

let cardsHtml = '';

imgcards.forEach(img => {
    cardsHtml += `
        <div id= "card" class= "my-card" data-card= "${img}">
            <img id="cardFront" class="back" src="imagens/card-verso2.jpg" alt="frente da carta" />
            <img id="cardback" class="front" src="imagens/${img}"  alt="verso da carta" />
        </div>
    `
})

const cardsWrapper = document.getElementById('cardsWrapper');
cardsWrapper.innerHTML = cardsHtml + cardsHtml;

let cards = document.querySelectorAll('.my-card');
cards.forEach(elemCard => elemCard.addEventListener('click', rotateCard));

let firstCard, secondCard;
let block = false;

function rotateCard() {
   if(block) return false;

   this.classList.toggle('card-virar')
   if(!firstCard){
       firstCard = this;
       return false;
   }
   secondCard = this;
   hitThwoSameCards();
};

const myScore = document.getElementById('myScore');
let score = 0;

function hitThwoSameCards() {
    const sameCards = firstCard.getAttribute('data-card') === secondCard.getAttribute('data-card');
    !sameCards ? desableCards() : desableClickCards();
    if(sameCards){
        myScore.innerHTML = score += 10;
        return false;
    }
}

function desableCards() {
    block = true;
    setTimeout(() => {
        firstCard.classList.remove('card-virar');
        secondCard.classList.remove('card-virar');

        [firstCard, secondCard, block]= [null, null, false]
    }, 3000)
     
}

function desableClickCards (){
    firstCard.removeEventListener('click', rotateCard);
    secondCard.removeEventListener('click', rotateCard);

    [firstCard, secondCard, block]= [null, null, false];
    
}
