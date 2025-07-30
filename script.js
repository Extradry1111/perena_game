let score = 0, timeLeft = 30, gameInterval, moleTimeout;
const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const gameOverScreen = document.getElementById('gameOver');
const finalScore = document.getElementById('finalScore');
const startBtn = document.getElementById('startBtn');

function startGame(){
  score=0; timeLeft=30;
  scoreDisplay.textContent='Score: 0';
  timeDisplay.textContent='Time: 30s';
  gameOverScreen.classList.add('hidden');
  startBtn.classList.add('hidden');
  gameInterval=setInterval(()=>{
    timeLeft--;
    timeDisplay.textContent=`Time: ${timeLeft}s`;
    if(timeLeft<=0) endGame();
  },1000);
  popMole();
}
function popMole(){
  if(timeLeft<=0) return;
  const index=Math.floor(Math.random()*holes.length);
  const hole=holes[index];
  const mole=document.createElement('div');
  mole.classList.add('mole');
  mole.addEventListener('click',()=>{
    score++;
    scoreDisplay.textContent=`Score: ${score}`;
    mole.remove();
  });
  hole.appendChild(mole);
  moleTimeout = setTimeout(()=>{
    mole.remove();
    popMole();
  },800);
}
function endGame(){
  clearInterval(gameInterval);
  clearTimeout(moleTimeout);
  document.querySelectorAll('.mole').forEach(m=>m.remove());
  finalScore.textContent = score;
  gameOverScreen.classList.remove('hidden');
  startBtn.classList.remove('hidden');
}

VANTA.CELLS({
  el: "body",
  mouseControls: true,
  touchControls: true,
  color1: 0x3C0064,
  color2: 0x550088,
  size: 1.50,
  speed: 1.20,
  backgroundColor: 0x3C0064
});

startBtn.addEventListener('click', startGame);
