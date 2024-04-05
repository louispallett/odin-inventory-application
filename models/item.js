const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    description: { type: String, minLength: 10, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    price: { type: mongoose.Decimal128, required: true },
    stock_number: { type: Number, required: true },
    country_of_origin: { type: Schema.Types.ObjectId, ref: "Country" },
    strength: { type: Number }
});

ItemSchema.virtual("url").get(function() {
    return `/catalog/item/${this._id}`;
});

module.exports = mongoose.model("Item", ItemSchema);
