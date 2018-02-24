
const CORS = require('cors')({origin: 'true'}); // API must be accessible
const MAILGUN = require('mailgun-js');

// Get configuration variables
const CONFIG = require('cloud-functions-runtime-config').getVariables('hm-mailinglistparms', ['mailgun-domain', 'mailgun-api-key', 'mailinglist', 'notification-email']);

/*
  This Google Cloud Function is used to add new members to an arbitrary mailgun mailing list,
  depending on runtime config parameters.
*/
exports.addToMailgunList = (req, res) => {
  CORS(req, res, () => {
    if (req.method === 'POST') {
      CONFIG.then((values) => {
        var mailgunDomain = values[0];
        var mailgunApiKey = values[1];
        var mailinglist = values[2];
        var notificationEmail = values[3];
        var mailgun = new MAILGUN({apiKey: mailgunApiKey, domain: mailgunDomain});
        var list = mailgun.lists(mailinglist);
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
              from: 'Mailing list request<' + 'postmaster@' + mailgunDomain + '>',
              to: notificationEmail,
              subject: 'FYI: new address added to mailing list',
              text: req.body.email + ' has been added to the mailing list ' + mailinglist
            });
          }
        });
      }).catch((err) => {
        res.status(500).send(err);
      });
    } else {
      res.status(405).send({message: 'Only POST method is allowed'});
    }
  });
};
