var http = require("http");
var accountRepo = require('../repos/accountRepo');
var userRepo = require('../repos/userRepo');
var contactRepo = require('../repos/contactRepo');

exports.getContactsListByUser = async function (req, res) {
  var contacts = await contactRepo.getContactListByUserId(req.cookies['d-user-id']);
  res.json({
    contacts: contacts,
  })
}

exports.addContact = async function (req, res) {
  var contact = {
    user_id: req.cookies['d-user-id'],
    recipient_account_number: req.body.recipient_account_number,
    recipient_name: req.body.recipient_name
  }
  var ExistedContacts = await contactRepo.checkExistContact(contact.user_id, contact.recipient_account_number);
  if (ExistedContacts.length > 0) {
    res.statusCode = 400;
    res.json({
      result: false,
      msg: 'Existed Contact'
    })
  } else {
    await contactRepo.addContact(contact);
    res.json({
      result: true
    })
  }
}