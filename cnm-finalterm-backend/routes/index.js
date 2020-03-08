var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/userController');
var adminCtrl = require('../controllers/adminController');
var accountCtrl = require('../controllers/accountController');
var contactCtrl = require('../controllers/contactController');
var transactionCtrl = require('../controllers/transactionController');
var verifyAccessToken = require('../repos/authRepo').verifyAccessToken;

router.get('/',function(req, res) {
    res.redirect('login');
});

router.post('/login', userCtrl.login_post);
router.post('/admin/login', adminCtrl.login_post);
router.post('/admin/createUser', userCtrl.register_post);
router.post('/admin/createAccount', accountCtrl.createAccount);
router.post('/admin/addBalance', accountCtrl.addBalance);

router.get('/users', verifyAccessToken, userCtrl.getUsersList);
router.get('/accounts', verifyAccessToken, accountCtrl.getAccountsListByUser);
router.get('/accounts/:user_id', verifyAccessToken, accountCtrl.getAccountsListByUserId);
router.get('/contacts', verifyAccessToken, contactCtrl.getContactsListByUser);
router.get('/transactions', verifyAccessToken, transactionCtrl.getTransactionsListByUser);
router.get('/account/:account_number', verifyAccessToken, accountCtrl.getAccountById);
router.get('/shutdown/:account_number', verifyAccessToken, accountCtrl.shutdownAccount);
router.post('/addContact', verifyAccessToken, contactCtrl.addContact);
router.post('/transaction', verifyAccessToken, transactionCtrl.saveTransactionAndSendOTP);

module.exports = router;
