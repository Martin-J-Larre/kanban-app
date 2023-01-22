const router = require('express').Router();
const { register, login } = require('../controllers/userController');
const { body } = require('express-validator');
const { validate } = require('../utils/validation');
const { verifyToken } = require('../utils/tokenHandler');
const UserModel = require('../models/UnserModel');

router.post('/signup',
  body('username').isLength({ min: 8 }).withMessage('username must to be minimun 8 characters'),
  body('password').isLength({ min: 8 }).withMessage('password must to be minimun 8 characters'),
  body('confirmPassword').isLength({ min: 8 }).withMessage('password must to be minimun 8 characters'),
  body('username').custom(async value => {
      const user = await UserModel.findOne({ username: value });
    if (user) {
      return Promise.reject('Username already used');
    }
    }),
  validate, register  
);

router.post('/login',
  body('username').isLength({ min: 8 }).withMessage('username must to be minimun 8 characters'),
  body('password').isLength({ min: 8 }).withMessage('password must to be minimun 8 characters'),
  validate, login
);

router.post('/verify-token', verifyToken, (req, res) => {
  res.status(200).json({ user: req.user })
  }
)

module.exports = router;