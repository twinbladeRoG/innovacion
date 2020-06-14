const { param, body } = require('express-validator');

const ParticipantValidator = {
  validateParticipantID: [
    param('id')
      .exists()
      .trim()
      .isMongoId()
      .withMessage('Invalid participant ID'),
  ],

  validateParticipant: [
    body('first_name')
      .exists()
      .trim()
      .withMessage('Missing first name')
      .isLength({ min: 2, max: 50 })
      .withMessage('Name should contain min 2 to max 50 characters')
      .isAlpha()
      .withMessage('Name should contain only alphabets'),
    body('last_name')
      .exists()
      .trim()
      .withMessage('Missing last name')
      .isLength({ min: 2, max: 50 })
      .withMessage('Name should contain min 2 or max 50 characters')
      .isAlpha()
      .withMessage('Name should contain only alphabets'),
    body('contact')
      .exists()
      .trim()
      .withMessage('Missing phone number')
      .isMobilePhone()
      .withMessage('Invalid phone number'),
    body('email')
      .exists()
      .trim()
      .withMessage('Missing email')
      .isEmail()
      .withMessage('Invalid email ID'),
    body('institute')
      .exists()
      .trim()
      .withMessage('Missing institute name')
      .isLength({ min: 2, max: 50 })
      .withMessage('Institute name should contain min 2 or max 50 characters'),
  ],

  validateParticipantUpdate: [
    param('id').exists().isMongoId().withMessage('Invalid participant ID'),
    body('first_name')
      .optional()
      .isLength({ min: 2, max: 50 })
      .withMessage('Name should contain min 2 to max 50 characters')
      .isAlpha()
      .withMessage('Name should contain only alphabets'),
    body('last_name')
      .optional()
      .isLength({ min: 2, max: 50 })
      .withMessage('Name should contain min 2 or max 50 characters')
      .isAlpha()
      .withMessage('Name should contain only alphabets'),
    body('contact')
      .optional()
      .isMobilePhone()
      .withMessage('Invalid phone number'),
    body('email').optional().isEmail().withMessage('Invalid email ID'),
    body('institute')
      .optional()
      .isLength({ min: 2, max: 50 })
      .withMessage('Institute name should contain min 2 or max 50 characters'),
  ],

  validateFilter: [
    body('first_name')
      .optional()
      .isLength({ min: 2, max: 50 })
      .withMessage('Name should contain min 2 to max 50 characters')
      .isAlpha()
      .withMessage('Name should contain only alphabets'),
    body('last_name')
      .optional()
      .isLength({ min: 2, max: 50 })
      .withMessage('Name should contain min 2 or max 50 characters')
      .isAlpha()
      .withMessage('Name should contain only alphabets'),
    body('contact')
      .optional()
      .isMobilePhone()
      .withMessage('Invalid phone number'),
    body('email').optional().isEmail().withMessage('Invalid email ID'),
    body('institute')
      .optional()
      .isLength({ min: 2, max: 50 })
      .withMessage('Institute name should contain min 2 or max 50 characters'),
  ],
};

module.exports = ParticipantValidator;
