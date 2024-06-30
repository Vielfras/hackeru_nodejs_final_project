// cardsRoutes.js

const router = require('express').Router();
const { mustLogin, allowedRoles, ROLES } = require('../controllers/authControllers');
const { getAllCards, getCardById, searchInCards, getUserCards, createNewCard, deleteCard, editCard, toggleCardLike } = require('../controllers/cardsControllers');

/*
============================================
        BASE PATH  = "/api/cards"
============================================
*/

//  SPECIFIC
router.get('/', getAllCards)
router.post('/', mustLogin, allowedRoles([ROLES.BUSINESS, ROLES.ADMIN]), createNewCard)
router.get('/my_cards', mustLogin, getUserCards)
router.post('/search', searchInCards)

//  UNspecific
router.get('/:id', getCardById)
router.delete('/:id', mustLogin, deleteCard)
router.put('/:id', mustLogin, editCard)
router.patch('/:id', mustLogin, toggleCardLike)


module.exports = router;
