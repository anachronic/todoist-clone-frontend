/* eslint-disable @typescript-eslint/no-var-requires */
const tailwind = require('tailwindcss')

module.exports = {
  plugins: [tailwind('./tailwind.config.js'), require('autoprefixer')],
}
