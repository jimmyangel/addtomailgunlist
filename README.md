# addToMailgunList

This Google Cloud Function is used to add new members to an arbitrary mailgun mailing list, depending on runtime configuration parameters set in environment variables.

### Mailing List
```
MAILINGLIST
```

### Mailgun API Key
```
MAILGUNAPIKEY
```

### Mailgun Domain
```
MAILGUNDOMAIN
```

### Email to send notifications
```
NOTIFICATIONEMAIL
```

## Deploy
```
gcloud functions deploy addToMailgunList --trigger-http
```

## Usage
```
curl -d "email=someemailt@example.com" -X POST https://myproject.cloudfunctions.net/addToMailgunList
```

Function can be invoked from a web page using javascript AJAX POST like jQuery example below:

```
// POST to mailing list service
$('#join-button').click(function () {
  $.post(MAILGUN_LIST_SERVICE_URL, $('#join-dialog-form').serialize(), function (data) {
      $('#thank-you-msg').fadeIn('slow');
      setTimeout(resetJoinForm, 3000);
    }).fail(function (data) {
      console.log(data);
      $('#join-error-text').text(data.responseJSON.message.startsWith('Address already exists') ? 'Thank you, but you already joined my mailing list!' : data.responseJSON.message);
      $('#join-error').fadeIn('slow');
      setTimeout(resetJoinForm, 3000);
  });
  return false;
});
```
Using an HTML form like this example:

```
<form id="join-dialog-form" class="form-horizontal" role="form">
  <div class="form-group has-feedback">
    <div class="col-sm-12">
      <input type="text" id="join-email" name="email" maxlength="200" autocomplete="off" placeholder="Enter email address" class="form-control">
      <span class="glyphicon form-control-feedback" aria-hidden="true"></span>
    </div>
  </div>
  <div class="alert alert-warning" id="thank-you-msg" role="alert" style="display: none">
    <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
    <span class="sr-only">Info:</span>
    Thank you for joining my mailing list!
  </div>
  <div class="alert alert-danger" id="join-error" role="alert" style="display: none">
    <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
    <span class="sr-only">Error:</span>
    <span id="join-error-text">Sorry, something went wrong with registration, please try again later.</span>
  </div>
  <div class="form-group">
    <div class="modal-footer">
      <button id="cancel-join-button" href="" type="button" class="btn btn-default">Cancel</button>
      <input type="button" id="join-button" href="" disabled type="button" class="btn btn-default" value="Join"></input>
    </div>
  </div>
</form>
```
