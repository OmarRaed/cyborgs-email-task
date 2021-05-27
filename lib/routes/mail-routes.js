const {Router} = require('express');
const mailController = require('../controller/mail-controller');

const router = Router();

router.post('/email', mailController.sendEmail);

module.exports = router;