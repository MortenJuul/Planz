const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
// const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const passport = require('passport');
// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);
const connectDB = require('./app/config/db');
const cors = require('cors');
const cookieSession = require('cookie-session');

const app = express()

// Use Cors
const whitelist = ['http://localhost:3000', 'http://localhost:5000', 'https://plaanz.herokuapp.com/']
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Load config
dotenv.config({ path: './app/config/config.env' })

// Passport config
require('./app/config/passport')(passport)

connectDB()

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Method override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  })
)

// // Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}


// Sessions
// app.use(
//   session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: false
//     // ,store: new MongoStore({ mongooseConnection: mongoose.connection }),
//   })
// )

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY]
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Set global var
app.use(function (req, res, next) {
  res.locals.user = req.user || null
  next()
})

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Routes
// app.use('/', require('./app/routes/index'))
app.use('/auth', require('./app/routes/auth'))
app.use('/task', require('./app/routes/task'))
// require("./app/routes/auth.router.js")(app);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
});



const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)