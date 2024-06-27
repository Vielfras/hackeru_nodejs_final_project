// cardsRoutes.js

const router = require('express').Router();
const { getAllCards, getCardById, searchInCards, getUserCards, createNewCard, deleteCard, updateCard } = require('../controllers/cardsControllers');

//  Base path = "/api/cards"

// UNprotected Routes :
router.get('/', getAllCards)
router.get('/:id', getCardById)
router.post('/search', searchInCards)

// PROTECTED ROUTES:
// mustLogin:  the user must be logged in to view this content (any type of logged-in user)
// allowedRoles:   the user must also have ONE of the following roles (admin, business, ...)
router.get('/my_cards', getUserCards)
router.post('/', createNewCard)
router.delete('/:id', deleteCard)
router.patch('/:id', updateCard)

module.exports = router;