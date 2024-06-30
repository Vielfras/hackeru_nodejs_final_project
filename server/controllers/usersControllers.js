// usersControllers.js

const bcrypt = require('bcryptjs');

const schemas = require("../schemas/usersSchema");
const User = require("../models/User");
const Err = require("../utils/errorHandling");
const Auth = require("../utils/authorisation");


const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({}).select('-password').exec();
    return res.status(200).json({
      success: true,
      data: allUsers,
    });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message, });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const authError = isAdminOrCreator(req.user, id, res);
    if (authError) {
      return authError;
    } 

    const found = await User.findById(id).select('-password').exec();
    if (!found) {
      return Err.userNotFound(id);
    }

    return res.status(200).json({
      success: true,
      data: found,
    });
  } catch (err) {
    return res.status(400).json({ success: false, message: "Invalid format for user id.", });
  }
};

// const searchInUsers = async (req, res) => {
//
//   // validate the request's body using joi
//   const { error, value } = schemas.searchUser.validate(req.body);
//   // check if there are joi validation errors
//   if (error) {
//     const errorsArray = error.details.map((err) => err.message); // creates an array of error-message strings
//     return res.status(400).json({ success: false, message: errorsArray });
//   }
//   // destructuring the variables from 'value'
//   const { searchTerm, searchFields } = value;
//
//   try {
//     // find the users containing the 'searchTerm' using our static 'multipleFieldsStringSearch' method
//     const found = await User.multipleFieldsStringSearch(searchTerm,searchFields);
//     // return the results (an empty array if not found)
//     return res.status(found.length !== 0 ? 200 : 204).json({
//       success: true,
//       data: found,
//     });
//   } catch (err) {
//     // return an error message
//     return res.status(400).json({ success: false, message: err.message });
//   }
// };

// TODO - This is a duplicate of auth/register
// const createNewUser = async (req, res) => {
//   const { error, value } = schemas.createNewUser.validate(req.body);
//   if (error) {
//     return res.status(400).json(Err.multipleErrToString(error));
//   }

//   const newUser = new User(value);

//   try {
//     const hashedPassword = await bcrypt.hash(newUser.password, 10);
//     newUser.password = hashedPassword;

//     const saved = await newUser.save();
//     const savedObject = saved.toObject();
//     // Delete 'password' key before returning object to user
//     delete savedObject.password;

//     return res.status(201).json({
//       success: true,
//       created: savedObject,
//     });
//   } catch (err) {
//     // handle duplicate email
//     if (err.code === 11000) {
//       return res.status(409)
//         .json({ success: false, message: `Email ${newUser.email} is already registered! Consider logging in.` })
//     }
//     return res.status(500).json({ success: false, message: `Error saving the user.` });
//   }
// };

const deleteUser = async (req, res) => {
  const { id } = req.params;
  
  try {
    const authError = Auth.isAdminOrCreator(req.user, id, res);
    if (authError) {
      return authError;
    } 

    const deleted = await User.findByIdAndDelete(id).select('-password').exec();
    if (!deleted) throw new Error();

    return res.status(200).json({
      success: true,
      deleted: deleted
    });
  } catch (err) {
    return res.status(404).json({ success: false, message: `User id ${id} not found.` });
  }
};


// TODO - Add some way to update onlt the field that was sent
//        as now it's possible to only send one field of a user and all the rest will be deleted.
//        EX. Sending only the first name, will delete the middle and the last.
const updateUser = async (req, res) => {
  const { error, value } = schemas.updateUser.validate(req.body);
  if (error) {
    return res.status(400).json(Err.multipleErrToString(error));
  }

  const { id } = req.params;
  
  try {
    const authError = Auth.isAdminOrCreator(req.user, id, res);
    if (authError) {
      return authError;
    } 

    const updated = await User.findByIdAndUpdate(id, value, { new: true }).select('-password').exec();
    if (!updated) {
      return Err.userNotFound(id);
    }

    return res.status(200).json({
      success: true,
      updated: updated,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: `Failed to update user: ${err}` });
  }
};



const updateUserBusinessStatus = async (req, res) => {
  console.log(req.body);
  const { error, value } = schemas.updateUserBusinessStatus.validate(req.body);

  if (error) {
    return res.status(400).json(Err.multipleErrToString(error));
  }

  const { id } = req.params;

  try {
    const authError = Auth.isAdminOrCreator(req.user, id, res);
    if (authError) {
      return authError;
    } 

    const updated = await User.findByIdAndUpdate(id, { isBusiness: value.isBusiness }, { new: true }).select('-password').exec();
    if (!updated) {
      return Err.userNotFound(id);
    }

    return res.status(200).json({
      success: true,
      updated: updated,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: `Failed to update user's business status: ${err}` });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  //searchInUsers,
  // createNewUser,
  deleteUser,
  updateUser,
  updateUserBusinessStatus,
};
