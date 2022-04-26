const express = require('express');
const methodOverride = require('method-override')
const controllers = require('./controllers')
const app = express();
const PORT = 4000;

require('./config/db.connection');

app.set('view engine', 'ejs')

// Middleware
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }))

// Controllers
// EXAMPLES: app.use('/products', controllers.products) 
// app.use('/reviews', controllers.reviews) 
app.use('/parks', controllers.parks);

// Home Route
app.get('/', (request, response) => response.send('Test'))

// Express Server: initializes the server; app.listen allows your computer to receive requests at http://localhost:4000/ 
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))