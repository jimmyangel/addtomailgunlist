const MAILGUN = require('mailgun-js');

/*
  This Google Cloud Function is used to add new members to an arbitrary mailgun mailing list,
  depending on runtime config parameters set in environment variables.
*/
exports.addToMailgunList = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'POST');
  if (req.method === 'POST') {
    var mailgun = new MAILGUN({apiKey: process.env.MAILGUNAPIKEY, domain: process.env.MAILGUNDOMAIN});
    var list = mailgun.lists(process.env.MAILINGLIST);
    var member = {
      subscribed: true,
      address: req.body.email
    };
    list.members().create(member, function (err, data) {
      if (err) {
        res.status(err.statusCode).send(data);
      } else {
        res.send(data);
        // Notify with an email -- no big deal if it fails
        mailgun.messages().send({
          from: 'Mailing list request<' + 'postmaster@' + process.env.MAILGUNDOMAIN + '>',
          to: process.env.NOTIFICATIONEMAIL,
          subject: 'FYI: new address added to mailing list',
          text: req.body.email + ' has been added to the mailing list ' + process.env.MAILINGLIST
        });
      }
    });
  } else {
    res.status(405).send({message: 'Only POST method is allowed'});
  }
};
