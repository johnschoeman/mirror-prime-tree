const esbuild = require('esbuild')

const minify = false
const sourcemap = true

const doodleFolders = [
  "triangle_subdivision",
  "b_pad",
  "koch_curve",
  "mirror_primes",
  "solar_system",
  "solar_system_2",
  "tic_tac_toe",
  "asteroids",
  "mandlebrot",
  "tree"
]


const entryPoints = doodleFolders.map((folder) => {
  return `./src/doodles/${folder}/index.ts`
})
const outdir = "./build/doodles"

esbuild.build({
  entryPoints, 
  bundle: true,
  outdir,
  sourcemap,
  minify,
  target: "es6",
  plugins: [],
}).catch(() => process.exit(1))


