var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GamerSchema = new Schema({
    name: {type: String, required: true, max: 11},
    password: {type: String, required: [true, 'User password required'], max: 20, validate: {
        validator: function(v) {
            return new RegExp("^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$").test(v) ;
        },
        message: props => `${props.value} password must be include Upper Case letters, numbers, and special characters!`

        }
    },
    opponent: {type: String, required: true}
});

// Virtual for Game Page's URL
GamerSchema
    .virtual('url')
    .get(function() {
        return '/catalog/dice/' + this._id;
    });

// Export model
module.exports = mongoose.model('Gamer', GamerSchema);