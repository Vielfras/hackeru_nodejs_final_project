//userRoutes.js

const router = require('express').Router();
const { getAllUsers, getUserById, /*searchInUsers,*/ createNewUser, deleteUser, updateUser, updateUserBusinessStatus } = require('../controllers/usersControllers');
const { mustLogin, allowedRoles, ROLES } = require('../controllers/authControllers');

// base path = "/api/users"

// SPECIFIC
router.get('/', mustLogin, allowedRoles([ROLES.ADMIN]), getAllUsers);
router.post('/', createNewUser);

//router.post('/search', searchInUsers)

// UNspecific
// TODO - Add allowedUsers authentication
router.get('/:id', mustLogin, getUserById);
router.delete('/:id', mustLogin, deleteUser);
router.put('/:id', mustLogin, updateUser);
router.patch('/:id', mustLogin, updateUserBusinessStatus);

module.exports = router;
