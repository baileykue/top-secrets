const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

module.exports = Router().get(
  '/',
  authenticate,
  authorize,
  async (req, res, next) => {
    try {
      const secrets = [
        {
          id: '1',
          title: 'Hello, freinds!',
          description: '65 degrees eating crackers with cheese',
          user_id: '1',
        },
        {
          id: '2',
          title: 'Making coffee',
          description: 'gots to get that bean water',
          user_id: '1',
        },
      ];

      res.send(secrets);
    } catch (error) {
      next(error);
    }
  }
);
