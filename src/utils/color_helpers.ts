import { ArrayHelpers } from "./index"

export const randomPallet = (): Array<string> => {
  return ArrayHelpers.sample<Array<string>>(pallets)
}

export const randomColor = () => {
  const red = Math.floor(Math.random() * 256)
  const green = Math.floor(Math.random() * 256)
  const blue = Math.floor(Math.random() * 256)
  return `rgb(${red},${green},${blue},1.0)`
}

const pallets = [
  ["#1a181b", "#564d65", "#3e8989", "#2cda9d", "#05f140"],
  ["#586994", "#7d869c", "#a2abab", "#b4c4ae", "#e5e8b6"],
  ["#5603ad", "#8367c7", "#b3e9c7", "#c2f8cb", "#f0fff1"],
  ["#395e66", "#387d7a", "#32936f", "#26a96c", "#2bc016"],
  ["#2274a5", "#f75c03", "#f1c40f", "#26a96c", "#d90368"],
  ["#db2b39", "#29335c", "#f1c40f", "#26a96c", "#f0cea0"],
  ["#b5ffe1", "#93e5ab", "#65b891", "#26a96c", "#00241b"],
  ["#885053", "#fe5f55", "#65b891", "#26a96c", "#777da7"],
  ["#a0e8af", "#edead0", "#65b891", "#ffcf56", "#777da7"],
  ["#47e5bc", "#81e4da", "#aecfdf", "#9f9fad", "#93748a"],
  ["#313628", "#595358", "#857f74", "#a4ac96", "#cadf9e"],
  ["#ca054d", "#3b1c32", "#a4d4b4", "#ffcf9c", "#b96d40"],
  ["#ef767a", "#456990", "#49beaa", "#49dcb1", "#eeb868"],
  ["#efefef", "#3454d1", "#34d1bf", "#070707", "#d1345b"],
  ["#ba1200", "#031927", "#9dd1f1", "#508aa8", "#c8e0f4"],
]
