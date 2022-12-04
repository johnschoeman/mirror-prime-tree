const esbuild = require('esbuild')

const minify = false
const sourcemap = true

const doodleFolders = [
  "b_pad",
  "koch_curve",
  "mirror_primes",
  "solar_system",
  "solar_system_2",
  "tic_tac_toe",
]

const foo = [
  "asteroids",
  "mandlebrot",
  "tree"
]


const entryPoints = doodleFolders.map((folder) => {
  return `./src/doodles/${folder}/index.ts`
})
const outdir = "./build/doodles"

esbuild.build({
  entryPoints: [
    ...entryPoints,
    "./src/doodles/foobar/index.ts",
    "./src/doodles/asteroids/index.ts"
    "./src/doodles/asteroids"
    "src/doodles/asteroids/index.ts"
  ], 
  bundle: true,
  outdir,
  sourcemap,
  minify,
  plugins: [
  ],
}).catch(() => process.exit(1))


