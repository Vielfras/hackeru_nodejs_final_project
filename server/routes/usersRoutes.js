//userRoutes.js

const router = require('express').Router();
const { getAllUsers, getUserById, /*searchInUsers,*/ createNewUser, deleteUser, updateUser } = require('../controllers/usersControllers');
const { mustLogin, allowedRoles } = require('../controllers/authControllers');

//  base path = "/api/users"

router.get('/', mustLogin, allowedRoles(['admin']), getAllUsers)
router.get('/:id', getUserById)
//router.post('/search', searchInUsers)
router.post('/', createNewUser)
router.delete('/:id', deleteUser)
router.patch('/:id', updateUser)

module.exports = router;
