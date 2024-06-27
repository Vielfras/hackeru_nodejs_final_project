// Cards.js

const mongoose = require("mongoose");
const { addressSchema, imageSchema } = require("./common");
const { ref } = require("joi");


const cardSchema = new mongoose.Schema(
  {
    title: String,
    subtitle: String,
    description: String,
    phone: String,
    email: String,
    web: String,
    image: imageSchema,
    address: addressSchema,
    bizNumber: Number,
    user_id: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    likes: [mongoose.SchemaTypes.ObjectId],
  },
  {
    timestamps: true,
  }
);


cardSchema.statics.getNextBizNumber = async function () {
  try {
    // find the highest current biznumber in our cards collection
    const found = await Card.find({}).sort([["bizNumber", -1]]).limit(1).exec();

    if (found.length === 0) {
      return 1;
    }

    const nextBizNumber = found[0].bizNumber + 1;
    return nextBizNumber;
  } catch (err) {
    throw err
  }
}


/**
 * @param {string} searchTerm - Your search term (case insensitive)   : 'your search term'
 * @param {Array.<String>} searchFields - The fields to search inside : ['title','email',...]
 * @returns {Array.<String>} - Found cards or an empty array if no cards found.
 */
cardSchema.statics.multipleFieldsStringSearch = function (searchTerm, searchFields) {
  const query = {
    $or:
      [
        ...searchFields.map(field => ({
          [field]: new RegExp(searchTerm, 'i')
        }))
      ]
  };

  return this.find(query);
};


const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
