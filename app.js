const express = require('express')
const cors= require('cors')

const app = express()


// Connect DB
require("./config/connectDB")

//const swaggerUI = require('swagger-ui-express')
//const swaggerSpec = require('./swagger')

app.set('PORT',process.env.PORT || 3000 )
app.use(express.json())
app.use(cors())

//app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));


//middleware
app.use('/supplier',require('./routes/supplier'))
app.use('/product',require('./routes/products'))

app.listen(app.get('PORT'), () => console.log(`Server Ready at http://localhost:${app.get('PORT')}`))
