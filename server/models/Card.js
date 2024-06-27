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
    user_id: { type:mongoose.SchemaTypes.ObjectId, ref:'User' },
    likes: [mongoose.SchemaTypes.ObjectId],
    /*
    someKey: {
      // Thing we should use mongoose schema for:
        type: String,     // set the expected type (Number,String,....)
        unique: true,     // make sure this value in unique for this key in the entrie collection
        immutable: true,  // immutable=true -> this field is like 'const', once its value is set it can't change
      // Thing we should use JOI schema for:
        default: "defaultImage.jpg",    // sets default *static* value
        // default: () => Date.now(),   // sets default *dynamic* value
        required: true,   // is field required ?
        min: 1,           // for Number type. set minimum numeric value.
        max: 120,         // for Number type. set maximum numeric value.
        minLength: 5,     // for String type. set minimum string length.
        maxLength: 15,    // for String type. set maximum string length.
        lowercase: true,  // Hello  --> hello
        uppercase: true,  // Hello  --> HELLO
        trim: true,       // remove trailing spaces
    },
    */
  },
  {
    timestamps: true,
  }
);


// Mongoose Model methods --------------------------------------------------------------\

// Document-level functions (operates at the single document level)

  /* Example
  cardSchema.methods.sayWhereYouLive = function () {
    console.log(`I live in ${this.address.street}, ${this.address.city}`)
  }
  */

// Virtuals (operates at the single document level)

  /* Example:
  cardSchema.virtual('fullAddress').get( function () {
    return `My full adddress is: 
            ${this.address.street} ${this.address.houseNumber}, 
            ${this.address.city}, ${this.address.country} ${this.address.zip}`
  })
  */

// Model-level function (operates at the collection level)

  /* Example:
  cardSchema.statics.updateEmptyImageUrl = async function (urlString) {
    try {
      console.log('update to default !')
      return await this.updateMany( { "image.url":"" }, { "image.url":urlString } )
    } catch(err) {
      throw err
    }
  }
  */

  cardSchema.statics.getNextBizNumber = async function () {
    try {
      // find the highest current biznumber in our cards collection
      const found = await Card.find({}).sort([["bizNumber",-1]]).limit(1).exec();
      // not found (empty collection), so return 1 as next bizNumber
      if (found.length===0) return 1
      // found
      const nextBizNumber = found[0].bizNumber + 1;
      return nextBizNumber;
    } catch(err) {
      throw err
    }
  }


  /**
   * @param {string} searchTerm - Your search term (case insensitive)   : 'your search term'
   * @param {Array.<String>} searchFields - The fields to search inside : ['title','email',...]
   * @returns {Array.<String>} - Found cards or an empty array if no cards found.
   */

  cardSchema.statics.multipleFieldsStringSearch = function(searchTerm,searchFields) {
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

// -------------------------------------------------------------------------------------/


// compile the schema into a model.
// we will use this model to access our cards collection.
const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
