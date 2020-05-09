const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
require('dotenv').config()

const app = express();

//connect to database
mongoose.connect(process.env.DATABASE, {useNewUrlParser:true,
useFindAndModify:false,
useUnifiedTopology:true,
useCreateIndex:true}).then(()=>console.log('DB WORKING')).catch((err)=>console.log('DB ERROR: ' + err))

// import routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')



//app midlewares
app.use(expressValidator())
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))
if((process.env.NODE_ENV = 'development')){
    app.use(cors({origin:'http://localhost:3000'}))
}
app.use(cors())

// middleware
app.use('/api', authRoutes)
app.use('/api', userRoutes)

const port = process.env.PORT || 8000
app.listen(port,()=>{
    console.log('API is running on port '+port)
})