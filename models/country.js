const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CountrySchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    abbreviation: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 3,
    },
    image_url: { type: String },
});

CountrySchema.virtual("url").get(function() {
    return `/catalog/country/${this._id}`;
});

module.exports = mongoose.model("Country", CountrySchema);