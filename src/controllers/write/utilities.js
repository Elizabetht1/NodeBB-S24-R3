'use strict';

const user = require('../../user');
const authenticationController = require('../authentication');
const helpers = require('../helpers');

const Utilities = module.exports;

Utilities.ping = {};
Utilities.ping.get = (req, res) => {
    helpers.formatApiResponse(200, res, {
        pong: true,
    });
};

Utilities.ping.post = (req, res) => {
    helpers.formatApiResponse(200, res, {
        uid: req.user.uid,
        received: req.body,
    });
};

Utilities.login = (req, res) => {
    res.locals.redirectAfterLogin = async (req, res) => {
        console.log("redirect after logging in r \n");
        const userData = (await user.getUsers([req.uid], req.uid)).pop();
        helpers.formatApiResponse(200, res, userData);
    };
    res.locals.noScriptErrors = (req, res, err, statusCode) => {
        console.log("noScriptErrors \n");
        helpers.formatApiResponse(statusCode, res, new Error(err));
    };

    authenticationController.login(req, res);
};
