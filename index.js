let btnMyName = document.getElementById('btnMyName');
let inputWriteName = document.getElementById('writeMyName');

//Define nome e salva no localstorage

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

//Quando a pagina carregar Verificar se existe valor salvo no localstorage

window.addEventListener('load', function() {
    let localStorageName = localStorage.getItem('Name');
    if(localStorageName !== null){
        inputWriteName.innerHTML = 'Olá, Bem Vindo ';
        btnMyName.innerHTML = 'Entrar com seu nome? click aqui!'
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

//Criar cards dinamico

let cardsHtml = '';
imgcards.forEach(img => {
    cardsHtml += `
        <div id= "card" class= "my-card" data-card= "${img}">
            <img id="cardFront" class="back" src="imagens/card-verso.jpg" alt="verso da carta" />
            <img id="cardback" class="front" src="imagens/${img}"  alt="frente da carta" />
        </div>
    `
})

let cardsWrapper = document.getElementById('cardsWrapper');
cardsWrapper.innerHTML = cardsHtml + cardsHtml;

//Inicia o jogo

const start = document.querySelector('.start-wrapper');
start.addEventListener('click', startGame);

function startGame() {
   start.classList.add('z-index');
   cardsWrapper.classList.remove('z-index')

   cards.forEach(elem => {
    elem.classList.add('card-virar');
    setTimeout(()=> {  
        elem.classList.remove('card-virar'); 
    }, 5000)
})
}

//Embaralha os cards

function shuffleCards() {
    cards.forEach(card => {
      let ramdomPosition = Math.floor(Math.random() * 12);
      card.style.order = ramdomPosition;
    });
  };
 shuffleCards();

//Selecionando todos os cards e adicionando evento

let cards = document.querySelectorAll('.my-card');
cards.forEach(elemCard => elemCard.addEventListener('click', rotateCard));
let firstCard, secondCard;
let block = false;

//Adicionando rotação aos cards

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

//Verifica se os cards são iguais

function checkMatchingCards() {
    const sameCards = firstCard.getAttribute('data-card') === secondCard.getAttribute('data-card');
    !sameCards ? desableCards() : scoreAndClearEvent(); 
}

//Remove class reatribui cards

function desableCards() {
    block = true;
    setTimeout(() => {
        createDamage();
        firstCard.classList.remove('card-virar');
        secondCard.classList.remove('card-virar');
        if(lifes !== 0) [firstCard, secondCard, block]= [null, null, false]
       
    }, 2000)
}

//Incrementa pontos, remove evento e reatribui os cards

const myScore = document.getElementById('myScore');
let score = 0;

function scoreAndClearEvent(){
    myScore.innerHTML = `PONTOS ${score += 100}`;

    firstCard.removeEventListener('click', rotateCard);
    secondCard.removeEventListener('click', rotateCard);
    [firstCard, secondCard, block]= [null, null, false];
}

//Criando danos

let gameOverHtml = document.querySelector('.game-over');
const myLife = document.getElementById('myLife');
let lifes = 4;

function createDamage(){
    lifes--;
    if(lifes === 0) {
        gameOverHtml.classList.remove("z-index");
        cardsWrapper.classList.add('z-index');
        shuffleCards();
    }
    myLife.removeChild(document.getElementsByClassName('life-img')[0]);
}

//Reiniciando o jogo

let btnJogar = document.getElementById('btnJogar');
btnJogar.addEventListener('click', restartGame);
let lifesHtml = "";

function restartGame() {
    gameOverHtml.classList.add("z-index");

    for (let i = 0; i <= 3; i++) {
        if(lifes < 1) lifesHtml = "";
       
        lifes++;
        lifesHtml += `
            <div class="life-img">
                <img class="img-kunai " src="imagens/kunai.png" alt="icone kunai">
            </div>
        `    
    }
   
    cards.forEach(elem => {
        elem.classList.add('card-virar');
        setTimeout(()=> {  
            elem.classList.remove('card-virar');
            elem.addEventListener('click', rotateCard);  
        }, 5000)
    })

    myLife.innerHTML = `VIDAS ${lifesHtml}`; 
    [score, firstCard, secondCard, block]= [0, null, null, false]
    myScore.innerHTML = `PONTOS 0${score}`;
    cardsWrapper.classList.remove("z-index");
};

