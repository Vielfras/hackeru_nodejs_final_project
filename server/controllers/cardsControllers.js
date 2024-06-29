// cardsController.js

const schemas = require("../schemas/cardsSchema");
const Card = require("../models/Card");
const Err = require("../utils/errorHandling");


const getAllCards = async (req, res) => {
  try {
    const allCards = await Card.find({});
    return res.status(200).json({
      success: true,
      data: allCards,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const getUserCards = async (req, res) => {
  try {
    // Assuming req.user is populated by mustLogin middleware
    const userId = req.user.id; 
    console.log(userId);
    const userCards = await Card.find({ user_id: userId });
    return res.status(200).json({
      success: true,
      data: userCards,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const getCardById = async (req, res) => {
  const { id } = req.params;

  try {
    const found = await Card.findById(id).populate('user_id').exec();
    if (found) {
      return res.status(200).json({
        success: true,
        data: found,
      });
    }
    return res.status(404).json({
      success: false,
      message: `Card id '${id}' not found.`,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Invalid format for card id.",
    });
  }
};

const searchInCards = async (req, res) => {
  const { error, value } = schemas.searchCard.validate(req.body);

  if (error) {
    return res.status(400).json(Err.multipleErrToString(error));
  }

  const { searchTerm, searchFields } = value;
  try {
    const found = await Card.multipleFieldsStringSearch(searchTerm, searchFields);
    return res.status(found.length !== 0 ? 200 : 204).json({
      success: true,
      data: found,
    });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

const createNewCard = async (req, res) => {
  const { error, value } = schemas.createNewCard.validate(req.body);

  if (error) {
    return res.status(400).json(Err.multipleErrToString(error));
  }

  try {
    const existingCard = await Card.findOne({ title: value.title, email: value.email, user_id: req.user.id });
    if (existingCard) {
      return res.status(409).json({ success: false, message: `You already have a card with the title "${value.title}" and email "${value.email}".` });
    }

    
    const newCard = new Card(value);
    newCard.user_id = req.user.id;
    newCard.bizNumber = await Card.getNextBizNumber();

    const saved = await newCard.save();

    return res.status(201).json({
      success: true,
      created: saved,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: `Error saving card` });
  }
};

const deleteCard = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Card.findByIdAndDelete(id);
    if (!deleted) {
      throw new Error();
    }

    return res.status(200).json({ success: true, deleted: deleted });
  } catch (err) {
    return res.status(404).json({ success: false, message: `Card id ${id} not found.` });
  }
};

const updateCard = async (req, res) => {
  const { error, value } = schemas.updateCard.validate(req.body);

  if (error) {
    return res.status(400).json(Err.multipleErrToString(error));
  }

  const { id } = req.params;

  // TODO - Move this inside the try/catch
  let updated;

  try {
    updated = await Card.findByIdAndUpdate(id, value, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: `Card id ${id} was not found.` });
    }

    return res.status(200).json({
      success: true,
      updated: updated,
    });
  } catch (err) {
    return res.status(404).json({ success: false, message: `Card id ${id} was not found.` });
  }
};


module.exports = {
  getAllCards,
  getUserCards,
  getCardById,
  searchInCards,
  createNewCard,
  deleteCard,
  updateCard,
};
