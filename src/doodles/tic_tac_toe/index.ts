import { BehaviorSubject, fromEvent, interval, merge } from "rxjs"
import { map, flatMap, take, first } from "rxjs/operators"

import { HtmlHelpers } from "../../utils"

function initTicTacToe() {
  type Cell = "X" | "O" | null

  type Game = [[Cell, Cell, Cell], [Cell, Cell, Cell], [Cell, Cell, Cell]]

  const blankGame = (): Game => [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]

  const cloneGame = (game: Game): Game => {
    const newGame: Game = blankGame()
    game.forEach((row, rowIdx) => {
      row.forEach((col, colIdx) => {
        newGame[rowIdx][colIdx] = col
      })
    })
    return newGame
  }

  const gameSubject = new BehaviorSubject(blankGame())

  const cell00 = document.getElementById("00")
  const cell01 = document.getElementById("01")
  const cell02 = document.getElementById("02")
  const cell10 = document.getElementById("10")
  const cell11 = document.getElementById("11")
  const cell12 = document.getElementById("12")
  const cell20 = document.getElementById("20")
  const cell21 = document.getElementById("21")
  const cell22 = document.getElementById("22")

  const winnerBox = document.getElementById("winner-box")

  const cellA = fromEvent(cell00, "click").pipe(map(e => [0, 0]))
  const cellB = fromEvent(cell01, "click").pipe(map(e => [0, 1]))
  const cellC = fromEvent(cell02, "click").pipe(map(e => [0, 2]))
  const cellD = fromEvent(cell10, "click").pipe(map(e => [1, 0]))
  const cellE = fromEvent(cell11, "click").pipe(map(e => [1, 1]))
  const cellF = fromEvent(cell12, "click").pipe(map(e => [1, 2]))
  const cellG = fromEvent(cell20, "click").pipe(map(e => [2, 0]))
  const cellH = fromEvent(cell21, "click").pipe(map(e => [2, 1]))
  const cellI = fromEvent(cell22, "click").pipe(map(e => [2, 2]))

  merge(cellA, cellB, cellC, cellD, cellE, cellF, cellG, cellH, cellI)
    .pipe(
      flatMap(([rowIdx, colIdx]) => {
        return gameSubject.pipe(
          take(1),
          map(game => {
            const nextGame = cloneGame(game)
            nextGame[rowIdx][colIdx] = "X"
            return nextGame
          })
        )
      })
    )
    .subscribe(game => {
      gameSubject.next(game)
    })

  interval(1000)
    .pipe(
      flatMap((_v: number) => {
        const colIdx = Math.floor(Math.random() * 3)
        const rowIdx = Math.floor(Math.random() * 3)
        return gameSubject.pipe(
          take(1),
          map(game => {
            const nextGame = cloneGame(game)
            nextGame[rowIdx][colIdx] = "O"
            return nextGame
          })
        )
      })
    )
    .subscribe(game => {
      gameSubject.next(game)
    })

  gameSubject.subscribe(game => {
    game.forEach((row, rowIdx) => {
      row.forEach((col, colIdx) => {
        const cell = document.getElementById(`${rowIdx}${colIdx}`)
        if (col === "X") {
          cell.innerHTML = "X"
        } else if (col === "O") {
          cell.innerHTML = "O"
        }
      })
    })
  })

  const winner = (game: Game): Cell => {
    const lineComplete = (line: [Cell, Cell, Cell]): Cell => {
      const firstValue = line[0]
      if (firstValue !== null) {
        return line.filter(value => value === firstValue).length === 3
          ? firstValue
          : null
      } else {
        return null
      }
    }

    const lines = [
      [game[0][0], game[0][1], game[0][2]],
      [game[1][0], game[1][1], game[1][2]],
      [game[2][0], game[2][1], game[2][2]],
      [game[0][0], game[1][0], game[2][0]],
      [game[0][1], game[1][1], game[2][1]],
      [game[0][2], game[1][2], game[2][2]],
      [game[0][0], game[1][1], game[2][2]],
      [game[0][2], game[1][1], game[2][0]],
    ]

    const lineWinners = lines.map((line: [Cell, Cell, Cell]) =>
      lineComplete(line)
    )

    const countXLines = lineWinners.filter(value => value === "X").length
    const countOLines = lineWinners.filter(value => value === "O").length

    if (countXLines > countOLines) {
      return "X"
    } else if (countOLines > countXLines) {
      return "O"
    } else {
      return null
    }
  }

  gameSubject.pipe(map(game => winner(game))).subscribe(winner => {
    const message = `WINNER: ${winner === null ? "?" : winner}`
    winnerBox.innerHTML = message
  })
}

initTicTacToe()
