module.exports = {
  purge: [
    "./doodles/**/*.html",
    "./src/**/*.js",
    "./src/**/*.ts",
    "./src/**/*.elm",
  ],
  theme: {
    extend: {},
  },
  variants: {
    backgroundColor: ["responsive", "hover", "focus", "active"],
  },
  plugins: [],
}
