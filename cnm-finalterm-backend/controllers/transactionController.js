var http = require("http");
var accountRepo = require('../repos/accountRepo');
var transactionRepo = require('../repos/transactionRepo');

// var twilio = require('twilio');
// var client = new twilio('ACc49eeb02f80651301961d853eba6e95c', 'e55f79b186bbac2f570a88e4558f6616');

exports.getTransactionsListByUser = async function (req, res) {
  var transactions = await transactionRepo.getTransactionListByUserId(req.cookies['d-user-id']);
  res.json({
    transactions: transactions,
  })
}

exports.saveTransactionAndSendOTP = async function (req, res) {
  var user_account = await accountRepo.getAccountByAccountNumber(req.body.user_account_number);

  if (user_account[0] == null) {
    res.statusCode = 400;
    res.json({
      result: false,
      msg: 'Account not existed'
    })
  }
  if (parseInt(user_account[0].balance) < parseInt(req.body.amount)) {
    res.statusCode = 400;
    res.json({
      result: false,
      msg: 'Balance is not enough'
    })
  }
  if (parseInt(req.body.amount) < 0) {
    res.statusCode = 400;
    res.json({
      result: false,
      msg: 'Amount is minus'
    })
  }

  var recipient_account = await accountRepo.getUserIdByAccountNumber(req.body.recipient_account_number);
  var transaction = {
    user_account_number: req.body.user_account_number,
    user_id: user_account[0].id,
    recipient_account_number: req.body.recipient_account_number,
    recipient_id: recipient_account[0].user_id,
    amount: req.body.amount,
    comment: req.body.comment,
    fee_type: req.body.fee_type,
    transfered: 0
  }

  var saveResult = await transactionRepo.saveTransaction(transaction);
  transaction.id = saveResult[0].seq;

  // --- Send OTP ---
  // client.messages.create({
  //   to: '0938693329',
  //   from: '0938693329',
  //   body: 'Otp is ...'
  // });

  var processResult = await transactionRepo.processTransaction(transaction);

  res.json({
    result: processResult,
    msg: 'Transaction is successfully'
  })
}