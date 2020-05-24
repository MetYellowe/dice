var express = require('express');
var router = express.Router();

var gameController = require('../controllers/gameController');

/* GET home page. */
router.get('/', gameController.gamer_create_get);
router.post('/', gameController.gamer_create_post);
router.get('/dice/:id', gameController.game_page);
router.get('/cv', gameController.cv_page);

module.exports = router;
