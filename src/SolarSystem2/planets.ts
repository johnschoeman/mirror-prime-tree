import { NumberHelpers } from "../utils"

export type Planet = {
  size: number
  color: string
  orbitRadius: number
  orbitSpeed: number
}

export const generatePlanets = (): Array<Planet> => {
  const planets = []
  let currentRadius = 0
  for (let i = 0; i < 10; i++) {
    planets.push(generatePlanet(currentRadius))
    currentRadius += randomOrbitRadiusStep()
  }
  return planets
}

const generatePlanet = (orbitRadius: number): Planet => {
  return {
    size: randomRadius(),
    color: randomColor(),
    orbitRadius: orbitRadius,
    orbitSpeed: randomOrbitSpeed(),
  }
}

const randomColor = () => {
  const red = Math.floor(Math.random() * 256)
  const green = Math.floor(Math.random() * 256)
  const blue = Math.floor(Math.random() * 256)

  return `rgb(${red},${green},${blue},1.0)`
}

const randomRadius = () => {
  return NumberHelpers.randomInteger(30)
}

const randomOrbitRadiusStep = () => {
  return NumberHelpers.randomInteger(150, 60)
}

const randomOrbitSpeed = () => {
  const speed = NumberHelpers.randomInteger(10, -4)
  return speed === 0 ? 1 : speed
}
