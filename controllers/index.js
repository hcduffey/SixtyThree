// This is connecting the models, which connects to the db, into the controllers
// require('../models')

module.exports = {
    reviews: require('./reviews_controller'),
    parks: require('./park_controller'),
    users: require('./user_controller'),
    auth: require('./auth_controller')
}