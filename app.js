const express = require("express");
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const path = require('path')
const csurf = require('csurf')
const MONGO_URI = "mongodb+srv://admin:admin@cluster0.qfbbp.mongodb.net/my-shop?retryWrites=true&w=majority"
const shopRouter = require('./routes/shop')
const app = express()
const multer = require('multer')
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
})
const filefilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
const store = new MongoDBStore({
    uri: MONGO_URI,
    collection: 'sessions'
})
const csrfProtection = csurf()
app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({extended: false}))
app.use(multer({storage: fileStorage, fileFilter: filefilter}).single('image'))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(session({secret: 'my secret', resave: false, saveUninitialized: false, store: store}))
app.use(csrfProtection)
app.use(shopRouter.router)
mongoose.connect(MONGO_URI)
.then(result => {
    app.listen(3000)
    console.log('Connected')
})
.catch(err => console.log(err))