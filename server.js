// SERVER FILE - contains code to run the server

// dependencies required to run server ---------------------------------------------------------
require("dotenv").config() // bring in variables stored in .env file
const flash = require("connect-flash")
const mongoose = require("mongoose") // for connecting backend to MongoDB database
const express = require("express")
const cors = require("cors")
// connection to server (port 3000 will be used when running server on local machine)
const port = process.env.PORT || 3000
// import session package
const session = require("express-session")
// import connect-mongo - for using MongoDB for storing user sessions (instead of default MemoryStore)
const MongoStore = require("connect-mongo")
// allows express server to handle file uploads
const fileUpload = require("express-fileupload") 


// database connection -------------------------------------------------------------------------
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
    .then(() => console.log("db connected!"))
    .catch(err => console.error("db connection failed ", err))
    

// express app setup - configure express -------------------------------------------------------
// store express app in variable 'express'
const app = express()
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('*', cors()) // (cross origin resource sharing)
app.use(session({ // initialize a session. Secret code added - for saving sessions. Use MongoStore to store sessions.
    secret: '39dksl09doppskn3214lseqd5', 
    resave: false, 
    saveUninitialized: false, 
    store: MongoStore.create({  // use existing mongoose database connection
        mongoUrl: process.env.MONGO_URI,
        mongooseConnection: mongoose.connect }), 
    cookie: { maxAge: 180 * 60 * 100} // set how long session will last before expiring (180mins)
})) 
app.use(flash())
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }
  }))

// for shopping cart session
// so session variable can be accessed in all views on frontend
app.use(function(req, res, next) {
    res.locals.session = req.session
    next()
})

// ROUTES --------------------------------------------------------------------------------------
  // set up routes using express app 
  // modules imported from routes folder
  // anyone who goes to /xyz, use the xyzRouter

// Homepage route (dummy route to view on Heroku/for testing)
app.get('/', (req, res) => {
    res.send("This is the homepage")
})

// Nutrtion route
const nutritionRouter = require('./routes/nutrition')
app.use('/nutrition', nutritionRouter)

// Cart route
const cartRouter = require('./routes/cart')
app.use('/cart', cartRouter)

// Checkout route
const checkoutRouter = require('./routes/checkout')
app.use('/checkout', checkoutRouter)

// Order route
const orderRouter = require('./routes/order')
app.use('/order', orderRouter)

// Product route
const productRouter = require('./routes/product')
app.use('/product', productRouter)

// Item route (for individual product items to be added to cart/orders)
const itemRouter = require('./routes/item')
app.use('/item', itemRouter)

// Message (contact form) route
const messageRouter = require('./routes/message')
app.use('/message', messageRouter)


// run app (on configured port) -----------------------------------------------------------------
// (using port variable from dependencies)
app.listen(port, () => {
    console.log("App is running on port", port)
})
 