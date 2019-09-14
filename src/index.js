import * as MirrorPrime from "./MirrorPrime"
import initCircles from "./circles"
import initKochCurve from "./koch_curve"
import initMandlebrot from "./mandlebrot"
import initSolarSystem from "./solar_system"
import initTree from "./tree"

window.addEventListener("DOMContentLoaded", () => {
  switch (document.title) {
    case "MirrorPrimeTree": {
      MirrorPrime.run()
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
  }
})
