const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score2El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnAbout = document.querySelector('.about');
const guide = document.querySelector('.guide');
const overlay = document.querySelector('.overlay');
const guideCloseBtn = document.querySelector('.close');
 
let scores, currentScore, activePlayer, playing;

// o'yinchi almashtirish logikasi
const switchPlayer = function(){    
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};
//Qayta ishga tushurish
const restart = function(){
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  //belgilangan natijaga yetgandan keyin o'yinni toxtatish uchun
  playing = true;

  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score2El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active')
};
restart();

//random son paydo qilish
btnRoll.addEventListener('click', function(){
 if(playing){
  const dice = Math.trunc(Math.random() * 6) +1;

  diceEl.classList.remove('hidden');
  diceEl.src = `dice-six-faces-${dice}.png`;
//paydo bo'lgan son 1 ga teng bo'lmasa shu sonlarni qo'shib borish
  if(dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore
  } else{
    switchPlayer()
  }
}
});

// hozirgi qiymat ni total sifatida olib qo'yib o'yinni davom ettirish
btnHold.addEventListener('click', function() {
 if(playing){
  scores[activePlayer] += currentScore;

  document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

  //O'yinga yuqori qiymat belgilanib kim shu qiymatga yetsa o'yinni toxtatish
  if(scores[activePlayer] >= 100){
    playing = false;

    diceEl.classList.add('hidden');

    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')

  } else{
      switchPlayer()
  }  
}
});

btnNew.addEventListener('click', restart);

btnAbout.addEventListener('click', function() {
  guide.classList.remove('hidden');
  overlay.classList.remove('hidden')
});

const closeGuide = function(){
  guide.classList.add('hidden');
  overlay.classList.add('hidden')
}

document.addEventListener('keydown', function(e){
  if(e.key == 'Escape' && !guide.classList.contains('hidden')){
   closeGuide() 
  }
});

guideCloseBtn.addEventListener('click', closeGuide)