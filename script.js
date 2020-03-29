let field = [];
let counter;

const startGame = () => {
    const amountOfMines = document.getElementById('amountOfMinesOnField').innerText;
    counter = 100;
    field = [];

    document.getElementById('field').innerHTML = '';
    document.getElementById('startButton').className = 'invisible-container';
    document.getElementsByClassName('amountOfMinesOnField')[0].className = 'invisible-container';

    addCellsToArray();
    spawnMines(amountOfMines);
    spawnField();
};

const doAmountOfMines = () => {
    const amountOfMines = Number(document.getElementById('amountOfMinesOnField').innerText);

    document.getElementById('amountOfMinesOnField').innerHTML = `${amountOfMines + 1}`;
    if (amountOfMines > 24) {
        document.getElementById('amountOfMinesOnField').innerHTML = '10';
    }
};

const addCellsToArray = () => {
    for (let x = 0; x <= 99; x++) {
        field.push({
            cellId: x,
            amountOfMinesAround: 0,
            havingMine: false,
            openStatus: false,
            lockStatus: false
        });
    }
};

const spawnMines = (amountOfMines) => {
    let obj;
    for (let i = 0; i < amountOfMines; i++) {
        obj = field[getRandomCell(0, 99)];
        obj.havingMine = true;

        doNumberOnCell(obj.cellId);
    }
};


const getRandomCell = (min, max) => {
    let randomCell = Math.floor(Math.random() * (max - min + 1)) + min;
    if (field[randomCell].havingMine) {
        randomCell = getRandomCell(0, 99);

    }
    return randomCell;
};


const doNumberOnCell = (cellId) => {
    const numberOfCell = cellId;
    if (numberOfCell > 9 && numberOfCell < 90) {
        if (numberOfCell % 10 !== 9 && numberOfCell % 10 !== 0) {
            field[numberOfCell - 1].amountOfMinesAround++;
            field[numberOfCell + 1].amountOfMinesAround++;
            field[numberOfCell + 10].amountOfMinesAround++;
            field[numberOfCell - 10].amountOfMinesAround++;
            field[numberOfCell + 11].amountOfMinesAround++;
            field[numberOfCell - 11].amountOfMinesAround++;
            field[numberOfCell + 9].amountOfMinesAround++;
            field[numberOfCell - 9].amountOfMinesAround++;
        } else if (numberOfCell % 10 === 9) {
            field[numberOfCell - 1].amountOfMinesAround++;
            field[numberOfCell + 10].amountOfMinesAround++;
            field[numberOfCell - 10].amountOfMinesAround++;
            field[numberOfCell - 11].amountOfMinesAround++;
            field[numberOfCell + 9].amountOfMinesAround++;
        } else {
            field[numberOfCell + 1].amountOfMinesAround++;
            field[numberOfCell - 9].amountOfMinesAround++;
            field[numberOfCell - 10].amountOfMinesAround++;
            field[numberOfCell + 10].amountOfMinesAround++;
            field[numberOfCell + 11].amountOfMinesAround++;
        }
    } else if (numberOfCell === 0) {
        field[numberOfCell + 1].amountOfMinesAround++;
        field[numberOfCell + 10].amountOfMinesAround++;
        field[numberOfCell + 11].amountOfMinesAround++;
    } else if (numberOfCell === 9) {
        field[numberOfCell - 1].amountOfMinesAround++;
        field[numberOfCell + 10].amountOfMinesAround++;
        field[numberOfCell + 9].amountOfMinesAround++;
    } else if (numberOfCell === 89) {
        field[numberOfCell + 1].amountOfMinesAround++;
        field[numberOfCell - 10].amountOfMinesAround++;
        field[numberOfCell - 9].amountOfMinesAround++;
    } else if (numberOfCell === 99) {
        field[numberOfCell - 11].amountOfMinesAround++;
        field[numberOfCell - 10].amountOfMinesAround++;
        field[numberOfCell - 1].amountOfMinesAround++;
    } else if (numberOfCell > 89) {
        field[numberOfCell - 1].amountOfMinesAround++;
        field[numberOfCell + 1].amountOfMinesAround++;
        field[numberOfCell - 11].amountOfMinesAround++;
        field[numberOfCell - 9].amountOfMinesAround++;
        field[numberOfCell - 10].amountOfMinesAround++;
    } else {
        field[numberOfCell + 1].amountOfMinesAround++;
        field[numberOfCell - 1].amountOfMinesAround++;
        field[numberOfCell + 11].amountOfMinesAround++;
        field[numberOfCell + 9].amountOfMinesAround++;
        field[numberOfCell + 10].amountOfMinesAround++;
    }

};

const spawnField = () => {
    let obj;
    field.forEach(function (item) {
        obj = item;
        document.getElementById('field').innerHTML += `
            <div id="${obj.cellId}"  class=${obj.havingMine ? 'cell-with-mine' : 'clear-cell'}>
                <div id ="${obj.cellId}" oncontextmenu="addFlagToCell(event)" onclick="deleteCover(Number(this.id))" class="cover-of-cell"></div>
            </div>
        `;
    });
};

const deleteFlag = (cellWithFlag) => {
    document.getElementById(`${cellWithFlag}`).innerHTML = `
        <div id ="${cellWithFlag}" oncontextmenu="addFlagToCell(event)" onclick="deleteCover(Number(this.id))" class="cover-of-cell"></div>
    `;
    field[Number(cellWithFlag)].lockStatus = false;
};

const addFlagToCell = (event) => {
    const cell = event.target.id;
    document.getElementById(`${cell}`).innerHTML = `<img oncontextmenu="deleteFlag(${cell})" class='flag' src='flag.png'>`;
    field[Number(cell)].lockStatus = true;
};

const deleteCover = (cell) => {
    if (field[cell].havingMine) {
        document.getElementById('loseWindow').className = 'lose-window';
        document.getElementById('field').className = 'invisible-container';
    } else {
        openCell(cell);
    }
};

const openCell = (cell) => {
    if (!field[cell].openStatus && !field[cell].lockStatus) {
        counter--;
        if (counter === Number(document.getElementById('amountOfMinesOnField').innerText)) {
            document.getElementById('winWindow').className = 'win-window';
            document.getElementById('field').className = 'invisible-container';
        }
        field[cell].openStatus = true;
        if (field[cell].amountOfMinesAround) {
            document.getElementById(`${cell}`).innerHTML = `<p class="numberOnCell"> ${field[cell].amountOfMinesAround} </p>`
        } else {
            document.getElementById(`${cell}`).innerHTML = '';
            openSomeCells(Number(cell));
        }
    } else {
        return 0;
    }
};

const continueGame = () => {
    let obj;
    let numberOnCell;

    document.getElementById('startButton').className = 'start-button';
    document.getElementById('loseWindow').className = 'invisible-container';
    document.getElementById('winWindow').className = 'invisible-container';
    document.getElementById('amountOfMinesOnField').parentNode.className = 'amountOfMinesOnField';
    document.getElementById('field').className = 'field';
    field.forEach(function (item) {
        obj = item;
        numberOnCell = obj.amountOfMinesAround ? obj.amountOfMinesAround : '';
        document.getElementById(`${obj.cellId}`).innerHTML = `<p class="numberOnCell">${obj.havingMine ? '' : numberOnCell}</p>`;
    });
};

const openSomeCells = (numberOfCell) => {
    if (numberOfCell > 9 && numberOfCell < 90) {
        if (numberOfCell % 10 !== 9 && numberOfCell % 10 !== 0) {
            openCell([numberOfCell - 1]);
            openCell([numberOfCell + 1]);
            openCell([numberOfCell + 10]);
            openCell([numberOfCell - 10]);
            openCell([numberOfCell + 11]);
            openCell([numberOfCell - 11]);
            openCell([numberOfCell + 9]);
            openCell([numberOfCell - 9]);
        } else if (numberOfCell % 10 === 9) {
            openCell([numberOfCell - 1]);
            openCell([numberOfCell + 10]);
            openCell([numberOfCell - 10]);
            openCell([numberOfCell - 11]);
            openCell([numberOfCell + 9]);
        } else {
            openCell([numberOfCell + 1]);
            openCell([numberOfCell - 9]);
            openCell([numberOfCell - 10]);
            openCell([numberOfCell + 10]);
            openCell([numberOfCell + 11]);
        }
    } else if (numberOfCell === 0) {
        openCell([numberOfCell + 1]);
        openCell([numberOfCell + 10]);
        openCell([numberOfCell + 11]);
    } else if (numberOfCell === 9) {
        openCell([numberOfCell - 1]);
        openCell([numberOfCell + 10]);
        openCell([numberOfCell + 9]);
    } else if (numberOfCell === 89) {
        openCell([numberOfCell + 1]);
        openCell([numberOfCell - 10]);
        openCell([numberOfCell - 9]);
    } else if (numberOfCell === 99) {
        openCell([numberOfCell - 11]);
        openCell([numberOfCell - 10]);
        openCell([numberOfCell - 1]);
    } else if (numberOfCell > 89) {
        openCell([numberOfCell - 1]);
        openCell([numberOfCell + 1]);
        openCell([numberOfCell - 11]);
        openCell([numberOfCell - 9]);
        openCell([numberOfCell - 10]);
    } else {
        openCell([numberOfCell + 1]);
        openCell([numberOfCell - 1]);
        openCell([numberOfCell + 11]);
        openCell([numberOfCell + 9]);
        openCell([numberOfCell + 10]);
    }

};
