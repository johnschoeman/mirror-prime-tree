import initMirrorTree from "./MirrorPrime"
import initRecaman from "./Recaman"
import initCircles from "./circles"
import initKochCurve from "./koch_curve"
import initMandlebrot from "./mandlebrot"
import initSolarSystem from "./solar_system"
import initTree from "./tree"
import initAsteroids from "./Asteroids"

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
    case "Circles": {
      initCircles()
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
  }
})
