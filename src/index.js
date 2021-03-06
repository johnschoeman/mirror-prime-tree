import initMirrorTree from "./MirrorPrime"
import initRecaman from "./Recaman"
import initKochCurve from "./koch_curve"
import initMandlebrot from "./mandlebrot"
import initSolarSystem from "./solar_system"
import initTree from "./tree"
import initAsteroids from "./Asteroids"
import initSolarSystem2 from "./SolarSystem2"
import initTicTacToe from "./TicTacToe"
import initBPad from "./b_pad"

window.addEventListener("DOMContentLoaded", () => {
  switch (document.title) {
    case "MirrorPrimeTree": {
      initMirrorTree()
      break
    }
    case "Recaman": {
      initRecaman()
      break
    }
    case "KochCurve": {
      initKochCurve()
      break
    }
    case "Mandlebrot": {
      initMandlebrot()
      break
    }
    case "SolarSystem": {
      initSolarSystem()
      break
    }
    case "Tree": {
      initTree()
      break
    }
    case "Asteroids": {
      initAsteroids()
      break
    }
    case "SolarSystem2": {
      initSolarSystem2()
      break
    }
    case "TicTacToe": {
      initTicTacToe()
      break
    }
    case "BPad": {
      initBPad()
      break
    }
  }
})
