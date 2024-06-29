// cardsRoutes.js

const router = require('express').Router();
const { mustLogin, allowedRoles, ROLES } = require('../controllers/authControllers');
const { getAllCards, getCardById, searchInCards, getUserCards, createNewCard, deleteCard, updateCard } = require('../controllers/cardsControllers');

//  Base path = "/api/cards"

//  SPECIFIC
router.get('/', getAllCards)
router.get('/my_cards', mustLogin, getUserCards)

router.post('/', mustLogin, allowedRoles([ROLES.BUSINESS, ROLES.ADMIN]), createNewCard)
router.post('/search', searchInCards)



//  UNspecific
router.get('/:id', getCardById)
router.delete('/:id', mustLogin, deleteCard)
router.patch('/:id', mustLogin, updateCard)



module.exports = router;