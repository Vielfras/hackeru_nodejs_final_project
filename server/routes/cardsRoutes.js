const router = require('express').Router();
const { getAllCards, getCardById, searchInCards, createNewCard, deleteCard, updateCard } = require('../controllers/cardsControllers');

  //  base path = "/api/cards"

  // PROTECTEC ROUTES:
  // mustLogin:  the user must be logged in to view this content (any type of logged-in user)
  // allowedRoles:   the user must also have ONE of the following roles (admin, business, ...)
  router.get('/', getAllCards)
  
  // unprotected Routes :
  router.get('/:id', getCardById)
  router.post('/search', searchInCards)
  router.post('/' ,createNewCard)
  router.delete('/:id', deleteCard)
  router.patch('/:id', updateCard)

module.exports = router;