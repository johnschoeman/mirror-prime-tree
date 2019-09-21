import { ArrayHelpers, ColorHelpers, NumberHelpers } from "../utils"

export type Planet = {
  size: number
  color: string
  orbitRadius: number
  orbitSpeed: number
}

export const generatePlanets = (): Array<Planet> => {
  const planets = []
  const pallet = ColorHelpers.randomPallet()
  let sun = generateSun(pallet)
  planets.push(sun)

  let currentRadius = 0
  for (let i = 0; i < 10; i++) {
    const color = ArrayHelpers.sample<string>(pallet)
    planets.push(generatePlanet(currentRadius, color))
    currentRadius += randomOrbitRadiusStep()
  }

  return planets
}

const generateSun = (pallet: Array<string>): Planet => {
  const size = NumberHelpers.randomInteger(60, 20)
  return generatePlanet(0, ArrayHelpers.sample<string>(pallet), size)
}

const generatePlanet = (
  orbitRadius: number,
  color: string = ColorHelpers.randomColor(),
  size: number = randomRadius()
): Planet => {
  return {
    size,
    color,
    orbitRadius,
    orbitSpeed: randomOrbitSpeed(),
  }
}

const randomRadius = () => {
  return NumberHelpers.randomInteger(30, 5)
}

const randomOrbitRadiusStep = () => {
  return NumberHelpers.randomInteger(150, 60)
}

const randomOrbitSpeed = () => {
  // const speed = NumberHelpers.randomInteger(10, -4)
  const speed = Math.random() * 10 - 4
  return speed === 0 ? 1 : speed
}
