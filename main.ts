const bombCountOptions: Array<number> = [25, 50, 100]
let bombCountIndex: number = 2;
let bombCount: number = bombCountOptions[bombCountIndex]
const tileSize: number = 8;
const screenW = screen.width
const screenH = screen.height
const resolution: number = screenH / tileSize;

const boardW = resolution * tileSize
const boardH = resolution * tileSize

const offsetX = Math.idiv(screenW - boardW, 2)
const offsetY = Math.idiv(screenH - boardH, 2)
let pole: Array<Array<tile>> = [];
let firstTurn: boolean = true;
let cursorX: number = 7;
let cursorY: number = 7;

enum GameState {
    Home,
    Playing,
    GameOver
}
let gameState: GameState = GameState.Home

function startGame(bombs: number) {
    firstTurn = true
    cursorX = Math.idiv(resolution, 2)
    cursorY = Math.idiv(resolution, 2)

    pole = []
    for (let y = 0; y < resolution; y++) {
        let row: Array<tile> = []
        for (let x = 0; x < resolution; x++) {
            row.push({
                state: status.free,
                marked: false,
                revealed: false,
                firstTile: false,
                locationY: y,
                locationX: x
            })
        }
        pole.push(row)
    }

    gameState = GameState.Playing
}

const tileFreeImg: Image = img`
b 3 3 3 3 3 3 3
b 1 1 1 1 1 1 3
b 1 1 1 1 1 1 3
b 1 1 1 1 1 1 3
b 1 1 1 1 1 1 3
b 1 1 1 1 1 1 3
b 1 1 1 1 1 1 3
b b b b b b b b
`

const tileMarkedImg: Image = img`
    b 3 3 3 3 3 3 3
    b 1 1 2 2 1 1 3
    b 1 1 2 2 1 1 3
    b 1 1 2 2 1 1 3
    b 1 1 2 2 1 1 3
    b 1 1 1 1 1 1 3
    b 1 1 2 2 1 1 3
    b b b b b b b b
`

const tileNumber0: Image = img`
    b 3 3 3 3 3 3 3
    b 1 9 9 9 9 1 3
    b 1 9 1 1 9 1 3
    b 1 9 1 1 9 1 3
    b 1 9 1 1 9 1 3
    b 1 9 1 1 9 1 3
    b 1 9 9 9 9 1 3
    b b b b b b b b
`

const tileNumber1: Image = img`
    b 3 3 3 3 3 3 3
    b 1 1 1 f 1 1 3
    b 1 1 f f 1 1 3
    b 1 f 1 f 1 1 3
    b 1 1 1 f 1 1 3
    b 1 1 1 f 1 1 3
    b 1 f f f f f 3
    b b b b b b b b
`

const tileNumber2: Image = img`
    b 3 3 3 3 3 3 3
    b 1 1 8 8 1 1 3
    b 1 8 1 1 8 1 3
    b 1 1 1 1 8 1 3
    b 1 1 1 8 1 1 3
    b 1 1 8 1 1 1 3
    b 1 8 8 8 8 1 3
    b b b b b b b b
`

const tileNumber3: Image = img`
    b 3 3 3 3 3 3 3
    b 1 1 6 6 1 1 3
    b 1 6 1 1 6 1 3
    b 1 1 1 6 1 1 3
    b 1 1 1 1 6 1 3
    b 1 6 1 1 6 1 3
    b 1 1 6 6 1 1 3
    b b b b b b b b
`

const tileNumber4: Image = img`
    b 3 3 3 3 3 3 3
    b 1 a 1 1 1 1 3
    b 1 a 1 1 1 1 3
    b 1 a 1 a 1 1 3
    b 1 a a a a 1 3
    b 1 1 1 a 1 1 3
    b 1 1 1 a 1 1 3
    b b b b b b b b
`

const tileNumber5: Image = img`
    b 3 3 3 3 3 3 3
    b 1 c c c c 1 3
    b 1 c 1 1 1 1 3
    b 1 1 c c 1 1 3
    b 1 1 1 1 c 1 3
    b 1 c 1 1 c 1 3
    b 1 1 c c 1 1 3
    b b b b b b b b
`

const tileNumber6: Image = img`
    b 3 3 3 3 3 3 3
    b 1 1 4 4 4 1 3
    b 1 4 1 1 1 1 3
    b 1 4 1 1 1 1 3
    b 1 4 4 4 4 1 3
    b 1 4 1 1 4 1 3
    b 1 4 4 4 4 1 3
    b b b b b b b b
`

const tileNumber7: Image = img`
    b 3 3 3 3 3 3 3
    b d 5 5 5 1 1 3
    b 1 1 1 5 1 1 3
    b d 1 d 5 d 1 3
    b 1 1 5 5 5 1 3
    b 1 1 1 5 1 1 3
    b 1 1 1 5 1 1 3
    b b b b b b b b
`

const tileNumber8: Image = img`
    b 3 3 3 3 3 3 3
    b 1 1 7 7 1 1 3
    b 1 7 1 1 7 1 3
    b 1 1 7 7 1 1 3
    b 1 7 1 1 7 1 3
    b 1 7 1 1 7 1 3
    b 1 1 7 7 1 1 3
    b b b b b b b b
`

const tileRevealedBomb: Image = img`
    b 3 3 3 3 3 3 3
    b d 1 1 4 f 4 3
    b 1 1 4 f 4 1 3
    b d 4 2 2 4 d 3
    b 4 2 d 2 2 4 3
    b 4 2 2 2 2 4 3
    b 1 4 2 2 4 1 3
    b b b b b b b b
`
const tileNumberImages: Array<Image> = [tileNumber0, tileNumber1, tileNumber2, tileNumber3, tileNumber4, tileNumber5, tileNumber6, tileNumber7, tileNumber8, tileRevealedBomb]

controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (gameState === GameState.Playing) {
        music.play(music.melodyPlayable(music.footstep), music.PlaybackMode.InBackground)
        cursorX = Math.max(0, cursorX - 1)
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (gameState === GameState.Playing) {
        music.play(music.melodyPlayable(music.footstep), music.PlaybackMode.InBackground)
        cursorX = Math.min(resolution - 1, cursorX + 1)
    }
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (gameState === GameState.Home) {
        if (bombCountIndex + 1 === bombCountOptions.length) {
            bombCountIndex = 0;
        } else {
            bombCountIndex += 1;
        }
    }

    if (gameState === GameState.Playing) {
        music.play(music.melodyPlayable(music.footstep), music.PlaybackMode.InBackground)
        cursorY = Math.max(0, cursorY - 1)
    }
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (gameState === GameState.Home) {
        if (bombCountIndex - 1 < 0) {
            bombCountIndex = bombCountOptions.length-1;
        } else {
            bombCountIndex -= 1;
        }
    }

    if (gameState === GameState.Playing) {
        music.play(music.melodyPlayable(music.footstep), music.PlaybackMode.InBackground)
        cursorY = Math.min(resolution - 1, cursorY + 1)
    }
})

controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if(gameState === GameState.Playing){
        music.play(music.melodyPlayable(music.thump), music.PlaybackMode.InBackground)
        pole[cursorY][cursorX].marked = !pole[cursorY][cursorX].marked
    }
})

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if(gameState === GameState.Home){
        gameState = GameState.Playing;
    }

    if (gameState === GameState.Playing){
        const currentTile = pole[cursorY][cursorX];

        if (firstTurn) {
            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++){ 

                    const nx = cursorX + dx
                    const ny = cursorY + dy

                    if (nx >= 0 && nx < resolution && ny >= 0 && ny < resolution) {
                        pole[ny][nx].firstTile = true;
                    }
                }
            }
            distributeBombs();
            firstTurn = false;
        }

        if (currentTile.marked) {
            return;
        }

        if (currentTile.state === status.occupied) {
            currentTile.revealed = true;
            gameState = GameState.GameOver
            return;
        }

        revealTile(cursorX, cursorY)
    }
})


enum status {
    occupied = -1,
    free = 0
}

type tile = {
    state: status,
    marked: boolean,
    revealed: boolean,
    firstTile: boolean,
    locationX: number,
    locationY: number
}

for (let y: number = 0; y < resolution; y++) {
    let row: Array<tile> = []
    for (let x: number = 0; x < resolution; x++) {
        let tile: tile = {
            state: status.free,
            marked: false,
            revealed: false,
            firstTile: false,
            locationY: y,
            locationX: x
        }
        row.push(tile)
    }
    pole.push(row)
}

function distributeBombs() {
    bombCount = bombCountOptions[bombCountIndex]
    for (let i = 0; i < bombCount; i++) {
        let bombX: number = randint(0, resolution - 1)
        let bombY: number = randint(0, resolution - 1)
        while (pole[bombY][bombX].state === status.occupied || pole[bombY][bombX].firstTile) {
            bombX = randint(0, resolution - 1)
            bombY = randint(0, resolution - 1)
        }
        pole[bombY][bombX].state = status.occupied
    }
}

function surroundingBombs(x: number, y: number): number {
    let count = 0

    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) {
                continue;
            };

            const nx = x + dx
            const ny = y + dy

            if (nx >= 0 && nx < resolution && ny >= 0 && ny < resolution) {
                if (pole[ny][nx].state === status.occupied) {
                    count++
                }
            }
        }
    }

    return count
}

function revealTile(x: number, y: number) {

    const tile = pole[y][x];

    if (tile.revealed || tile.marked) {
        return;
    }

    tile.revealed = true;

    if (tile.state === status.occupied) {
        return;
    }

    const count = surroundingBombs(x, y);

    if (count === 0) {
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                if (dx === 0 && dy === 0) {
                    continue;
                }

                const nx = x + dx;
                const ny = y + dy;

                if (nx >= 0 && nx < resolution && ny >= 0 && ny < resolution) {
                    revealTile(nx, ny);
                }
            }
        }
    }
}

function drawGame (){
    for (let y = 0; y < resolution; y++) {
        for (let x = 0; x < resolution; x++) {
            const t = pole[y][x]
            let imgToDraw: Image = tileFreeImg;

            if (t.marked) {
                imgToDraw = tileMarkedImg;
            } else if (t.revealed) {
                if (t.state === status.occupied) {
                    imgToDraw = tileRevealedBomb;
                } else {
                    const count: number = surroundingBombs(x, y)

                    imgToDraw = tileNumberImages[count]
                }
            } else {
                imgToDraw = tileFreeImg;
            }
            screen.drawImage(imgToDraw, offsetX + x * tileSize, offsetY + y * tileSize)
        }
    }
    screen.drawRect(offsetX + cursorX * tileSize, offsetY + cursorY * tileSize, tileSize, tileSize, 2)
}

function drawHome() {
    screen.fill(0)

    screen.printCenter(`Bomb Count: ${bombCountOptions[bombCountIndex]}`, screenH / 2 - 20, 1)
    screen.printCenter("A = START", screenH / 2, 1)
}

function drawFail() {
    screen.fill(0)
    game.gameOver(false)
}

game.onPaint(function () {
    if(gameState === GameState.Playing){
      drawGame()
    }
    if(gameState === GameState.Home) {
        drawHome()
    }
    if(gameState === GameState.GameOver) {
        drawFail()
    }
})