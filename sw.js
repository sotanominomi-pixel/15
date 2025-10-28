let speed = 24;
let mode = 'clock';
let swTime = 0;
let swRunning = false;
let laps = [];

const clockDisplay = document.getElementById('clockDisplay');
const stopwatchDisplay = document.getElementById('stopwatchDisplay');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const speedSlider = document.getElementById('speedSlider');
const speedDisplay = document.getElementById('speedDisplay');
const clockBtn = document.getElementById('clockBtn');
const stopwatchBtn = document.getElementById('stopwatchBtn');
const stopwatchControls = document.querySelector('.stopwatch-controls');
const lapsDiv = document.getElementById('laps');

speedSlider.oninput = () => { speed = Number(speedSlider.value); speedDisplay.textContent = speed; };

clockBtn.onclick = () => {
  mode='clock';
  clockDisplay.style.display='block';
  stopwatchDisplay.style.display='none';
  stopwatchControls.style.display='none';
  clockBtn.classList.add('active');
  stopwatchBtn.classList.remove('active');
};

stopwatchBtn.onclick = () => {
  mode='stopwatch';
  clockDisplay.style.display='none';
  stopwatchDisplay.style.display='block';
  stopwatchControls.style.display='block';
  stopwatchBtn.classList.add('active');
  clockBtn.classList.remove('active');
};

startStopBtn.onclick = () => {
  swRunning = !swRunning;
  startStopBtn.textContent = swRunning ? 'STOP' : 'START';
  startStopBtn.style.background = swRunning ? '#fff' : '#222';
  startStopBtn.style.color = swRunning ? '#000' : '#fff';
};

resetBtn.onclick = () => {
  swTime = 0;
  laps = [];
  updateSW();
  renderLaps();
};

lapBtn.onclick = () => {
  laps.push(swTime);
  renderLaps();
};

function renderLaps() {
  lapsDiv.innerHTML = laps.map((t,i)=>`${i+1}. ${formatTime(t)}`).join('<br>');
}

function formatTime(seconds){
  const hr = Math.floor(seconds/3600);
  const min = Math.floor(seconds/60)%60;
  const sec = Math.floor(seconds)%60;
  return `${String(hr).padStart(2,'0')}:${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
}

function updateClock(){
  const now = new Date();
  const totalSeconds = now.getHours()*3600 + now.getMinutes()*60 + now.getSeconds() + now.getMilliseconds()/1000;
  const customSeconds = totalSeconds*(24/speed);

  const h = Math.floor(customSeconds/3600)%24;
  const m = Math.floor(customSeconds/60)%60;
  const s = Math.floor(customSeconds)%60;

  clockDisplay.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

function updateSW(){
  stopwatchDisplay.textContent = formatTime(swTime);
}

// メインループ
setInterval(()=>{
  if(mode==='clock') updateClock();
  if(mode==='stopwatch' && swRunning){
    swTime += 1*(24/speed);
    swTime = Math.floor(swTime);
    updateSW();
  }
},1000/30);
