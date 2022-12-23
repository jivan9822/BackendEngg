const router = require('express').Router();
const card = require('../Controller/CardController');

router.route('/').post(card.createNewCard).get(card.getAllCard);

module.exports = router;
