const cards = document.querySelectorAll('.memoryCard')
cards.forEach(card => card.addEventListener('click', flipCard))


const music = document.querySelector('audio')

let hasFlippedCard = false
let firstCard, secondCard;
let lockBoard = false
let cardsLeft = 12



//function to flip the card
function flipCard(){
    if(lockBoard) return;
    if(this === firstCard) return;
    
    this.classList.add('flip')
    music.play()
    
    if(!hasFlippedCard){
        hasFlippedCard = true
        firstCard = this
    }else {
        hasFlippedCard = false
        secondCard = this
        checkForMatch()
        hiddenClass()
    }
}


//checking if the first card selected and second card match
function checkForMatch(){
    if(firstCard.dataset.name === secondCard.dataset.name){
        disableCards()
        cardsLeft -= 2
       
    }else {
        unflipCards()
    }
}


//if catch match remove the click event
function disableCards(){
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)
    resetBoard()
} 

//if first card and second card dont match flip the cards back.
function unflipCards(){
    lockBoard = true
    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')
        lockBoard = false
    },1300)
}

//auto shuffle on page load
(function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12 )
        card.style.order = randomPos
    })
})()

//resetting users picks
function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false]
    [firstCard, secondCard] = [null, null]
}


//reseting the game adding new levels

document.getElementById('newGame').addEventListener('click', resetGame)
document.getElementById('nextLevel').addEventListener('click', nextLevel)
const section = document.querySelector('section')
const firstRound = document.querySelectorAll('.firstRound')



function resetGame() {
    if(cardsLeft === 0){
        music.pause()
        hasFlippedCard = false
        lockBoard = false
        cardsLeft = 12
        cards.forEach(card => {
            card.classList.remove('flip')
            card.classList.remove('flip')
            let randomPos = Math.floor(Math.random() * 12 )
            card.style.order = randomPos
        })
    }return;       
}

function nextLevel() {
    cardsLeft = 18

    section.classList.toggle('auto')
    
    firstRound.forEach(card => {
        card.classList.remove('hidden')
    })
    
    cards.forEach(card => {
        card.classList.remove('flip')
        card.classList.remove('flip')
        card.addEventListener('click', flipCard)
        let randomPos = Math.floor(Math.random() * 12 )
        card.style.order = randomPos
    })
}

function hiddenClass(){
    if(cardsLeft === 0){
        document.getElementById('nextLevel').classList.toggle('hidden')
    }
}