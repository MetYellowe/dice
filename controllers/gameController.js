const { body, validationResult} = require('express-validator');
const { check } = require('express-validator');

var Gamer = require('../models/gamer_model');
var async = require('async');
var debug = require('debug')('gamer');

// Display title page to enter the game.
exports.gamer_create_get = function(req, res, next) {
    res.render('title_page', { title: 'Welcom to Game! Try your luck!'})
};
// Handle Gamer create on POST.
exports.gamer_create_post = [
    // Validate that the name field is not empty.
    body('name', 'Nickname must be length from 1 to 10 letters').trim().isLength({ min: 1, max: 10 }),
    body('password', 'Password must be include Upper Case latters and numbers, total amount 6').matches(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/, 'i'),

    // Sanitize (escape) the name field.
    check('name').escape(),


    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a gamer object with escaped and trimmed data.
        var gamer = new Gamer({
           name: req.body.name,
           password: req.body.password,
           opponent: req.body.opponent
        });
        
        if(!errors.isEmpty()) {
            // There are error. Render the form again with sanitized values/error messages.
            res.render('title_page', { title: 'Welcom to Game! Try your luck!', gamer: gamer, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.
            // Check if Gamer with same name already exists.
            Gamer.findOne({
                'name': req.body.name
            })
            .exec(function(err, found_gamer) {
                if(err) {
                    debug('update error: ' + err);
                    return next(err);
                }

                if(found_gamer) {
                    Gamer.findOne({
                        'password': req.body.password
                    }).exec(function(err, found_gamer1) {

                        if(err) {
                            debug('validate on password: ' + err);
                            return next(err);
                        }

                        if(found_gamer1) {
                            Gamer.findOne({
                                'password': req.body.password,
                                'opponent': req.body.opponent
                            }).exec(function(err, found_gamer2) {

                                if(err) {
                                    debug('validate on opponent: ' + err);
                                    return next(err);
                                }

                                if(found_gamer2) {
                                    // Gamer exist, go to game.
                                    res.redirect(found_gamer2.url);
                                }
                                else {
                                    gamer.save(function(err) {
                                        if(err) {
                                            debug('update error: ' + err);
                                            return next(err);
                                        }
                                        // Gamer saved. Go to game.
                                        res.redirect(gamer.url);
                                    });
                                }
                            });
                            
                        }
                        else {
                            res.render('title_page', {message: "This Nickname is already taken"});
                        }
                    });
                    
                }
                else {

                    gamer.save(function(err) {
                        if(err) {
                            debug('update error: ' + err);
                            return next(err);
                        }
                        // Gamer saved. Go to game.
                        res.redirect(gamer.url);
                    });
                }
            });

        }
    }
];

// Display game page for a specific Gamer(s).
exports.game_page = function(req, res, next) {
    Gamer.findById(req.params.id)
    .exec(function(err, result) {
        if(err) {
            debug('update error: ' + err);
            return next(err);
        }
        if(result==null) {
            var err = new Error('Gamer not found');
            err.status = 404;
            debug(err);
        }
        res.render('dice', {name: result.name, opponent: result.opponent});
    });
};

exports.cv_page = function(req, res, next) {
    try {
        res.render('cv');
    } catch (e) {
        debug(e);
        return next(e);
    }
};