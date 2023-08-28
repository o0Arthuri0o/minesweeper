export let STATUSES = {
	HIDE: "hidden",
	MARK: "marked",
	OPEN: "open",
	OPENMINE: "opened-mine",
}


export function generateBoard(sizeBoardX, numOfMines) {
	const columnsArray = [];
	for (let i = 0; i < 10; i++) {
		const rowsArray = [];
		for (let j = 0; j < sizeBoardX; j++) {
			let tile = {
				x: j,
				y: i,
				status: STATUSES.HIDE,
				isMine: false,
			};
			// minesCheck(tile);
			rowsArray.push(tile);
		}
		columnsArray.push(rowsArray);
	}
	let mines = minesGenerate(sizeBoardX, numOfMines);
	minesCheckAndAdd(mines, columnsArray);
	return columnsArray.flat()
}

export function minesGenerate(sizeBoardX, numOfMines) {
	const minesArray = [];
	while (minesArray.length < numOfMines) {
		let mine = randomGenerateXYofMines(sizeBoardX);
		if (!(minesArray.some(el => el[0] == mine[0] && el[1] == mine[1]))) {
			minesArray.push(mine);
		}
	}
	return minesArray;
}


export function randomGenerateXYofMines(sizeBoardX) {
	const arr = [];
	let x = Math.floor(Math.random() * (sizeBoardX));
	let y = Math.floor(Math.random() * (10));
	arr.push(x);
	arr.push(y);
	return arr
}

export function minesCheckAndAdd(minesArray, columnsArray) {
	for (let i = 0; i < columnsArray.length; i++) {
		columnsArray[i].forEach(el => {
			let x = el.x;
			let y = el.y;
			if (minesArray.some(el => el[0] == x && el[1] == y)){
				el.isMine = true;
			}
		})
	}
}











