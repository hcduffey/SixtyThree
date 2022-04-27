// This is requiring in the connection that's linking to my Mongo Atlas
require('../config/db.connection')

const Park = require('./Park');
const User = require('./User');


// User.create({
//     name: "Cliff Duffey",
//     email: "cliff@test.com",
//     password: "notapassword"
// }).then((response) => console.log(response));

// Park.create({
//     name: "Test Park",
//     imageUrl: "http://www.google.com",
//     city: "Alexandria",
//     state: "Virginia",
//     lat: "123",
//     long: "123",
//     parkCode: "tp"
// }).then((response) => console.log(response));

// Park.create({
//     name: "Second Park",
//     imageUrl: "http://www.google.com",
//     city: "Alexandria",
//     state: "Virginia",
//     lat: "123",
//     long: "123",
//     parkCode: "tp"
// }).then((response) => console.log(response));


// User.updateOne({name: "Cliff Duffey"}, {email: "cliff@updated.com"}).then((response) => console.log(response));
// async function addParkToUser() {
//     try {
//         let parktoAdd = await Park.findOne({name: "Second Park"});
//         let usertoUpdate = await User.findOne({name: "Cliff Duffey"});
//         usertoUpdate.parks.push(parktoAdd);
//         usertoUpdate.save();
//     }
//     catch(err) {
//         console.log(err);
//     }
// }

// addParkToUser();

// User.find({name: "Cliff Duffey"}).then((response) => console.log(response));


// module.exports = {
//     Review: require('./Review')
// }