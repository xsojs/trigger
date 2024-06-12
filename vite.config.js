const path = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    minify: true,
    lib: {
      entry: path.resolve(__dirname, 'src/main.js'),
      name: 'trigger',
      fileName: (format) => `xso-trigger.${format}.js`
    }
  }
});