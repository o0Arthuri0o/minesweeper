


export function timer(seconds, timerDisplay) {
	let countdown;
	// обязательно подчищаем активные таймеры 
	clearInterval(countdown);
  
	const currentTime = Date.now();
	// формат timestamp (временная метка)
	const endTime = currentTime + seconds * 1000;
	displayTimer(seconds, timerDisplay);
  
	countdown = setInterval(() => {
	  const secondsLeft = Math.round((endTime - Date.now()) / 1000);
	  // проверяем когда остановить отсчет
	  if(secondsLeft < 0) {
		clearInterval(countdown);
		gameOver('Game Over')
		return;
	  }
	  // отображаем оставшееся время
	  displayTimer(secondsLeft, timerDisplay);
	}, 1000);
  }
  
 export function displayTimer(seconds, timerDisplay) {
	const minutes = Math.floor(seconds / 60);
	const remainderSeconds = seconds % 60;
	const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
	document.title = display;
	timerDisplay.textContent = display;
}

export function gameOver(text) {
	let finishCard = document.querySelector('#finishCard');
	finishCard.classList.add('finish')
	finishCard.textContent = text
	setTimeout(()=>{
		window.location.reload()
	}, 3000)
}