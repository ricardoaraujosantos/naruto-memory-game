let btnMyName = document.getElementById('btnMyName');
let inputWriteName = document.getElementById('writeMyName');
let block = false;

//Define nome e salva no localstorage

btnMyName.addEventListener('click', definesName);

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
        inputWriteName.innerHTML = 'Olá, Bem Vindo ' + localStorageName;
        btnMyName.innerHTML = `Não é ${localStorageName}? Click!`
    }
});

//Array de imagens

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

//Adicinar cards na div

let cardsWrapper = document.getElementById('cardsWrapper');
cardsWrapper.innerHTML = cardsHtml + cardsHtml;

//Selecionando todos os cards e adicionando evento

let cards = document.querySelectorAll('.my-card');
cards.forEach(elemCard => elemCard.addEventListener('click', rotateCard));

//Inicia o jogo

const startWrapper = document.querySelector('.start-wrapper');
const start = document.getElementById('start')
start.addEventListener('click', startGame);

function startGame() {
   startWrapper.classList.add('z-index');
   cardsWrapper.classList.remove('z-index')
   block= true;

   cards.forEach(elem => {
    elem.classList.add('card-virar');
    setTimeout(()=> {  
        elem.classList.remove('card-virar'); 
        block= false;
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

//Adicionando rotação aos cards

let firstCard, secondCard;

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
    if(sameCards){
        let jutsu = new Audio('sonds/jutsu.mp3');
        jutsu.play();
    }
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
    if(score > 600)gameWin();

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
    block= true;
    gameOverHtml.classList.add("z-index");
    winWrapper.classList.add('z-index');

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
            block= false;
        }, 5000)
    })

    myLife.innerHTML = `VIDAS ${lifesHtml}`; 
    [score, firstCard, secondCard]= [0, null, null]
    myScore.innerHTML = `PONTOS 0${score}`;
    cardsWrapper.classList.remove("z-index");
};

//Vitoria no jogo continuar jogando

const winWrapper = document.querySelector('.win-wrapper');
let btnWin = document.getElementById('btnWin');
btnWin.addEventListener('click', function(){
    lifesHtml= "";
    restartGame();
})

function gameWin() { 
    if(score > 600){
        let winJutsu = new Audio('sonds/clone-jutsu.mp3');
        winJutsu.play(); 
        setTimeout(() => {
            winWrapper.classList.remove('z-index');
            cardsWrapper.classList.add('z-index')
        }, 3000)
    }
}
gameWin();