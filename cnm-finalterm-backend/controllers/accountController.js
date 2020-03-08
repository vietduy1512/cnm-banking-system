var http = require("http");
var accountRepo = require('../repos/accountRepo');
var userRepo = require('../repos/userRepo');

exports.getAccountsListByUser = async function (req, res) {
  var accounts = await accountRepo.getAccountListByUserId(req.cookies['d-user-id']);
  res.json({
    accounts: accounts,
  })
}

exports.getAccountsListByUserId = async function (req, res) {
  var accounts = await accountRepo.getAccountListByUserId(req.params.user_id);
  res.json({
    accounts: accounts,
  })
}

exports.getAccountById = async function (req, res) {
  var account = await accountRepo.getAccountByAccountNumber(req.params.account_number);
  if (account[0]) {
    var user = await userRepo.getUserById(account[0].user_id)
    if (user[0] == null) return;

    var response = {
      account_number: account[0].account_number,
      name: (user[0].name) ? user[0].name : user[0].username,
      active: account[0].active
    }

    res.json({
      account: response,
    })
  } else {
    res.statusCode = 400;
    res.json({
      result: false,
      msg: 'Account not existed'
    })
  }
}

exports.createAccount = async function (req, res) {
  var account = {
    user_id: req.body.user_id,
    account_number: req.body.account_number,
    balance: req.body.balance,
    active: 1
  }
  
  await accountRepo.saveAccount(account);
  res.json({
    result: true,
    msg: 'Create Account successfully'
  })
}

exports.addBalance = async function (req, res) {
  await accountRepo.addBalance(req.body.account_number, req.body.user_id, req.body.balance);
 
  res.json({
    result: true,
    msg: 'Add balance successfully'
  })
}

exports.shutdownAccount = async function (req, res) {
  var accounts = await accountRepo.getAccountListByUserId(req.cookies['d-user-id']);
  var account = await accountRepo.getAccountByAccountNumber(req.params.account_number);
  
  if (accounts.length <= 1) {
    res.statusCode = 400;
    res.json({
      result: false,
      msg: 'Cannot shutdown last account'
    })
  } else if (!account[0]) {
    res.statusCode = 400;
    res.json({
      result: false,
      msg: 'Account notfound'
    })
  } else {
    await accountRepo.shutdown(req.params.account_number, req.cookies['d-user-id']);
   
    res.json({
      result: true,
      msg: 'Shutdown account successfully'
    })
  } 
}