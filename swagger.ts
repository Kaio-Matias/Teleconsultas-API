const doc = require('./doc')
const swaggerAutogen = require('swagger-autogen')()

const outputFile = 'swagger_output.json'
const endpointsFiles = [
  `./src/routes.ts`,
]

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require(`./src/server.ts`)
})

