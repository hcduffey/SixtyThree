const express = require('express');
const methodOverride = require('method-override')

const session = require('express-session');
const MongoStore = require('connect-mongo');

const controllers = require('./controllers')
const app = express();
const PORT = 4000;

require('./config/db.connection');

app.set('view engine', 'ejs')

// Middleware
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }))

app.use(
    session({
        store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI}),
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 * 2
        }
    })
);

// Controllers
// EXAMPLES: app.use('/products', controllers.products) 
// app.use('/reviews', controllers.reviews) 
app.use('/parks', controllers.parks);
app.use('/users', controllers.users);
app.use('/', controllers.auth);

// Home Route
app.get('/', (request, response) => response.send('Test'))

// Express Server: initializes the server; app.listen allows your computer to receive requests at http://localhost:4000/ 
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))