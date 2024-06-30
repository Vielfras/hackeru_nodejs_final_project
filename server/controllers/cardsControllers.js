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
    const userId = req.user.id;
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

  const userId = req.user.id;
  const isAdmin = req.user.isAdmin;

  try {
    let deleted;

    if (isAdmin) {
      deleted = await Card.findByIdAndDelete(id);
    } else {
      deleted = await Card.findOneAndDelete({ _id: id, user_id: userId });
    }

    if (!deleted) {
      return res.status(404).json({ success: false, message: `Card id ${id} not found or you are not authorized to delete it.` });
    }

    return res.status(200).json({ success: true, deleted: deleted });
  } catch (err) {
    return res.status(404).json({ success: false, message: `Card id ${id} not found.` });
  }
};

const editCard = async (req, res) => {
  const { error, value } = schemas.updateCard.validate(req.body);
  if (error) {
    return res.status(400).json(Err.multipleErrToString(error));
  }

  const { id } = req.params;

  const userId = req.user.id;
  const isAdmin = req.user.isAdmin;

  try {
    let editedCard;

    if (isAdmin) {
      editedCard = await Card.findByIdAndUpdate(id, value, { new: true });
    } else {
      editedCard = await Card.findOneAndUpdate({ _id: id, user_id: userId }, value, { new: true });
    }

    if (!editedCard) {
      return res.status(404).json({ success: false, message: `Card id ${id} was not found.` });
    }

    return res.status(200).json({
      success: true,
      editedCard: editedCard,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: `Failed to retrieve card due to: ${err.message}.` });
  }
};

const toggleCardLike = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const card = await Card.findById(id);
    if (!card) {
      return res.status(404).json({ success: false, message: `Card id ${id} not found.` });
    }

    const userIndex = card.likes.indexOf(userId);

    if (userIndex === -1) {
      card.likes.push(userId);
    } else {
      card.likes.splice(userIndex, 1);
    }

    await card.save();

    return res.status(200).json({
      success: true,
      likes: card.likes,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: `Failed to toggle like due to: ${err.message}.` });
  }
};



module.exports = {
  getAllCards,
  getUserCards,
  getCardById,
  searchInCards,
  createNewCard,
  deleteCard,
  editCard,
  toggleCardLike,
};
