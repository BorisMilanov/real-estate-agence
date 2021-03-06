const mongoose = require('mongoose');

let housingSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 6,
        required: true,
    },
    type: {
        type: String,
        enum: ['Apartment', 'Villa', 'House'],
        required: true
    },
    year: {
        type: Number,
        required: true,
        min: 1960,
        max: 2022
    },
    city: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
        validate: /https?:\/\//i
    },
    propertyDescription: {
        type: String,
        required: true
    },
    availablePieces: {
        type: Number,
        required: true
    },
    tenants: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

housingSchema.method('getTenants', function () {
    return this.tenants.map(x => x.name).join(', ');
})

let Housing = mongoose.model('Housing', housingSchema);

module.exports = Housing;