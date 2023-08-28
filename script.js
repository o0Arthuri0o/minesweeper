// const LOVE = GELENGIK;

import {STATUSES, generateBoard} from "./board_generator.js"
import { timer, displayTimer, gameOver } from "./timer.js";

let sizeBoardX = findSizeOfBoardX(window.innerWidth);
console.log(sizeBoardX)
let numOfMines = 6;
let boardEl = document.querySelector('.board')
boardEl.style.setProperty('--sizeX', sizeBoardX)
let counterMines = document.querySelector('#marked-mines')
counterMines.textContent = 0;

let counterOfWin = 0;


let boardArr = generateBoard(sizeBoardX, numOfMines);
let starterTimer = 3 * 60;
let timerEl = document.querySelector('#timer');
timer(starterTimer, timerEl);

boardArr.forEach(obj => {
	let el = document.createElement('div');
	el.dataset.status = obj.status;
	el.dataset.xy = String(obj.x) + String(obj.y)

	let startTime;
	el.addEventListener('pointerdown', (e)=>{
		startTime = new Date();
	})

	el.addEventListener('pointerup', (e)=>{
		let endTime = new Date();
		let time = (endTime - startTime) / 1000;

		let finishCard = document.querySelector('#finishCard');
		if (!finishCard.classList.contains('finish')) {
			click(time, obj, el);
		}
		// click(time, obj, el);
		startTime = 0;
	})


	boardEl.append(el)
})

function click(timeDown, tileObj, tileEl) {
	if (timeDown > 0.4 && (tileObj.status == 'hidden' || tileObj.status == 'marked')) {
		window.navigator.vibrate(200)
		markedTile(tileObj, tileEl)
		return
	} 
	if (tileObj.status != 'marked') openTile(tileObj, tileEl)
	
} 

function markedTile(tileObj, tileEl) {
	if(tileObj.status === STATUSES.MARK){
		tileObj.status = STATUSES.HIDE;
		tileEl.dataset.status = tileObj.status;
		counterMines.textContent = Number(counterMines.textContent) - 1;

		return
	}
	tileObj.status = STATUSES.MARK;
	tileEl.dataset.status = tileObj.status
	counterMines.textContent = Number(counterMines.textContent) + 1;
}

function openTile(obj, el) {
	if (checkMine(obj)) {
		obj.status = STATUSES.OPENMINE;
		el.dataset.status = obj.status;
		el.insertAdjacentHTML('afterbegin', "<img src = 'ico.svg'></img>")
		window.navigator.vibrate(1500)

		setTimeout(()=>{
			gameOver('Boom Bitch!!!')
		}, 500)
		return
	} 
	opening(boardArr, obj, el);

}

function checkMine(obj) {
	if(obj.isMine === true) return true
}

function opening(boardArr, obj, el) {

	let xObj = obj.x;
	let yObj = obj.y;

	let coordinateArr = []
	for (let y = -1; y <= 1; y++) {
		let rowsArr = [];
		for (let x = -1; x <= 1; x++) {
			let xy = [xObj + x, yObj + y]
			if ((xObj + x >= 0 && yObj + y >= 0) && !((xObj+x)==xObj && (yObj+y)== yObj)) rowsArr.push(xy);
		}
		coordinateArr.push(rowsArr);
	}
	coordinateArr = coordinateArr.flat();
	let counter = 0;
	for (let i = 0; i < coordinateArr.length; i++) {
		let [x, y] = coordinateArr[i]
		for (let j = 0; j < boardArr.length; j++) {
			let tile = boardArr[j];
			if (tile.x == x && tile.y == y && tile.isMine) {
				counter++;
				break
			}
		}
	}
	obj.status = STATUSES.OPEN;
	el.dataset.status = obj.status;
	el.textContent = counter;
	counterOfWin++;
	checkWin(counterOfWin);
}

function checkWin(counterOfWin) {
	if (counterOfWin === sizeBoardX*10 - numOfMines) gameOver("You win!")
}

function findSizeOfBoardX(sizeWindow) {
	if (sizeWindow > 600) return 10;
	return 6
}
// console.log(findSizeOfBoardX(window.innerWidth))