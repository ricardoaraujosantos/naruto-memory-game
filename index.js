let btnMyName = document.getElementById('btnMyName');
let inputWriteName = document.getElementById('writeMyName');

function definesName() {
    let promptName = prompt('Por favor, Digite seu nome!');
    localStorage.setItem('Name', promptName);
    let nameSaved = localStorage.getItem('Name');
    
    if(!localStorage.getItem('Name') || !promptName){
        definesName();
    }else{  
        inputWriteName.innerHTML = 'Olá, Bem Vindo ' + nameSaved;
        btnMyName.innerHTML = `Não é ${nameSaved}? Click!`
    }
}

window.addEventListener('load', function() {
    let localStorageName = localStorage.getItem('Name');
    if(localStorageName !== null){
        inputWriteName.innerHTML = 'Olá, Bem Vindo ' + localStorageName;
        btnMyName.innerHTML = `Não é ${localStorageName}? Click!`
    }
});

btnMyName.addEventListener('click', definesName);

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
            <img id="cardFront" class="back" src="imagens/card-verso.jpg" alt="verso da carta" />
            <img id="cardback" class="front" src="imagens/${img}"  alt="frente da carta" />
        </div>
    `
})

const cardsWrapper = document.getElementById('cardsWrapper');
cardsWrapper.innerHTML = cardsHtml + cardsHtml;

let cards = document.querySelectorAll('.my-card');
cards.forEach(elemCard => elemCard.addEventListener('click', rotateCard));

function shuffleCards() {
    cards.forEach(card => {
      let ramdomPosition = Math.floor(Math.random() * 12);
      card.style.order = ramdomPosition;
    });
  };
 shuffleCards();

let firstCard, secondCard;
let block = false;

function rotateCard() {
   if(block) return false;
   if(this === firstCard) return false;
   
   this.classList.toggle('card-virar');
   
   if(!firstCard){ 
       firstCard = this;
       return false;
   }
   secondCard = this;
   checkMatchingCards();
};

function checkMatchingCards() {
    const sameCards = firstCard.getAttribute('data-card') === secondCard.getAttribute('data-card');
    !sameCards ? desableCards() : scoreAndClearEvent(); 
}

function desableCards() {
    block = true;
    createDamage();
    setTimeout(() => {
        firstCard.classList.remove('card-virar');
        secondCard.classList.remove('card-virar');
        if(gameOver !== 0) [firstCard, secondCard, block]= [null, null, false]
       
    }, 2000)

}

let gameOver = 4;

function createDamage(){
    if(gameOver === 0) block= true; 
    gameOver--;
    const remove = document.getElementById('myLife');
    remove.removeChild(document.getElementsByClassName('life-img')[0]);
}



const myScore = document.getElementById('myScore');
let score = 0;

function scoreAndClearEvent(){
    myScore.innerHTML = `Score: ${score += 100}`;

    firstCard.removeEventListener('click', rotateCard);
    secondCard.removeEventListener('click', rotateCard);
    [firstCard, secondCard, block]= [null, null, false];
}

// Next step Game Over