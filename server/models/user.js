const mongoose = require('mongoose');

const User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    }
});

// Insert test
// const newUser = new User({
//     email: 'test@gmail.com'
// });
// newUser.save().then((doc) => {
//     console.log('Saved user: ', doc);
// }, (error) => {
//     console.log('Unable to save user');
// });

module.exports = { User };
