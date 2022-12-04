const esbuild = require('esbuild')

const minify = false
const sourcemap = true

const doodleFolders = [
  // "asteroids",
  "b_pad",
  "koch_curve",
  // "mandlebrot",
  "mirror_primes",
  "solar_system",
  "solar_system_2",
  "tic_tac_toe",
  // "tree"
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
  plugins: [
  ],
}).catch(() => process.exit(1))


